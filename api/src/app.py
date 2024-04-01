from datetime import datetime, timedelta
from typing import TypedDict, Optional, Callable

from fastapi import FastAPI, Form, status
from fastapi.responses import JSONResponse

from fastapi.middleware.cors import CORSMiddleware

from services.database import JSONDatabase

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173', 'http://localhost:5174'],
    allow_methods=['GET', 'POST'],
    allow_headers=["*"],
    allow_credentials=True
)

class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@app.on_event("startup")
def on_startup() -> None:
    """Initialize database when starting API server."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []


@app.on_event("shutdown")
def on_shutdown() -> None:
    """Close database when stopping API server."""
    database.close()


@app.post("/quote")
def post_message(name: str = Form(...), message: str = Form(...)) -> JSONResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now().replace(microsecond=0)

    quote = Quote(name=name, message=message, time=now.isoformat())
    database["quotes"].append(quote)

    # The database.close() method does not actually close the database, but merely saves to it.
    # Though the name of the method suggests that the database should not be closed here, the 
    # actual functionality merely saves the written data to the database (the json file). Therefore,
    # it is appropriate to call close() here so that the data is saved to the database even while
    # the API is running. If I had the option, I would rename this method to database.save().
    database.close()

    return JSONResponse(content={"message": "Quote added successfully"}, status_code=status.HTTP_201_CREATED)

@app.get("/allquotes")
def retrieve_messages(days_old: Optional[int] = None) -> JSONResponse:
    """Returns all quotes in a JSON file."""
    return_data = database['quotes']

    # Filter the return data if a days_old query parameter is passed.
    # The way the logic is handled, if days_old is less than 0, then 
    # simply ignore the query param and return all quotes.
    if days_old is not None and not days_old < 0:
        age_is_valid = _get_max_age_function(days_old)

        # Filter by max age in days, then sort from newest to oldest.
        return_data = list(filter(age_is_valid, return_data))
        return_data.sort(key = lambda quote: quote['time'])

    return JSONResponse(content=return_data, status_code=status.HTTP_200_OK)

def _get_max_age_function(days_old: int) -> Callable:
    """
    Returns a function that returns True if its creation date is within
    the days_old variable.
    """
    def _f(quote: Quote):
        # Check if quote is within time frame
        if datetime.fromisoformat(quote['time']) >= datetime.now() - timedelta(days=days_old):
            return True
        return False
    
    return _f
from datetime import datetime
from typing import TypedDict

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse

from services.database import JSONDatabase

app = FastAPI()


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
def post_message(name: str = Form(...), message: str = Form(...)) -> RedirectResponse:
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

    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)

@app.get("/allquotes")
def retrieve_messages() -> None:
    """Returns all quotes in a JSON file."""
    pass
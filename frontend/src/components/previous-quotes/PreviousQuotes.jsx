import { useState, useEffect } from 'react'

import QuoteCard from './QuoteCard.jsx'
import QuoteModal from './QuoteModal.jsx'
import FilterDropdown from './FilterDropdown.jsx'

import './PreviousQuotes.css'


export default function PreviousQuotes() {
    const [quoteData, setQuoteData] = useState(null);

    const [selectedQuote, setSelectedQuote] = useState(null);
    const [showQuote, setShowQuote] = useState(false);

    const filters = {
        ALL: 0,
        LASTWEEK: 1,
        LASTMONTH: 2,
        LASTYEAR: 3
    }
    const [filterBy, setFilterBy] = useState(filters.ALL)
    
    const changeFilter = (filter) => {
        return () => setFilterBy(filter)
    }

    const getFilterFunc = (filterBy) => {
        let startTime = (new Date()).getTime();
        if (filterBy === filters.ALL) {
            startTime = 0;
        } else if (filterBy === filters.LASTWEEK) {
            startTime -= 7*24*60*60*1000;
        } else if (filterBy === filters.LASTMONTH) {
            startTime -= 30*24*60*60*1000;
        } else if (filterBy === filters.LASTYEAR) {
            startTime -= 365*24*60*60*1000;
        }
        const sorter = (e) => {
            let eDate = (new Date(e.time)).getTime();
            return (eDate >= startTime ? true : false);
        }
        return sorter;
    }

    const handleCardClick = (card) => {
        setSelectedQuote(card)
        setShowQuote(true)
    }

    useEffect(() => {
        fetch('http://localhost:8000/allquotes')
            .then(res => res.json())
            .then(json => {setQuoteData(json.sort().reverse()); console.log(json)})
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='m-4'>
            <h2 className='display-6 mb-3'>Previous Quotes</h2>
            <FilterDropdown changeFilter={changeFilter}/>
            <div className='d-flex flex-wrap gap-3'>
                {quoteData?.filter(getFilterFunc(filterBy)).map((card, index) => (
                    <QuoteCard key={index} onClick={() => handleCardClick(card)} name={card.name} message={card.message} time={card.time} />
                ))}
            </div>
            <QuoteModal active={showQuote} handleClose={() => setShowQuote(false)}
                name={selectedQuote?.name} message={selectedQuote?.message} time={selectedQuote?.time} />
        </div>
    )
}
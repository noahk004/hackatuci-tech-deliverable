import { useState, useEffect } from 'react'

import QuoteCard from './QuoteCard.jsx'
import QuoteModal from './QuoteModal.jsx'
import FilterDropdown from './FilterDropdown.jsx'

import './PreviousQuotes.css'

export default function PreviousQuotes() {
    const [quoteData, setQuoteData] = useState(null);

    const [selectedQuote, setSelectedQuote] = useState(null);
    const [showQuote, setShowQuote] = useState(false);

    const handleCardClick = (card) => {
        setSelectedQuote(card)
        setShowQuote(true)
    }

    useEffect(() => {
        fetch('http://localhost:8000/allquotes')
            .then(res => res.json())
            .then(json => setQuoteData(json))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='m-4'>
            <h2 className='display-6 mb-3'>Previous Quotes</h2>
            <FilterDropdown />
            <div className='d-flex flex-wrap gap-3'>
                {quoteData?.map((card, index) => (
                    <QuoteCard key={index} onClick={() => handleCardClick(card)} name={card.name} message={card.message} />
                ))}
            </div>
            <QuoteModal active={showQuote} handleClose={() => setShowQuote(false)}
                name={selectedQuote?.name} message={selectedQuote?.message} />
        </div>
    )
}
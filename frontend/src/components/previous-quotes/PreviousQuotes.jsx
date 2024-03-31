import { useState, useEffect } from 'react'

import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './PreviousQuotes.css'

function QuoteCard({ onClick, name, message }) {
    return (
        <Card className='quote-card' onClick={onClick}>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{message}</Card.Text>
        </Card>
    )
}

function QuoteModal({ active, handleClose, name, message }) {
    return (
        <Modal show={active}>
            <Modal.Body>
                <div className='blockquote mb-0'>
                    <p>{message}</p>
                    <footer className='blockquote-footer'>{name}</footer>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant='secondary'>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

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
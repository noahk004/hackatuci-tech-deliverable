import { useState } from 'react'

import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './PreviousQuotes.css'

const cardsData = [
    { id: 1, author: 'Card 1', content: 'Content 1' },
    { id: 2, author: 'Card 2', content: 'Content 2' },
    { id: 3, author: 'Card 2', content: 'Content 3' },
    // Add as many cards as you need
];

function QuoteCard({ onClick, author, quote }) {
    return (
        <Card className='quote-card' onClick={onClick}>
            <Card.Title>{author}</Card.Title>
            <Card.Text>{quote}</Card.Text>
        </Card>
    )
}

function QuoteModal({ active, handleClose, author, quote }) {
    return (
        <Modal show={active}>
            <Modal.Body>
                <div className='blockquote mb-0'>
                    <p>{quote}</p>
                    <footer className='blockquote-footer'>{author}</footer>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant='secondary'>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default function PreviousQuotes() {
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [showQuote, setShowQuote] = useState(false);

    const handleCardClick = (card) => {
        setSelectedQuote(card)
        setShowQuote(true)
    }

    return (
        <div className='m-4'>
            <h2 className='display-6 mb-3'>Previous Quotes</h2>
            <div className='d-flex flex-wrap gap-3'>
                {cardsData.map(card => (
                    <QuoteCard key={card.id} onClick={() => handleCardClick(card)} author={card.author} quote={card.content} />
                ))}
            </div>
            <QuoteModal active={showQuote} handleClose={() => setShowQuote(false)}
                author={selectedQuote?.author} quote={selectedQuote?.content} />
        </div>
    )
}
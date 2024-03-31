import { useState } from 'react'

import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './PreviousQuotes.css'

const cardsData = [
    {
        id: 1,
        name: 'Peter',
        message: 'This is a really important message.',
        time: 'Some random time'
    },
    {
        id: 2,
        name: 'Anteater',
        message: 'Zot Zot Zot!',
        time: 'Some random time'
    },
    {
        id: 3,
        name: 'Joe',
        message: 'Hello World',
        time: 'Some random time'
    }
]


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
                    <QuoteCard key={card.id} onClick={() => handleCardClick(card)} name={card.name} message={card.message} />
                ))}
            </div>
            <QuoteModal active={showQuote} handleClose={() => setShowQuote(false)}
                name={selectedQuote?.name} message={selectedQuote?.message} />
        </div>
    )
}
import { useState } from 'react'

import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './PreviousQuotes.css'

function QuoteCard({ author, quote }) {
    return (
        <Card className='quote-card'>
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
    const [quoteActive, setQuoteActive] = useState(true)
    
    const showQuote = () => setQuoteActive(true)
    const hideQuote = () => setQuoteActive(false)

    return (
        <div className='m-4'>
            <h2 className='display-6 mb-3'>Previous Quotes</h2>
            <div className='d-flex flex-wrap gap-3'>
                <QuoteCard author='Peter' quote='Zot Zot Zot!' />
                <QuoteCard author='Peter' quote='Zot Zot Zot!' />
                <QuoteCard author='Peter' quote='Zot Zot Zot!' />
                <QuoteCard author='Peter' quote='Zot Zot Zot!' />
                <QuoteCard author='Peter' quote='Zot Zot Zot!' />
                <QuoteCard author='Peter' quote='Zot Zot Zot!' />
                <QuoteCard author='Peter' quote='Zot Zot Zot!' />
            </div>
            <QuoteModal active={quoteActive} handleClose={hideQuote} author='Peter' quote='This is truly a very good quote.' />
            
        </div>
    )
}
import Card from 'react-bootstrap/Card'

import './PreviousQuotes.css'

function Quote({ author, quote }) {
    return (
        <Card className='quote-card'>
            <Card.Title>{author}</Card.Title>
            <Card.Text>{quote}</Card.Text>
        </Card>
    )
}

export default function PreviousQuotes() {
    return (
        <div className='m-4'>
            <h2 className='display-6 mb-3'>Previous Quotes</h2>
            <div className='d-flex flex-wrap gap-3'>
                <Quote author='Peter' quote='Zot Zot Zot!' />
                <Quote author='Peter' quote='Zot Zot Zot!' />
                <Quote author='Peter' quote='Zot Zot Zot!' />
                <Quote author='Peter' quote='Zot Zot Zot!' />
                <Quote author='Peter' quote='Zot Zot Zot!' />
                <Quote author='Peter' quote='Zot Zot Zot!' />
                <Quote author='Peter' quote='Zot Zot Zot!' />
            </div>
            
        </div>
    )
}
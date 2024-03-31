import Card from 'react-bootstrap/Card'

export default function QuoteCard({ onClick, name, message }) {
    return (
        <Card className='quote-card' onClick={onClick}>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{message}</Card.Text>
        </Card>
    )
}

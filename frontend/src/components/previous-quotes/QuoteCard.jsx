import Card from 'react-bootstrap/Card'

export default function QuoteCard({ onClick, name, message, time }) {
    const date = new Date(time)
    const monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

    return (
        <Card id='quote-card' onClick={onClick}>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className='text-muted mb-2'>{formattedDate}</Card.Subtitle>
            <Card.Text id='quote-card-text'>{message}</Card.Text>
        </Card>
    )
}

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './QuoteModal.css'

export default function QuoteModal({ active, handleClose, name, message, time }) {
    const date = new Date(time)
    const monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const formattedTime = `${monthNames[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()} - ${date.toLocaleTimeString('en-US')}`

    return (
        <Modal show={active}>
            <Modal.Body>
                <div id='modal-time' className='d-flex justify-content-end mb-2'>{formattedTime}</div>
                <div className='blockquote mb-0'>
                    <p id='modal-quote' className='lead mb-4'>"{message}"</p>
                    <footer id='modal-name' className='lead text-muted'>- {name}</footer>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant='secondary'>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
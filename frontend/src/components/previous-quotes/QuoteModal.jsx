import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function QuoteModal({ active, handleClose, name, message }) {
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
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

export default function QuoteForm({ active, handleClose }) {
	return (
		<div>
			{/* <h2>Submit a quote</h2>
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<Button>Submit</Button>
			</form> */}

			<Modal show={active} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Submit a Quote!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control placeholder='Peter the Anteater' />
						</Form.Group>
						<Form.Group className='mt-2'>
							<Form.Label>Enter your quote:</Form.Label>
							<Form.Control as='textarea' rows={3} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose} variant='secondary'>Close</Button>
					<Button>Submit</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

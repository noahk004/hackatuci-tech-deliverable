import { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import './QuoteForm.css'

function ErrorAlert({ active, setActive }) {
	return (
		<div>
			{active && <Alert variant='danger' onClose={() => setActive(false)} dismissible>
				You must enter both a name and a message.
			</Alert>}
		</div>
	)
}

export default function QuoteForm({ active, handleClose }) {

	const [name, setName] = useState('')
	const [message, setMessage] = useState('')

	const [showValidationError, setShowValidationError] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (name == '' || message == '') {
			setShowValidationError(true)
		} else {
			// First, post the data to the database.
			const formData = new URLSearchParams();
			formData.append('name', name)
			formData.append('message', message)

			fetch('http://localhost:8000/quote', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: formData
			}).then(res => {
				res.json()
			}).catch(error => {
				console.error(error)
			});

			setName('');
			setMessage('');
			handleClose();

			location.reload();    // page refresh to show new data
		}

	}

	return (
		<div>
			<Modal show={active} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Submit a Quote!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ErrorAlert active={showValidationError} setActive={setShowValidationError}/>
					<Form>
						<Form.Group>
							<Form.Label>Name:</Form.Label>
							<Form.Control
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='Peter the Anteater'
							/>
						</Form.Group>
						<Form.Group className='mt-2'>
							<Form.Label>Message:</Form.Label>
							<Form.Control
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder='Zot Zot Zot!'
								as='textarea'
								rows={3}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>Close</Button>
					<Button id='quote-submit' onClick={handleSubmit}
					>Submit</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

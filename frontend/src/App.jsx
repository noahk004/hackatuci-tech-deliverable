import { useState } from 'react'

import "./App.css" 

import Header from './components/Header.jsx'
import QuoteForm from './components/QuoteForm.jsx'
import PreviousQuotes from './components/PreviousQuotes.jsx'

import Button from 'react-bootstrap/Button'

export default function App() {
	const [formActive, setFormActive] = useState(false)

	const handleShow = () => setFormActive(true)
	const handleClose = () => setFormActive(false)

	return (
		<div className="App">
			<Header />
			<Button onClick={handleShow} className='toggle-form-btn'>Submit a Quote</Button>
			<QuoteForm active={formActive} handleClose={handleClose} />
			<PreviousQuotes />
		</div>
	)
}
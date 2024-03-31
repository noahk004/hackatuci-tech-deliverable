import { useState } from 'react'

import "./App.css" 

import Header from './components/header/Header.jsx'
import QuoteForm from './components/quote-form/QuoteForm.jsx'
import PreviousQuotes from './components/previous-quotes/PreviousQuotes.jsx'

import Button from 'react-bootstrap/Button'

export default function App() {
	const [formActive, setFormActive] = useState(false)

	const showForm = () => setFormActive(true)
	const closeForm = () => setFormActive(false)

	return (
		<div className="App">
			<Header />
			<Button onClick={showForm} className='toggle-form-btn'>Submit a Quote</Button>
			<QuoteForm active={formActive} handleClose={closeForm} />
			<PreviousQuotes />
		</div>
	)
}
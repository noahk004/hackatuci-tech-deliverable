export default function Header() {
	return (
		<div className='d-flex gap-3 p-4 align-items-center'>
			{/* TODO: include an icon for the quote book */}
			<img src="/quotebook.png" alt="Quotebook Logo" height='75px' />
			<h1 className='display-4'>Hack at UCI Quotebook</h1>
		</div>
	)
}
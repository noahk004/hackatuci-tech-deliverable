import Dropdown from 'react-bootstrap/Dropdown'

export default function FilterDropdown() {
    return (
        <Dropdown className='mb-3'>
            <Dropdown.Toggle variant='secondary'>
                Filter by:
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>All</Dropdown.Item>
                <Dropdown.Item>Last week</Dropdown.Item>
                <Dropdown.Item>Last month</Dropdown.Item>
                <Dropdown.Item>Last year</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
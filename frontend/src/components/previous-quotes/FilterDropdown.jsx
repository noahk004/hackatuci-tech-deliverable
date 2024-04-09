import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function FilterDropdown({ changeFilter }) {
    return (
        <Dropdown className='mb-3'>
            <Dropdown.Toggle variant='secondary'>
                Filter by:
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={changeFilter(0)}>All</Dropdown.Item>
                <Dropdown.Item onClick={changeFilter(1)}>Last week</Dropdown.Item>
                <Dropdown.Item onClick={changeFilter(2)}>Last month</Dropdown.Item>
                <Dropdown.Item onClick={changeFilter(3)}>Last year</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
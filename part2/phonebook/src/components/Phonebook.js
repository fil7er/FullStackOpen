import { useEffect, useState } from 'react'
import { Form } from './Form'
import { Display } from './Display'
import { Filter } from './Filter'
import { Remove, Fetch, Create } from '../requests/Requests'
import { Alter } from './Alter'

export const Phonebook = ({ personsData }) => {


  const [persons, setPersons] = useState([...personsData])

  const [newInput, setNewInput] = useState([
    { labelName: 'Name', value: '', id: 0 },
    { labelName: 'Number', value: '', id: 1 }
  ])


  const handleInputs = (e) => {
    var inputCopy = [...newInput];
    inputCopy[e.target.getAttribute('data-id')].value = e.target.value
    setNewInput(inputCopy)
  }

  const handleDelete = (e) => {
    try {
      if(window.confirm("Delete " + persons[e.target.getAttribute('data-id')].name))
      {
        var id = e.target.getAttribute('data-id');
      if (id === undefined) throw new Error("Contact not found!")
      Remove(id).then(() => {
        var personCopy = [...persons]
        setPersons(personCopy)
      })
      }
    }
    catch (e) {
      alert(e.message)
    }
  }

  const handleUpdate = () => {

  }

  useEffect(() => {
    Fetch().then((copy) => {
      var data = [...copy.data]
      console.log(data);
      setPersonsFilter(data);
    })
  }, [])


  const [personsFilter, setPersonsFilter] = useState([...persons]);

  const handleFilter = (e) => {
    var filterDisplay = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setPersonsFilter(filterDisplay)
  }

  /* Handle Submit */
  const handleSubmit = (event) => {
    event.preventDefault()


    try {
      persons.map(person => {
        if (person.name === newInput[0].value) {
          throw new Error(`${newInput[0].value} is already added to phonebook`)
        }
        return true;
      })

      Create({ name: newInput[0].value, number: newInput[1].value }).then(() => {
        alert(newInput[0].value + " added to List")
      })


    }
    catch (e) {
      alert(e)
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <Form handleSubmit={handleSubmit} handleInputs={handleInputs} inputList={newInput} />
      <h2>Update Contact</h2>
      <Alter handleUpdate={handleUpdate}/>
      <h2>Numbers</h2>
      <Display persons={personsFilter} handleDelete={handleDelete} />
    </>
  )
}

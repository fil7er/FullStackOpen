import '../css/main.css'

import { useEffect, useState } from 'react'
import { Form } from './Form'
import { Display } from './Display'
import { Filter } from './Filter'
import { Remove, Fetch, Create, Update } from '../requests/Requests'
import { Alter } from './Alter'
import { Notification } from './Notification'

export const Phonebook = ({ personsData }) => {

const refresh = () => {
  Fetch().then((copy) => {
    var data = [...copy.data]
    setPersonsFilter(data);
    setPersons(data);
  })
}


  const [persons, setPersons] = useState([...personsData])

  const [newInput, setNewInput] = useState([
    { labelName: 'Name', value: '', id: 0 },
    { labelName: 'Number', value: '', id: 1 }
  ])

  const [updInput, setUpdInput] = useState({nameUpdate : "", numberUpdate : "" })

  const handleUpdateInput = (e) =>{
    var upd = {...updInput};
    upd[e.target.name] = e.target.value;
    setUpdInput(upd)
  }


  const [notific, setNotific] = useState({message: '', type: 'off'})


  const handleInputs = (e) => {
    var inputCopy = [...newInput];
    inputCopy[e.target.getAttribute('data-id')].value = e.target.value
    setNewInput(inputCopy)
  }

  const handleDelete = (e) => {
    try {
      var id = e.target.getAttribute('data-id');
      var personSelected = {}
      persons.filter(person => {if(person.id == id) personSelected = person})
      if(window.confirm("Delete " + personSelected.name))
      {
        var id = e.target.getAttribute('data-id');
      if (id === undefined) throw new Error("Contact not found!")
      Remove(id).then(() => {
        refresh();
        setNotific({message:"User Removed", type: "done"})
      })
      }
    }
    catch (e) {
      alert(e.message)
    }
  }

  const handleUpdate = () => {
    try
    {
      var personSelected = {}
      if(persons.filter(person => {if(person.name === updInput.nameUpdate) {
        personSelected = person
        return person
      }}).length == 0) 
        throw new Error("User not Exist")
      Update(personSelected.id, {name:personSelected.name, number:updInput.numberUpdate}).then(() => {
        setNotific({message:"User Edited", type: "done"})
        refresh();
      })
    }
    catch(e)
    {
      setNotific({message:e.message, type: "error"})
    }
  }



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
        refresh();
        setNotific({message:newInput[0].value + " added to List", type: "done"})
      })


    }
    catch (e) {
      setNotific({message: `${newInput[0].value} is already added to phonebook`, type: "error"})
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification  message={notific.message} type={notific.type}/>
      <Filter handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <Form handleSubmit={handleSubmit} handleInputs={handleInputs} inputList={newInput} />
      <h2>Update Contact</h2>
      <Alter handleUpd={handleUpdate} handleInputUpd={handleUpdateInput}/>
      <h2>Numbers</h2>
      <Display persons={personsFilter} handleDelete={handleDelete} />
    </>
  )
}

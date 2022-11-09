import { useState } from 'react'
import { Form} from './Form'
import { Display } from './Display'

export const Phonebook = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ]) 
    
      const [newInput, setNewInput] = useState([
        {labelName: 'Name', value: '', id: 0},
        {labelName: 'Number', value: '', id: 1}
    ])
    

      const handleInputs = (e) => {
        console.log(e.target.getAttribute('name'))
        var inputCopy = [...newInput];
        inputCopy[e.target.getAttribute('data-id')][e.target.getAttribute('name')] = e.target.value
        setNewInput(inputCopy)
        console.log(newInput)
      }
    
      const handleSubmit = (event) => {
        event.preventDefault()

    
        try {
          persons.map(person => {
            if (person.name === newInput[0].value){
              throw new Error(`${newInput[0].value} is already added to phonebook`)
            }
            return true;
          })
      
          var copy = [...persons]
      
          copy.push({name: newInput[0].value, number: newInput[1].value, id: copy.length})
          setPersons(copy)
        }
        catch(e){
          alert(e)
        }
      }

    return (
        <>
          <h2>Phonebook</h2>
          <Form handleSubmit={handleSubmit} handleInputs={handleInputs} inputList={newInput}/>
          <h2>Numbers</h2>
          <Display persons={persons}/>
        </>
      )
}

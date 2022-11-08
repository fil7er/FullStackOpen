import { useState } from 'react'

const Phonebook = ({}) => {

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
    

      const handleInputs = (e, id) => {
        inputCopy = [... newInput]

      }
    
      const handleSubmit = (event) => {
        event.preventDefault()
    
        try {
          persons.map(person => {
            if (person.name == newName){
              throw `${newName} is already added to phonebook`
            }
          })
      
          var copy = [... persons]
      
          copy.push({name: newName})
          setPersons(copy)
        }
        catch(e){
          alert(e)
        }
      }

    return (
        <>
          <h2>Phonebook</h2>
          <Form handleSubmit={handleSubmit} inputList={newInput}/>
          <h2>Numbers</h2>
          <Display persons={persons}/>
        </>
      )
}

export default Phonebook
import { useState } from 'react'

const App = () => {


  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState([{value: ''}])

  const handleNewName = () => {
    setNewName(newName);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    persons.push({name: newName.value})
    console.log(newName.value)
    setPersons(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName.value} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map(person => {
        return (
          <li>{person.name}</li>
        )
      })}
      </ul>
    </div>
  )
}

export default App
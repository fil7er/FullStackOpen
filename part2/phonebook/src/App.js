import { useState } from 'react'

const App = () => {


  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState([''])

  const handleNewName = (event) => {
    setNewName(event.target.value);
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
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNewName} />
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
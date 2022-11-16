export const Display = ({persons, handleDelete}) => {


    return (
        <ul>
          {persons.map(person => {
      return (
        <li key={person.id}>{person.name}: {person.number} <input type="button" data-id={person.id} onClick={handleDelete} value="delete" /></li>
      )
    })}
          </ul>
    )
}

export default Display
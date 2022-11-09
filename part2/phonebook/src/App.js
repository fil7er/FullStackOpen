import { Phonebook } from './components/Phonebook'

const App = ({persons}) => {

  return (
    <div>
      <Phonebook personsData={persons}/>
    </div>
  )
}

export default App
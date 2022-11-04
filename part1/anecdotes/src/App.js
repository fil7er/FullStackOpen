import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [points, setVote] = useState(new Array(7).fill(0));

   
  const [selected, setSelected] = useState(0)

  const handleSelected = () => {setSelected(selected+1)}

  const handleVote = () => {
    const copy = [... points]
    copy[selected]+=1;
    setVote(copy);
  }

  return (
    <div>
      {anecdotes[selected]}
      <input type="button" onClick={handleSelected} value="next anecdotes"/>
      <input type="button" value="vote" onClick={handleVote} />
      <p>has {points[selected]} votes</p>
      <MostVotes points={points} anecdotes={anecdotes}/>
    </div>
  )
}

const MostVotes = (props) =>{
  const max = Object.keys(props.points).find(key => props.points[key] === Math.max(...props.points));
console.log(max);
  return (
    <>
      <p><h2>Anecdotes with most votes</h2></p>
      <p>{props.anecdotes[max]}</p>
      <p>{props.points[max]} Votes</p>
    </>
  )
}

export default App
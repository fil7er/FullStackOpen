import { useState } from 'react'

const App = () => {

const [good, setGood] = useState(0);
const [neutral, setNeutral] = useState(0);
const [bad, setBad] = useState(0);

const handleGood = () => {
  setGood(good+1);
}

const handleNeutral = () => {
  setNeutral(neutral+1);
}

const handleBad = () => {
  setBad(bad+1);
}

  return (
    <div>
      <h2>Give Feedback</h2>
      <Buttons onClickGood={handleGood} onClickNeutral={handleNeutral} onClickBad={handleBad} />
      <Display good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

const Buttons = (props) => {
  return (
    <>
      <input type="button" onClick={props.onClickGood} value="good" />
      <input type="button" onClick={props.onClickNeutral} value="neutral"/>
      <input type="button" onClick={props.onClickBad} value="bad"/>
    </>
  )
}

const Display = (props) => {
  return (
    <>
      {props.good}
      {props.neutral}
      {props.bad}
    </>
  )
}

export default App;

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
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
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

const Statistics = (props) => {
  if(props.good == 0 && props.neutral == 0 && props.bad == 0){
    return (
      <>
        <p>No Feedback Given</p>
      </>
    )
  }
else{
  return (
    <>
      <StatisticsLine name="Good" value={props.good} />
      <StatisticsLine name="Neutral" value={props.neutral} />
      <StatisticsLine name="Bad" value={props.bad} />
      <StatisticsLine name="All" value={props.good + props.neutral + props.bad} />
      <StatisticsLine name="Average" value={(props.good + props.neutral + props.bad)/3} />
      <StatisticsLine name="Positive" value={props.good*100/(props.good + props.neutral + props.bad)} />
    </>
  )}
}


const StatisticsLine = (props) => {
  return (
    <>
      <p>{props.name}: {props.value}</p>
    </>
  )
}

export default App;

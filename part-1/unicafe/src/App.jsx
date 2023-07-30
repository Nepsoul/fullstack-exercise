import { useState } from 'react';
import Button from './Button';
import Statistics from './Statistics';


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


   const goodHandleOnClick=()=>{
    setGood(good+1)
    
   }
    const neutralHandleOnClick=()=>{
      setNeutral(neutral+1)
      
    }
    const badHandleOnClick=()=>{
      setBad(bad+1)
      
    }

  return (
    <div>
      <h1>give feedback</h1>
      <Button goodHandle={goodHandleOnClick} neutralHandle={neutralHandleOnClick} badHandle={badHandleOnClick} />
      {good || neutral || bad ? <Statistics good= {good} neutral= {neutral} bad= {bad}/> : <p>No feedback given</p>}
    </div>
  )
}

export default App
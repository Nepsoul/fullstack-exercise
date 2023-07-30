import { useState } from 'react'

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
      <button onClick={goodHandleOnClick}>good</button>
      <button onClick={neutralHandleOnClick}>neutral</button>
      <button onClick={badHandleOnClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App
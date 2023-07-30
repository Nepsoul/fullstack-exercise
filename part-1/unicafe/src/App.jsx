import { useState } from 'react'

const Statistics=(props)=>{ //component
  const all=props.good+props.bad+props.neutral
  return(
    <div> 
    <h1>statistics</h1>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    <p >all {all}</p>
    <p>average {(props.good-props.bad)/3}</p>
    <p>positive {`${(props.good/all)*100} %`}</p>
 </div> 
)
}


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
      <Statistics good= {good} neutral= {neutral} bad= {bad}/>
    </div>
  )
}

export default App
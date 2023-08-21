// const { useState } = require("react")
import { useState } from "react"

const App=()=>{
  const [persons,setPersons]=useState([{name:'Arto Hellas'}])
  const [newName, setNewName]=useState('')

const addNewName=(event)=>{
event.preventDefault()
// console.log("button clicked:", event.target)
const newNameObject={
  name:newName 
}
// setPersons([...persons,newNameObject])
setPersons(persons.concat(newNameObject))
// console.log("within funct:",persons)
setNewName("")

  }

  const handleNameChange=(event)=>{
    // console.log("name handle:",event.target.value)
    setNewName(event.target.value)
    
  }
  

  return (<div>
    <h2>Phonebook</h2>
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <button type="submit">add</button>
    </form>
    <h2>Numbers</h2>
    <div>debug: {newName}</div>
    <ul>{persons.map((person,index)=><li key={index}>{person.name}</li>)}</ul>
  </div>)
}
export default App

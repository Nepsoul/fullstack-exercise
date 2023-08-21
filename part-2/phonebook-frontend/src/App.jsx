// const { useState } = require("react")
import { useState } from "react"

const App=()=>{
  const [persons,setPersons]=useState([{name:'Arto Hellas'}])
  const [newName, setNewName]=useState('')

const addNewName=(event)=>{
event.preventDefault()
const newNameObject={
  name:newName 
}

let existedName=persons.some(check=>check.name===newNameObject.name)
existedName?alert(`"${newName}" is already added to phonebook`):setPersons(persons.concat(newNameObject))
setNewName("")

  }

  const handleNameChange=(event)=>{
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

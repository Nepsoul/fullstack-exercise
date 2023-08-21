import { useState } from "react"

const App=()=>{
  const [persons,setPersons]=useState([{name:'Arto Hellas'}])
  const [newName, setNewName]=useState('')
  const [newNumber,setNewNumber]=useState(0) 

const addNewName=(event)=>{
event.preventDefault()
const newNameObject={
  name:newName,
  number:newNumber
}

let existedName=persons.some(check=>check.name===newNameObject.name)
existedName?alert(`"${newName}" is already added to phonebook`):setPersons(persons.concat(newNameObject))
setNewName("")
setNewNumber("")

  }

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
    
  }
  const handleNumberChange=(e)=>{
    setNewNumber(e.target.value)

  }
  

  return (<div>
    <h2>Phonebook</h2>
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
        
      </div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <button type="submit">add</button>
    </form>
    <h2>Numbers</h2>
    <div>debug: {newName}</div>
    <div>debug: {newNumber}</div>
    <ul>{persons.map((person,index)=><li key={index}>{person.name} {person.number}</li>)}</ul>
  </div>)
}
export default App

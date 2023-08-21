import { useState } from "react"

const App=()=>{
  const [persons,setPersons]=useState([{ name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }])
  const [newName, setNewName]=useState('')
  const [newNumber,setNewNumber]=useState("") 
  const[filterData,setFilterData]=useState("")

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

  const handleFilterChange=(e)=>{
    setFilterData(e.target.value)
  }
  
  let filterName=persons.filter(nameList=>(nameList.name.toLowerCase().includes(filterData.toLowerCase())))

  return (<div>
    <h2>Phonebook</h2>
    <div>filter shown with <input value={filterData} onChange={handleFilterChange}/></div>
    <h2>add a new</h2>
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
        
      </div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <button type="submit">add</button>
    </form>
    <h2>Numbers</h2>
    <ul>{filterName.map((person,index)=><li key={index}>{person.name} {person.number}</li>)}</ul>
  </div>)
}
export default App

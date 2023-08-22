import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/filter";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterData, setFilterData] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addNewName = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    let existedName = persons.some(
      (check) => check.name === newNameObject.name,
    );
    existedName
      ? alert(`"${newName}" is already added to phonebook`)
      : personService
          .create(newNameObject)
          .then((response) => setPersons(persons.concat(response.data)));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterData(e.target.value);
  };

  let filterName = persons.filter((nameList) =>
    nameList.name.toLowerCase().includes(filterData.toLowerCase()),
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterData={filterData} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewName={addNewName}
      />
      <h2>Numbers</h2>
      <Persons filterName={filterName} setPersons={setPersons} />
    </div>
  );
};
export default App;

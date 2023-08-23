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
  const [notification, setNotification] = useState("");

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

    let existedName = persons.find((check) => check.name === newName);

    if (existedName) {
      let alertNotification = window.confirm(
        `"${newName}" is already added to phonebook, replace the old number with a new one`,
      );
      if (alertNotification) {
        existedName.number = newNumber; //updated number of existed data

        personService.update(existedName.id, existedName).then((response) => {
          setPersons(
            persons.map((singleData) => {
              if (singleData.id === existedName.id) {
                return { ...singleData, number: newNumber };
              } else return singleData;
            }),
          );
        });
        setNewName("");
        setNewNumber("");
        setNotification(
          `${newName}'s number changed into new number: ${newNumber}`,
        );
        setTimeout(() => {
          setNotification("");
        }, 5000);
      }
    } else {
      personService
        .create(newNameObject)
        .then((response) => setPersons(persons.concat(response.data)));
      setNewName("");
      setNewNumber("");
      setNotification(`Added "${newName}" in phonebook`);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
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
      <div
        style={{
          color: "green",
          fontStyle: "italic",
          fontSize: 24,
          fontWeight: 400,
          background: "lightgrey",
          border: "solid",
          borderRadius: 5,
          padding: 10,
          marginBottom: 30,
        }}
      >
        {" "}
        {notification}
      </div>
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

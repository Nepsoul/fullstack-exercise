import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/filter";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterData, setFilterData] = useState("");
  const [notification, setNotification] = useState("");
  const [colorMessage, setColor] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => console.log("promise failed: ", error.message));
  }, []);

  const addNewName = (event) => {
    event.preventDefault();

    const newNameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    let existedName = persons.find((check) => check.name === newName);
    console.log(existedName, "hellow");

    if (existedName) {
      let alertNotification = window.confirm(
        `"${newName}" is already added to phonebook, replace the old number with a new one`,
      );
      
      if (alertNotification) {
        existedName.number = newNumber; //updated number of existed data
        debugger

        personService
          .update(existedName.id, existedName)
          .then((response) => {
            console.log("updating data")
            setPersons(
              persons.map((singleData) => {
                if (singleData.id === existedName.id) {
                  return existedName;
                } else return singleData;
              }),
            );
            console.log("after updated data")
            setNewName("");
            setNewNumber("");
            setNotification(
              `${newName}'s number changed into new number: ${newNumber}`,
            );
            setColor("update");
            setTimeout(() => {
              setNotification("");
            }, 3000);
          })
          .catch((error) => {
            console.log("promise failed, from put api:", error.message);
            setNotification(
              `Information of ${newName} has already been removed from server`,
            );
            setColor("error");
            setTimeout(() => {
              setNotification("");
            }, 3000);
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personService
        .create(newNameObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setNotification(`Added "${newName}" in phonebook`);
          setColor("update");
          setTimeout(() => {
            setNotification("");
          }, 3000);
        })
        .catch((error) => {
          //displaying validation error msg returned by mongoose
          console.log("promise failed, from post api: ", error.message);
          setNotification(error.response.data.error);
          setColor("error");
          setTimeout(() => {
            setNotification("");
          }, 3000);
        });
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
      <div>
        {" "}
        <Notification notification={notification} colorMessage={colorMessage} />
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
      <Persons
        filterName={filterName}
        setPersons={setPersons}
        setNotification={setNotification}
        setColor={setColor}
      />
    </div>
  );
};
export default App;

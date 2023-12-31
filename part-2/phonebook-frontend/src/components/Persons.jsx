import personService from "../services/persons";

const Persons = ({ filterName, setPersons, setNotification ,setColor }) => {
  const toDeleteData = (id, name) => {
    window.confirm(`Delete ${name}?`) === false
      ? ""
      : personService.delData(id).then((response) => {
          const filterData = filterName.filter((person) => person.id !== id);
          setPersons(filterData);
          setNotification(`${name}: deleted`);
          setColor("delete")
          setTimeout(() => {
            setNotification("");
          }, 3000);
        }).catch((error)=>console.log("promise rejected, from delete api: ",error.message))
  };

  return (
    <div>
      <ul>
        {filterName.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button
              onClick={() => {
                toDeleteData(person.id, person.name);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Persons;

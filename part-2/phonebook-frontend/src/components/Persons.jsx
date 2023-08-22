import personService from "../services/persons";

const Persons = ({ filterName, setPersons }) => {
  const toDeleteData = (id) => {
    personService.delData(id).then((response) => {
      const filterData = filterName.filter((person) => person.id !== id);
      setPersons(filterData);
    });
  };

  return (
    <div>
      <ul>
        {filterName.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button
              onClick={() => {
                window.confirm(`Delete ${person.name}`) === false
                  ? "" //ternary operator, instead of empty string i.e. "", we can use person.name as well, "" this mean do nothing if false
                  : toDeleteData(person.id);
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

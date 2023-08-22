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
                toDeleteData(person.id);
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

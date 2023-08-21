const Persons = ({ filterName }) => {
  return (
    <div>
      <ul>
        {filterName.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Persons;

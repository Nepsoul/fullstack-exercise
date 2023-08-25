const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addNewName,
}) => {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};
export default PersonForm;

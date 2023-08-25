const Filter = ({ filterData, handleFilterChange }) => {
  return (
    <div>
      <div>
        filter shown with{" "}
        <input value={filterData} onChange={handleFilterChange} />
      </div>
    </div>
  );
};
export default Filter;

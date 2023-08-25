const CountryList = ({ searchList }) => {
  return (
    <div>
      {searchList.map((countries) => (
        <li key={countries.cca2}>
          {countries.name.common} <button>show</button>
        </li>
      ))}
    </div>
  );
};
export default CountryList;

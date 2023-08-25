import EachCountryDetail from "./EachCountryDetail";

const CountryList = ({ searchList }) => {
  return (
    <div>
      {searchList.map((countries) => (
        <EachCountryDetail key={countries.cca2} countries={countries} />
      ))}
    </div>
  );
};
export default CountryList;

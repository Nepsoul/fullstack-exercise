import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search, "search");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountryData(response.data);
      })
      .catch((error) => console.log("promise rejected: ", error.message));
  }, []);

  const eventHandler = (event) => {
    setSearch(event.target.value);
  };
  let searchData = countryData.filter((nameList) => {
    return nameList.name.common.toLowerCase().includes(search.toLowerCase());
  });
  console.log(searchData, "serachdata");
  return (
    <div>
      <div>
        find countries <input value={search} onChange={eventHandler} />
      </div>
      <br />
      {searchData.length > 10 ? (
        <p> too many countries specify one</p>
      ) : (
        searchData.map((countryList) => (
          // <li key={countryList.cca2}> {countryList.name.common}</li>
          <div key={countryList.cca2}>
            <h2>{countryList.name.common}</h2>
            <p>capital: {countryList.capital}</p>
            <p>area: {countryList.area}</p>
            <h4>languages: </h4>
            <ul>
              {Object.keys(countryList.languages).map((language, i) => (
                <li key={i}>{countryList.languages[language]}</li>
              ))}
            </ul>
            <img
              style={{ height: '300px', width: '300px' }}
              alt="Country Flag"
              src={countryList.flags.png}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default App;

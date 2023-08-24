import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountryData(response.data);
      })
      .catch((error) => console.log("promise rejected: ", error));
  }, []);

  const eventHandler = (event) => {
    setSearch(event.target.value);
  };
  let searchData = countryData.filter((nameList) => {
    return nameList.name.common.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <div>
        find countries <input value={search} onChange={eventHandler} />
      </div>

      {searchData.map((countryList) => {
        return <li key={countryList.cca2}> {countryList.name.common}</li>;
      })}

      <div>debug: {search}</div>
    </div>
  );
};

export default App;

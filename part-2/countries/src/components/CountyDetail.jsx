import { useEffect, useState } from "react";
import axios from "axios";

const CountryDetail = ({ singleData }) => {
  const [weather, setWeather] = useState({
    temperature: "",
    weatherIcon: "",
    wind: "",
  });
  
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${singleData.capital[0]}&appid=${api_key}`,
      )
      .then((response) =>
        setWeather({
          temperature: response.data.main.temp,
          weatherIcon: response.data.weather[0].icon,
          wind: response.data.wind.speed,
        }),
      )
      .catch((error) => console.log("error api: ", error.message));
  },[]);
  return (
    <div>
      <div key={singleData.cca2}>
        <h2>{singleData.name.common}</h2>
        <p>capital: {singleData.capital}</p>
        <p>area: {singleData.area}</p>
        <h4>languages: </h4>
        <ul>
          {Object.keys(singleData.languages).map((language, i) => (
            <li key={i}>{singleData.languages[language]}</li>
          ))}
        </ul>
        <img
          style={{ height: "300px", width: "300px" }}
          alt="Country Flag"
          src={singleData.flags.png}
        />
        <h3>weather in {singleData.capital[0]}</h3>
        <p>temperature {weather.temperature + " °Celcius"}</p>
        
        {weather.weatherIcon===""?null:(  //ternary for eliminate error while 1st time data fetch
        <img
          style={{ height: "200px", width: "200px" }}
          alt="wetherIcon"
          src={` https://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`}
        />
        )}
        <p>wind {weather.wind + " m/s"}</p>
      </div>
    </div>
  );
};
export default CountryDetail;

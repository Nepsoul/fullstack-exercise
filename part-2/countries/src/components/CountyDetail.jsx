const CountryDetail = ({ singleData }) => {
    
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
      </div>
    </div>
  );
};
export default CountryDetail;

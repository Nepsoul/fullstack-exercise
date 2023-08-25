import { useState } from "react";
import CountryDetail from "./CountyDetail";

const EachCountryDetail = ({ countries }) => {
  const [displayData, setDisplayData] = useState(false);
  const toggleButton = () => {
    setDisplayData(!displayData);
  };

  return (
    <div key={countries.cca2}>
      <span>
        <li>
          {countries.name.common} &nbsp;&nbsp;
          {displayData === true ? (
            <>
              <CountryDetail singleData={countries} />
              <button
                onClick={() => {
                  toggleButton();
                }}
              >
                hide
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                toggleButton();
              }}
            >
              show
            </button>
          )}
        </li>
      </span>
    </div>
  );
};

export default EachCountryDetail;

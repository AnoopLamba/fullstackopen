import { useEffect, useState } from "react";
import countriesService from "../services/countries";
import CountryView from "./CountryView";
import CountryWeather from "./CountryWeather";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [viewCountry, setViewCountry] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("countries"));
    if (localData) {
      setCountries(localData);
    } else {
      countriesService
        .getAll()
        .then((data) => {
          setCountries(data);
          localStorage.setItem("countries", JSON.stringify(data));
        })
        .catch((error) => console.log(error.message));
    }
  }, []);

  const filteredResults = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {viewCountry ? (
        <CountryView
          viewCountry={viewCountry}
          setViewCountry={setViewCountry}
        />
      ) : (
        <div>
          <label>
            Find countries:
            <input
              name="country"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              autoComplete="country"
            />
          </label>
          <div>
            {filteredResults.length > 10 ? (
              query !== "" && <p>Too many matches, be more specific</p>
            ) : filteredResults.length === 1 ? (
              <div>
                <br />
                <h2>{filteredResults[0].name.common}</h2>
                <br />
                <p>Capital: {filteredResults[0].capital[0]}</p>
                <p>Area: {filteredResults[0].area}</p>
                <br />
                <h3>Languages: </h3>
                <ul>
                  {Object.values(filteredResults[0].languages).map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
                <br />
                <p>Flag</p>
                <img
                  src={filteredResults[0].flags.png}
                  alt={filteredResults[0].flags.alt}
                />
                <br />
                <br />
                <CountryWeather country={filteredResults[0].name.common} />
              </div>
            ) : (
              filteredResults.map((country) => (
                <div key={country.name.common}>
                  <span>{country.name.common}</span> &nbsp;
                  <button onClick={() => setViewCountry(country)}>View</button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Countries;

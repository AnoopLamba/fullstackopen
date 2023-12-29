import { useEffect, useState } from "react";
import countriesService from "../services/countries";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    countriesService.getAll().then((data) => setCountries(data));
  }, []);

  const filteredResults = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <form>
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
      </form>
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
            <p>Flag {console.log(filteredResults[0].flags.alt)}</p>
            <img
              src={filteredResults[0].flags.png}
              alt={filteredResults[0].flags.alt}
            />
          </div>
        ) : (
          filteredResults.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))
        )}
      </div>
    </div>
  );
};

export default Countries;

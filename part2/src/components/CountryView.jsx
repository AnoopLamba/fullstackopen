import CountryWeather from "./CountryWeather";

const CountryView = ({ viewCountry, setViewCountry }) => {
  return (
    <div>
      <button onClick={() => setViewCountry(null)}>Back to search</button>
      <br />
      <h2>{viewCountry.name.common}</h2>
      <br />
      <p>Capital: {viewCountry.capital[0]}</p>
      <p>Area: {viewCountry.area}</p>
      <br />
      <h3>Languages: </h3>
      <ul>
        {Object.values(viewCountry.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <br />
      <p>Flag</p>
      <img src={viewCountry.flags.png} alt={viewCountry.flags.alt} />
      <br />
      <br />
      <CountryWeather country={viewCountry.name.common} />
    </div>
  );
};

export default CountryView;

import { useEffect, useState } from "react";
import weatherServices from "../services/temperature";

const CountryWeather = ({ country }) => {
  const [countryWeather, setCountryWeather] = useState(null);

  useEffect(() => {
    if (country) {
      weatherServices
        .getWeather(country)
        .then((data) => {
          setCountryWeather(data);
        })
        .catch((error) => console.log(error.message));
    }
  }, []);

  return (
    <>
      {countryWeather && (
        <div>
          <p>Capital temperature: {countryWeather.main.temp} celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}.png`}
            alt="weather icon"
          />
          <p>Wind: {countryWeather.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
};

export default CountryWeather;

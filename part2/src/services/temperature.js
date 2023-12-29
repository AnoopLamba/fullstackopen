import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const getWeather = async (country) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.toLowerCase()}&appid=${apiKey}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

export default { getWeather };

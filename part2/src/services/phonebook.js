import axios from "axios";
const URL = "http://localhost:3001/persons";

const getAllPersons = async () => {
  const response = await axios.get(URL);
  return response.data;
};

const addPerson = async (person) => {
  const response = await axios.post(URL, person);
  return response.data;
};

const deletePerson = async (id) => {
  const response = await axios.delete(`${URL}/${id}`);
  return response.data;
};

export default { getAllPersons, addPerson, deletePerson };

import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  // use effect to populate the persons array
  useEffect(() => {
    console.log("useEffect of Phonebook");
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      window.alert(`"${newName}" is already in the phonebook, choose another!`);
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      phone: newNumber,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const filteredResults = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <br />

      <Filter value={query} onChange={handleQueryChange} />
      <br />
      <br />

      <h2>Add new person</h2>
      <br />
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleFormSubmit={handleFormSubmit}
      />
      <br />

      <h2>Numbers</h2>
      <br />
      <Persons filteredResults={filteredResults} />
    </div>
  );
};

export default Phonebook;

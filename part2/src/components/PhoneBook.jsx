import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";
import phonebookService from "../services/phonebook";

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  // use effect to populate the persons array
  useEffect(() => {
    console.log("useEffect of Phonebook");
    phonebookService
      .getAllPersons()
      .then((data) => setPersons(data))
      .catch((error) => console.log(error.message));
  }, []);

  // adding new person
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      window.alert(`"${newName}" is already in the phonebook, choose another!`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    phonebookService
      .addPerson(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => console.log(error.message));
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

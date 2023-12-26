import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const Phonebook = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

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

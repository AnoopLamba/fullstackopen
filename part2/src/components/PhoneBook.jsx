import { useState } from "react";

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
      <br />
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">add</button>
      </form>
      <br />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};

export default Phonebook;

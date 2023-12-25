import { useState } from "react";

const Phonebook = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      id: persons.length + 1,
      name: newName,
    };
    setPersons(persons.concat(newPerson));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <br />
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </label>
        <br />
        <button type="submit">add</button>
      </form>
      <br />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  );
};

export default Phonebook;

import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import phonebookService from "../services/phonebook";
import Notification from "./Notification";

const Footer = () => {
  const footerStyle = { color: "green", fontStyle: "italic", fontSize: 16 };

  return (
    <div style={footerStyle}>
      {" "}
      <br />{" "}
      <em>
        Note app, Department of Computer Science, University of Helsinki 2023
      </em>{" "}
    </div>
  );
};

const Phonebook = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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

    const searchPerson = persons.find((person) => person.name === newName);

    if (searchPerson) {
      const userResponse = window.confirm(
        `"${newName}" is already in the phonebook, replace the old number with the new one?`
      );

      if (userResponse) {
        const updatedPerson = { ...searchPerson, number: newNumber };
        phonebookService
          .editPerson(updatedPerson.id, updatedPerson)
          .then((data) => {
            setPersons((prevState) =>
              prevState.map((person) =>
                person.id === updatedPerson.id ? data : person
              )
            );
            setErrorMessage("Contact details updated!");
            setTimeout(() => {
              setErrorMessage(null);
            }, 2000);
          })
          .catch((error) => {
            console.log(error.message);
            setErrorMessage(`${searchPerson.name} has been already removed!`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 2000);
            setPersons(
              persons.filter((person) => person.id !== searchPerson.id)
            );
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      phonebookService
        .addPerson(newPerson)
        .then((data) => {
          setPersons(persons.concat(data));
          setErrorMessage("New person added!");
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        })
        .catch((error) => console.log(error.message));
    }

    setNewName("");
    setNewNumber("");
  };

  // delete person info
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} from contacts?`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage(`${name} contact is deleted!`);
          setTimeout(() => setErrorMessage(null), 2000);
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage(`${name} has already been deleted!`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const filteredResults =
    persons &&
    persons.filter((person) =>
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
    <>
      <div>
        <h1>Phonebook</h1>
        <Notification message={errorMessage} />
        <br />

        <Filter value={query} onChange={handleQueryChange} />
        <br />
        <br />

        <h1>Add new person</h1>
        <br />
        <PersonForm
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
          handleFormSubmit={handleFormSubmit}
        />
        <br />

        <h1>Numbers</h1>
        <br />
        {persons && (
          <Persons
            filteredResults={filteredResults}
            handleDelete={handleDelete}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Phonebook;

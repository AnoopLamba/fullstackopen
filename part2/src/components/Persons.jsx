import PropTypes from "prop-types";

const Persons = ({ filteredResults, handleDelete }) => {
  return (
    <>
      {filteredResults.map((person) => (
        <div key={person.id} style={{ marginBottom: "8px" }}>
          <span>
            {person.name} {person.number}
          </span>{" "}
          &nbsp;
          <button
            onClick={() => handleDelete(person.id, person.name)}
            style={{
              border: "2px solid black",
              background: "red",
              color: "white",
              padding: "2px 4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

Persons.propTypes = {
  filteredResults: PropTypes.array,
};

export default Persons;

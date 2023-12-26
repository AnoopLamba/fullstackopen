import PropTypes from "prop-types";

const Persons = ({ filteredResults }) => {
  return (
    <>
      {filteredResults.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

Persons.propTypes = {
  filteredResults: PropTypes.array,
};

export default Persons;

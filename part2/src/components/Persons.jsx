const Persons = ({ filteredResults }) => {
  return (
    <>
      {filteredResults.map((person) => (
        <p key={person.id}>
          {person.name} {person.phone}
        </p>
      ))}
    </>
  );
};

export default Persons;

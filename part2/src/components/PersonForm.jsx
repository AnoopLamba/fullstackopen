const PersonForm = (props) => {
  const {
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
    handleFormSubmit,
  } = props;

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="number"
          value={newNumber}
          onChange={handleNumberChange}
          required
        />
      </label>
      <br />
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;

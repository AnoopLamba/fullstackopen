import Phonebook from "./components/PhoneBook";

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

function App() {
  return (
    <>
      <Phonebook />
      <Footer />
    </>
  );
}

export default App;

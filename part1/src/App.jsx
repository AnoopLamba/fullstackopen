import { useState } from "react";

const Statistics = (props) => {
  const { good, neutral, bad, average, positive, all } = props;
  return (
    <>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <br />
      <p>all {all}</p>
      <br />
      <p>average {average}</p>
      <p>positive {positive}%</p>
      <br />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    const newAll = all + 1;
    setAll(newAll);
    const newGood = good + 1;
    setGood(newGood);
    const newAverage = (newGood * 1 + neutral * 0 + bad * -1) / newAll;
    setAverage(newAverage);
    const newPositive = (newGood / (newGood + neutral + bad)) * 100;
    setPositive(newPositive);
  };
  const handleNeutral = () => {
    const newAll = all + 1;
    setAll(newAll);
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    const newAverage = (good * 1 + newNeutral * 0 + bad * -1) / newAll;
    setAverage(newAverage);
    const newPositive = (good / (good + newNeutral + bad)) * 100;
    setPositive(newPositive);
  };
  const handleBad = () => {
    const newAll = all + 1;
    setAll(newAll);
    const newBad = bad + 1;
    setBad(newBad);
    const newAverage = (good * 1 + neutral * 0 + newBad * -1) / newAll;
    setAverage(newAverage);
    const newPositive = (good / (good + neutral + newBad)) * 100;
    setPositive(newPositive);
  };

  return (
    <>
      <h1>Give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <br />
      <br />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;

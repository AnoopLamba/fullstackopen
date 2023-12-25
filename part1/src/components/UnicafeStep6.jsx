import { useState } from "react";

const StatisticLine = (props) => {
  const { value, text } = props;
  const formattedValue = parseFloat(value.toFixed(2));

  return (
    <tr>
      <td>{text}</td>
      <td>{formattedValue}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, average, positive, all } = props;

  if (all) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Statistics</th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      </>
    );
  }
  return (
    <>
      <h2>No feedback given</h2>
    </>
  );
};

const UnicafeStep6 = () => {
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

  const Button = (props) => {
    const { onClick, text } = props;

    return <button onClick={onClick}>{text}</button>;
  };

  return (
    <>
      <h1>Give feedback</h1>
      <br />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
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

export default UnicafeStep6;

import React, { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Statistics = ({ statistics }) => {
  let totalCounts = 0,
    numPositive = 0,
    totalPoints = 0;
  statistics.forEach((feedback) => {
    if (feedback.name === 'good') numPositive = feedback.count;
    totalCounts += feedback.count;
    totalPoints += feedback.count * feedback.points;
  });
  if (totalCounts > 0) {
    return (
      <table>
        <tbody>
          {statistics.map((feedback, i) => (
            <Statistic key={i} text={feedback.name} value={feedback.count} />
          ))}
          <tr>
            <td>all</td>
            <td>{totalCounts}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{totalPoints / totalCounts}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{(numPositive / totalCounts) * 100} %</td>
          </tr>
        </tbody>
      </table>
    );
  } else return <div>No feedback given</div>;
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  let statistics = [
    {
      name: 'good',
      points: 1,
      count: good,
    },
    {
      name: 'neutral',
      points: 0,
      count: neutral,
    },
    {
      name: 'bad',
      points: -1,
      count: bad,
    },
  ];

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h2>statistics</h2>
      <Statistics statistics={statistics} />
    </div>
  );
};

export default App;

import React, { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Anectote = ({ text, points }) => {
  return (
    <>
      <div>{text}</div>
      <div>has {points} votes</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const handleAnecdoteClick = () => {
    let index;
    do {
      index = Math.floor(Math.random() * anecdotes.length);
    } while (index === selected);
    setSelected(index);
  };

  const handleVoteClick = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const zeroFillArray = (len) => new Array(len).fill(0);

  const getIndexMaxVal = (arr) => {
    return arr.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);
  };

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(zeroFillArray(anecdotes.length));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anectote text={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleAnecdoteClick} text='next anecdote' />
      <h1>Anecdote with the most votes</h1>
      <Anectote text={anecdotes[getIndexMaxVal(points)]} points={points[getIndexMaxVal(points)]} />
    </div>
  );
};

export default App;

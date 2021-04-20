import React from 'react';

const Total = ({ course }) => {
  const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Number of exercises {sum}</strong>
    </p>
  );
};

export default Total;

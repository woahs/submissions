import React from 'react';

const Persons = ({ persons, filter, removePerson }) => {
  return (
    <table>
      <tbody>
        {persons
          .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person) => (
            <tr key={person.id} className='person'>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={() => removePerson(person.id)}>delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Persons;

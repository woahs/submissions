import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initPersons) => {
      setPersons(initPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.map((person) => person.name).includes(newName)) {
      const personFound = persons.find((p) => p.name === newName);
      if (personFound.number === newNumber) {
        setMessage({
          type: 'error',
          text: `${newName} with number, ${newNumber}, has already been added to phonebook`,
        });
      } else {
        let res = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if (res)
          personService.update(personFound.id, personObject).then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== personFound.id ? person : returnedPerson)));
            setMessage({ type: 'success', text: `Updated ${returnedPerson.name}` });
          });
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage({ type: 'success', text: `Added ${returnedPerson.name}` });
      });
    }
    setNewName('');
    setNewNumber('');
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const removePerson = (id) => {
    const personFound = persons.find((p) => p.id === id);
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        setMessage({
          type: 'success',
          text: `Removed ${personFound.name}`,
        });
      })
      .catch((err) => {
        setMessage({
          type: 'error',
          text: `Information of ${personFound.name} has already been removed from the server`,
        });
        setPersons(persons.filter((p) => p.id !== id));
      });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  );
};

export default App;

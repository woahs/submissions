import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} onChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} maxMatches={10} />
    </div>
  );
};

export default App;

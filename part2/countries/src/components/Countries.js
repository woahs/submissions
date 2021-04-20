import React from 'react';
import Country from './Country';

const Countries = ({ countries, filter, maxMatches }) => {
  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()));
  console.log(filteredCountries);
  if (filteredCountries.length > maxMatches) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  }
  return (
    <table>
      <tbody>
        {filteredCountries.map((country) => (
          <tr key={country.numericCode}>
            <td>{country.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Countries;

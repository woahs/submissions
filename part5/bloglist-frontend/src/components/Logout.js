import React from 'react';

const Logout = ({ setUser }) => {
  const handleButton = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  };
  return <button onClick={handleButton}>Log Out</button>;
};

export default Logout;

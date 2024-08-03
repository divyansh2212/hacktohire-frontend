import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <input
      type="text"
      placeholder="Search by Flight ID"
      value={searchTerm}
      onChange={handleInputChange}
      style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
    />
  );
};

export default SearchBar;

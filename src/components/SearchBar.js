import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  // Keep input in sync with parent component's search state
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  return (
    <div className="search-input-wrapper">
      <input
        type="text"
        placeholder="Search and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="enhanced-search-input"
      />
      <div className="search-icons">
        <i className="search-icon">🔍</i>
        {inputValue && (
          <button 
            className="clear-search"
            onClick={handleClear}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
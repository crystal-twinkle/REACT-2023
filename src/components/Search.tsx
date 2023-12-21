import React, { FormEvent, useEffect, useState } from 'react';

interface SearchProps {
  title: string;
  inputSearch: (arg: string) => void;
}

const Search: React.FC<SearchProps> = ({ title, inputSearch }) => {
  const localSearch = localStorage.getItem('search');
  const [inputValue, setInputValue] = useState(localSearch || '');

  useEffect(() => {
    localSearch && setInputValue(localSearch);
  }, [localSearch]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    localStorage.setItem('search', query);
    setInputValue(query);
  };

  const searchClick = () => {
    if (inputValue != null) {
      inputSearch(inputValue);
    }
  };

  return (
    <form
      className="search-form"
      onSubmit={(event: FormEvent) => event.preventDefault()}
    >
      <span style={{ textAlign: 'center', fontWeight: 'bold' }}> {title}</span>
      <input
        className="input"
        type="text"
        placeholder=""
        onChange={inputHandler}
        value={inputValue || ''}
      />
      <button type="submit" className="search-btn" onClick={searchClick}>
        search
      </button>
    </form>
  );
};

export default Search;

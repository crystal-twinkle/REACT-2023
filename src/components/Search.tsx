import React, { FormEvent, useContext, useState } from 'react';
import { AppContext } from '../contexts/app-context';

const Search = () => {
  const [inputSearchValue, setInputSearchValue] = useState(
    localStorage.getItem('search') || ''
  );
  const { setSearchValue } = useContext(AppContext);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    localStorage.setItem('search', query);
    setInputSearchValue(query);
  };

  const searchClick = () => {
    setSearchValue(inputSearchValue);
  };

  return (
    <form
      className="search-form"
      onSubmit={(event: FormEvent) => event.preventDefault()}
    >
      <span style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Write something
      </span>
      <input
        className="input"
        type="text"
        placeholder=""
        onChange={inputHandler}
        value={inputSearchValue}
      />
      <button type="submit" className="search-btn" onClick={searchClick}>
        search
      </button>
    </form>
  );
};

export default Search;

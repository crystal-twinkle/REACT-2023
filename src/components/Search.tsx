import React, { FormEvent, useState } from 'react';
import { useActions, useAppSelector } from '../store/redux-hooks';

const Search = () => {
  const { updateSearchQuery, setSearchState } = useActions();
  const { query } = useAppSelector((state) => state.search);
  const [inputSearchValue, setInputSearchValue] = useState(query);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    localStorage.setItem('search', query);
    setInputSearchValue(query);
  };

  const searchClick = () => {
    updateSearchQuery(inputSearchValue);
    setSearchState(!!inputSearchValue);
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

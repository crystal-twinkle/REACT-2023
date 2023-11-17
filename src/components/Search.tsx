import React, { FormEvent, useEffect, useState } from 'react';
import { useActions, useAppSelector } from '../store/redux-hooks';

const Search = () => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const { updateSearchQuery, setSearchState } = useActions();
  const { query } = useAppSelector((state) => state.search);

  useEffect(() => {
    const init = () => {
      setInputSearchValue(query);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    localStorage.setItem('search', query);
    setInputSearchValue(query);
  };

  const searchClick = () => {
    updateSearchQuery(inputSearchValue);
    setSearchState(!query);
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

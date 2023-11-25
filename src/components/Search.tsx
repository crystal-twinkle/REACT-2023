import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

const Search = () => {
  const [inputSearchValue, setInputSearchValue] = useState(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('search') || ''
      : ''
  );
  const router = useRouter();

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = event.target.value;
    localStorage.setItem('search', queryValue);
    setInputSearchValue(queryValue);
  };

  const searchClick = async () => {
    await router.push({
      query: { ...router.query, search: inputSearchValue },
    });
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

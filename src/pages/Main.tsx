import React, { useEffect, useState } from 'react';
import { IPost } from '../components/models';
import PokemonApi from '../API/api';
import Search from '../components/Search';
import PostList from '../components/PostList';
import Loading from '../components/Loading';
import useFetch from '../components/useFetch';

const Main = () => {
  const [newData, setNewData] = useState<IPost[]>([]);
  const [isError, setIsError] = useState(false);
  const localSearch = localStorage.getItem('search') as string;
  const [fetchByName, isLoading, isFetchError] = useFetch(async (search) => {
    if (search) {
      const response = await PokemonApi.getByName(search);
      setNewData([response]);
    } else {
      const response = await PokemonApi.getALL();
      setNewData(response);
    }
  });

  const inputSearch = (searchQuery: string) => {
    isFetchError && setNewData([]);
    fetchByName(searchQuery);
  };

  useEffect(() => {
    inputSearch(localSearch || '');
  }, [localSearch]);

  const errorClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('Test error');
  }
  return (
    <div className="app">
      <button className="error-btn" onClick={errorClick}>
        Generate Error
      </button>
      <Search title="Write something" inputSearch={inputSearch} />
      {isLoading ? <PostList posts={newData} title="You List" /> : <Loading />}
    </div>
  );
};

export default Main;

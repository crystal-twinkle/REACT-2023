import React, { useState, useEffect } from 'react';
import './assets/App.css';
import Search from './components/Search';
import PostList from './components/PostList';
import { IPost } from './components/models';
import PokemonApi from './API/api';
import Loading from './components/Loading';

const App = () => {
  const [newData, setNewData] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const localSearch = localStorage.getItem('search') as string;

  const inputSearch = async (searchQuery: string) => {
    setIsLoading(false);
    searchQuery
      ? await PokemonApi.getByName(searchQuery.toLowerCase())
          .then((res: IPost) => {
            setNewData([res]);
          })
          .catch(() => setNewData([]))
      : PokemonApi.getALL().then((data: IPost[]) => {
          setNewData(data);
        });
    setIsLoading(true);
  };

  useEffect(() => {
    setIsLoading(false);
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

export default App;

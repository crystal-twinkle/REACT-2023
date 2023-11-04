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
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [fetch, isLoading, isFetchError] = useFetch(async (search: string) => {
    if (search) {
      const response = await PokemonApi.getByName(search);
      setNewData([response]);
    } else {
      const { resolved, count } = await PokemonApi.getALL();
      setTotalPages(Math.ceil(count / 20));
      setNewData(resolved);
    }
  });

  const changePage = (page: number) => {
    setPage(page);
  };

  const inputSearch = (searchQuery: string) => {
    fetch(searchQuery);
  };

  useEffect(() => {
    inputSearch(localSearch || '');
    isFetchError && setNewData([]);
  }, [localSearch, isFetchError]);

  const errorClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('Test error');
  }
  return (
    <div>
      <button className="error-btn" onClick={errorClick}>
        Generate Error
      </button>
      <Search title="Write something" inputSearch={inputSearch} />
      {isLoading ? (
        <PostList
          page={page}
          changePage={changePage}
          totalPages={totalPages}
          posts={newData}
          title="You List"
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Main;

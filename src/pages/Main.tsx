import React, { useEffect, useState } from 'react';
import { IPost } from '../components/models';
import PokemonApi from '../API/api';
import Search from '../components/Search';
import PostList from '../components/PostList';
import Loading from '../components/Loading';
import useFetch from '../components/useFetch';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';

const Main = () => {
  const [newData, setNewData] = useState<IPost[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [urlPageString, setUrlPageString] = useSearchParams();
  const [page, setPage] = useState(urlPageString.get('page') || '1');

  const [fetch, isLoading, isFetchError] = useFetch(
    async (search: string, page: string) => {
      if (search) {
        await setIsSearch(true);
        const response = await PokemonApi.getByName(search);
        setNewData([response]);
      } else {
        const countPosts = 20;
        const offset = Number(page) * countPosts;
        const { resolved, count } = await PokemonApi.getALL(offset);
        setTotalPages(Math.ceil(count / 20));
        setIsSearch(false);
        setNewData(resolved);
      }
    }
  );

  const changePage = (page: string) => {
    setUrlPageString({ page: page });
    setPage(page);
  };

  const inputSearch = (searchQuery: string) => {
    fetch(searchQuery);
  };

  useEffect(() => {
    const localSearch = localStorage.getItem('search') as string;
    fetch(localSearch || '', page);
  }, [page]);

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
        <>
          <PostList
            posts={newData}
            isFetchError={isFetchError}
            title={!isSearch ? 'Generic List' : 'You List'}
          />
          {!isSearch && !isFetchError && (
            <Pagination totalPages={totalPages} changePage={changePage} />
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Main;

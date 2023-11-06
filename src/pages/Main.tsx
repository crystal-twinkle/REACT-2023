import React, { useCallback, useEffect, useState } from 'react';
import { IPost } from '../components/models';
import PokemonApi from '../API/api';
import Search from '../components/Search';
import PostList from '../components/PostList';
import Loading from '../components/Loading';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';

const Main = () => {
  const [newData, setNewData] = useState<IPost[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [urlPageString, setUrlPageString] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalCountPosts, setTotalCountPosts] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchError, setError] = useState(false);

  const fetch = useCallback(
    async (search: string, page: number, limit: number) => {
      try {
        await setIsLoading(false);
        await setError(false);
        if (search) {
          await setIsSearch(true);
          const response = await PokemonApi.getByName(search);
          setNewData([response]);
        } else {
          const offset = 1 + limit * (Number(page) - 1);
          const { resolved, countPosts } = await PokemonApi.getALL(
            limit,
            offset
          );
          setTotalCountPosts(countPosts);
          const countPages = Math.ceil((countPosts - 1) / limit);
          setTotalPages(countPages);
          setIsSearch(false);
          setNewData(resolved);
        }
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(true);
      }
    },
    []
  );

  useEffect(() => {
    const init = () => {
      const localSearch = localStorage.getItem('search') as string;
      const currentPage = Number(urlPageString.get('page')) || 1;
      if (currentPage === 1) {
        setUrlPageString({ page: '1' });
      }
      setPage(currentPage);
      fetch(localSearch || '', currentPage, limit);
    };
    init();
  }, [setUrlPageString, urlPageString, fetch, limit]);

  const changePage = (page: number) => {
    setUrlPageString({ page: String(page) });
    setPage(page);
  };

  const setCountPosts = (num: number) => {
    setLimit(num);
    setUrlPageString({ page: '1' });
  };

  const inputSearch = (searchQuery: string) => {
    fetch(searchQuery, page, limit);
  };

  const errorClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('Test error');
  }

  return (
    <div className={`main-wrap`}>
      <div className={`main`}>
        <div className={`header`}>
          <Search title="Write something" inputSearch={inputSearch} />
          <button className="error-btn" onClick={errorClick}>
            Generate Error
          </button>
        </div>
        {isLoading ? (
          <>
            <PostList
              page={page}
              posts={newData}
              isFetchError={isFetchError}
              title={!isSearch ? 'Generic List' : 'You List'}
            />
            {!isSearch && (
              <Pagination
                totalPages={totalPages}
                changePage={changePage}
                totalCountPosts={totalCountPosts}
                setCountPosts={setCountPosts}
                limit={limit}
                page={page}
              />
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Main;

import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { useGetAllCardsQuery } from '../services/pokemonAPI';
import { useAppSelector } from '../store/redux-hooks';
import PostList from '../components/PostList';

const Main = () => {
  const { query, isSearch } = useAppSelector((state) => state.search);
  const [isMyError, setIsMyError] = useState(false);
  const [urlPageString, setUrlPageString] = useSearchParams();
  const [limit, setLimit] = useState(20);
  const currentPage = Number(urlPageString.get('page')) || 1;
  const offset = 1 + limit * (Number(currentPage) - 1);

  const { data } = useGetAllCardsQuery({
    query,
    limit,
    offset,
  });

  useEffect(() => {
    const init = async () => {
      if (currentPage === 1) {
        setUrlPageString({ page: '1' });
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPage, query]);

  const changePage = (page: number) => {
    setUrlPageString({ page: String(page) });
  };

  const setCountPosts = (num: number) => {
    setLimit(num);
    setUrlPageString({ page: '1' });
  };

  const errorClick = () => {
    setIsMyError(true);
  };

  if (isMyError) {
    throw new Error('Test error');
  }

  return (
    <div className={`main-wrap`}>
      <div className={`main`}>
        <div className={`header`}>
          <Search />
          <button className="error-btn" onClick={errorClick}>
            Generate Error
          </button>
        </div>
        <PostList page={currentPage} />
        {data && !isSearch && (
          <Pagination
            changePage={changePage}
            totalCountPosts={data.count}
            setCountPosts={setCountPosts}
            limit={limit}
            page={currentPage}
          />
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Main;

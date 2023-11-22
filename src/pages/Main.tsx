import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import PostList from '../components/PostList';
import Loading from '../components/Loading';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { useGetAllCardsQuery } from '../services/pokemonAPI';
import { useActions, useAppSelector } from '../store/redux-hooks';

const Main = () => {
  const { query } = useAppSelector((state) => state.search);
  const { posts } = useAppSelector((state) => state.pokemon);
  const { updateItems } = useActions();
  const [isMyError, setIsMyError] = useState(false);
  const [urlPageString, setUrlPageString] = useSearchParams();
  const [limit, setLimit] = useState(20);
  const currentPage = Number(urlPageString.get('page')) || 1;
  const offset = 1 + limit * (Number(currentPage) - 1);

  const { data, isLoading } = useGetAllCardsQuery({
    query,
    limit,
    offset,
  });

  useEffect(() => {
    const init = async () => {
      if (query) {
        data && updateItems([data]);
      } else {
        data && updateItems(data.results);
      }
      if (currentPage === 1) {
        setUrlPageString({ page: '1' });
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPage]);

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
        {!isLoading ? (
          <>
            <PostList page={currentPage} posts={posts} />
            {data?.count && !query && (
              <Pagination
                changePage={changePage}
                totalCountPosts={data.count}
                setCountPosts={setCountPosts}
                limit={limit}
                page={currentPage}
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

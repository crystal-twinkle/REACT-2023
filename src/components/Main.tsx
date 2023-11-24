import React, { useEffect, useState } from 'react';
import Search from './Search';
import Pagination from './Pagination';
import { useGetAllCardsQuery } from '../services/pokemonAPI';
import { useAppSelector } from '../store/redux-hooks';
import { useRouter } from 'next/router';
import PostList from './PostList';
import PostDetail from './PostDetail';
import Loading from './Loading';
import styles from '../assets/Main.module.css';
import ErrorBtn from './Error/ErrorBtn';

const Main = () => {
  const { query, isSearch } = useAppSelector((state) => state.search);
  const router = useRouter();
  const [limit, setLimit] = useState(20);
  const currentPage = Number(router.query.page) || 1;
  const offset = 1 + limit * (currentPage - 1);

  const { data, isLoading } = useGetAllCardsQuery({
    query,
    limit,
    offset,
  });

  useEffect(() => {
    const init = async () => {
      if (currentPage === 1) {
        await router.push({
          query: {
            page: '1',
          },
        });
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPage, query]);

  const changePage = (page: number) => {
    router.push({
      query: {
        page,
      },
    });
  };

  const setCountPosts = (num: number) => {
    setLimit(num);
    router.push({
      query: {
        page: '1',
      },
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <div className={styles.header}>
          <Search />
          <ErrorBtn />
        </div>
        {!isLoading ? (
          <>
            <PostList page={currentPage} dataAll={data ? data?.results : []} />
            {data && !isSearch && (
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
      {router.query.id && <PostDetail />}
    </div>
  );
};

export default Main;

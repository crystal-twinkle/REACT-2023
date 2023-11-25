import React from 'react';
import Search from './Search';
import Pagination from './Pagination';
import { useRouter } from 'next/router';
import PostList from './PostList';
import PostDetail from './PostDetail';
import Loading from './Loading';
import styles from '../assets/Main.module.css';
import ErrorBtn from './Error/ErrorBtn';
import { gSSP } from '../types/models';

const Main = ({ cards }: gSSP) => {
  const router = useRouter();
  const { search, id } = router.query;

  const { loading } = cards;

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <div className={styles.header}>
          <Search />
          <ErrorBtn />
        </div>
        {!loading ? (
          <>
            <PostList cards={cards} />
            {!search && <Pagination />}
          </>
        ) : (
          <Loading />
        )}
      </div>
      {id && <PostDetail />}
    </div>
  );
};

export default Main;

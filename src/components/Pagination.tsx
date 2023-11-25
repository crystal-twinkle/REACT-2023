import React, { useEffect, useState } from 'react';
import styles from '../assets/Pagination.module.css';
import { useRouter } from 'next/router';

const Pagination = () => {
  const router = useRouter();
  const { limit, page } = router.query;
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 20;

  const [inputSetPosts, setInputSetPosts] = useState(limitNumber);
  const [isMoveRight, setIsMoveRight] = useState(true);
  const [isMoveLeft, setIsMoveLeft] = useState(false);
  const totalCountPosts = 1200;

  const countTotalPages = Math.ceil(totalCountPosts / limitNumber);

  useEffect(() => {
    const setCurrentParameters = () => {
      if (pageNumber === 1) {
        setIsMoveLeft(false);
      } else {
        setIsMoveRight(true);
        setIsMoveLeft(true);
      }
      if (pageNumber === countTotalPages) {
        setIsMoveRight(false);
      }
    };
    setCurrentParameters();
  }, [pageNumber, countTotalPages]);

  const setPostsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value > 0 && value < totalCountPosts) {
      setInputSetPosts(value);
    }
  };

  const newSetPosts = async () => {
    if (inputSetPosts > 0 && inputSetPosts < totalCountPosts) {
      await router.push({
        query: { ...router.query, limit: inputSetPosts, page: 1 },
      });
    }
  };

  const clickLeft = async () => {
    if (pageNumber !== 1) {
      await router.push({
        query: { ...router.query, page: pageNumber - 1 },
      });
    }
  };

  const clickRight = async () => {
    if (pageNumber !== countTotalPages) {
      await router.push({
        query: { ...router.query, page: pageNumber + 1 },
      });
    }
  };

  return (
    <div className={styles.paginationWrap} data-tested="pagination-wrap">
      <div className={styles.paginationBtn}>
        <button
          disabled={!isMoveLeft}
          className={`${styles.knob} ${
            isMoveLeft ? styles.active : styles.inactive
          }`}
          onClick={clickLeft}
        >
          <span>&lt;</span>
        </button>
        <button
          className={`${styles.knob} ${styles.active}`}
          data-testid="current-page"
        >
          {page}
        </button>
        <button
          disabled={!isMoveRight}
          className={`${styles.knob} ${
            isMoveRight ? styles.active : styles.inactive
          }`}
          onClick={clickRight}
        >
          <span>&gt;</span>
        </button>
      </div>
      <div className={styles.setPosts}>
        <input
          value={inputSetPosts}
          type="number"
          step="1"
          min="1"
          max={totalCountPosts}
          onChange={setPostsHandler}
        />
        <button onClick={newSetPosts}>Set Posts</button>
      </div>
    </div>
  );
};

export default Pagination;

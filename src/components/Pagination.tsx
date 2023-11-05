import React, { useEffect, useState } from 'react';
import '../assets/Pagination.css';

interface IPaginationProps {
  totalPages: number;
  changePage: (newPage: number) => void;
  totalCountPosts: number;
  setCountPosts: (limit: number) => void;
  limit: number;
  page: number;
}

const Pagination = ({
  totalPages,
  changePage,
  totalCountPosts,
  setCountPosts,
  limit,
  page,
}: IPaginationProps) => {
  const [inputValueSetPosts, setInputValueSetPosts] = useState(20);
  const [isMoveRight, setIsMoveRight] = useState(true);
  const [isMoveLeft, setIsMoveLeft] = useState(false);

  useEffect(() => {
    const setCurrentParameters = (limit: number) => {
      setInputValueSetPosts(limit);
      if (page === 1) {
        setIsMoveLeft(false);
      } else {
        setIsMoveRight(true);
        setIsMoveLeft(true);
      }
      if (page === totalPages) {
        setIsMoveRight(false);
      }
    };
    setCurrentParameters(limit);
  }, [page, totalPages, limit]);

  const inputSetPosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value > 0 && value < totalCountPosts) {
      setInputValueSetPosts(value);
    }
  };

  const newSetPosts = () => {
    if (inputValueSetPosts > 0 && inputValueSetPosts < totalCountPosts) {
      setCountPosts(inputValueSetPosts);
    }
  };

  const clickLeft = () => {
    if (page !== 1) {
      changePage(page - 1);
    }
  };

  const clickRight = () => {
    if (page !== totalPages) {
      changePage(page + 1);
    }
  };

  return (
    <div className="pagination-wrap">
      <div className="pagination-btn">
        <button
          disabled={!isMoveLeft}
          className={`knob ${isMoveLeft ? 'active' : 'inactive'}`}
          onClick={clickLeft}
        >
          <span>&lt;</span>
        </button>
        <button className="knob current-page active" id="current-page">
          {page}
        </button>
        <button
          disabled={!isMoveRight}
          className={`knob ${isMoveRight ? 'active' : 'inactive'}`}
          onClick={clickRight}
        >
          <span>&gt;</span>
        </button>
      </div>
      <div className={'set-posts'}>
        <input
          value={inputValueSetPosts}
          type="number"
          step="1"
          min="1"
          max={totalCountPosts}
          onChange={inputSetPosts}
        />
        <button onClick={newSetPosts}>Set Posts</button>
      </div>
    </div>
  );
};

export default Pagination;

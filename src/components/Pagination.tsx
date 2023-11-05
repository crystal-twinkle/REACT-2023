import React, { useEffect, useState } from 'react';

interface IPaginationProps {
  totalPages: number;
  changePage: (newPage: number) => void;
  totalCountPosts: number;
  setCountPosts: (limit: number) => void;
  limit: number;
}

const Pagination = ({
  totalPages,
  changePage,
  totalCountPosts,
  setCountPosts,
  limit,
}: IPaginationProps) => {
  const [inputValueSetPosts, setInputValueSetPosts] = useState(20);

  function getPagesArray() {
    const result = [];
    for (let i = 0; i < totalPages; i++) {
      result.push(i + 1);
    }
    return result;
  }

  useEffect(() => {
    const setInputValue = (limit: number) => {
      setInputValueSetPosts(limit);
    };
    setInputValue(limit);
  }, [limit]);

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

  return (
    <>
      <div className="pagination-wrap">
        {getPagesArray().map((p) => (
          <button onClick={() => changePage(p)} key={p}>
            {p}
          </button>
        ))}
      </div>
      <input
        value={inputValueSetPosts}
        type="number"
        step="1"
        min="1"
        max={totalCountPosts}
        onChange={inputSetPosts}
      />
      <button onClick={newSetPosts}>Set Posts</button>
    </>
  );
};

export default Pagination;

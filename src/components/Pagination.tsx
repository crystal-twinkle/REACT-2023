import React from 'react';

interface IPaginationProps {
  totalPages: number;
  changePage: (newPage: string) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ totalPages, changePage }) => {
  function getPagesArray() {
    const result = [];
    for (let i = 0; i < totalPages; i++) {
      result.push(i + 1);
    }
    return result;
  }

  return (
    <div className="pagination-wrap">
      {getPagesArray().map((p) => (
        <button onClick={() => changePage(String(p))} key={p}>
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

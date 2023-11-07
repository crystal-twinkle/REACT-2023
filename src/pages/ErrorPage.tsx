import React from 'react';
import '../assets/ErrorPage.css';

interface IErrorPageProps {
  isErrorChange: (arg: boolean) => void;
}

const ErrorPage = ({ isErrorChange }: IErrorPageProps) => {
  const change = () => {
    isErrorChange(false);
  };

  return (
    <div className="error-wrap">
      <div className="error__text">OOPS, something went wrong (((</div>
      <button className="button-21" onClick={change}>
        Reset
      </button>
    </div>
  );
};

export default ErrorPage;

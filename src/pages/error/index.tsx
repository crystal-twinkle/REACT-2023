import React from 'react';
import styles from '../../assets/ErrorPage.module.css';

interface IErrorPageProps {
  isErrorChange: (arg: boolean) => void;
}

const ErrorPage = ({ isErrorChange }: IErrorPageProps) => {
  const change = () => {
    isErrorChange(false);
  };

  return (
    <div className={styles.errorWrap}>
      <div className={styles.error__text}>OOPS, something went wrong (((</div>
      <button className={styles.button21} onClick={change}>
        Reset
      </button>
    </div>
  );
};

export default ErrorPage;
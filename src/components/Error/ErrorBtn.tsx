import { useEffect, useState } from 'react';
import styles from '../../assets/Error.module.css';

const ErrorBtn = () => {
  const [isMyError, setIsMyError] = useState(false);

  useEffect(() => {
    if (isMyError) {
      throw new Error('Test error');
    }
  }, [isMyError]);

  const errorClick = () => {
    setIsMyError(true);
  };

  return (
    <button className={styles.errorBtn} onClick={errorClick}>
      Generate Error
    </button>
  );
};

export default ErrorBtn;

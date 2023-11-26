import styles from '../assets/Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.text}>Loading...</div>
    </div>
  );
};

export default Loading;

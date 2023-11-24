import React from 'react';
import styles from '../assets/PostDetail.module.css';
import { useRouter } from 'next/router';
import { useGetDetailedCardQuery } from '../services/pokemonAPI';
import Loading from './Loading';

const PostDetail = () => {
  const router = useRouter();
  const name = router?.query?.id?.toString();
  const page = router?.query?.page?.toString();
  const { data, isLoading } = useGetDetailedCardQuery(name || '');

  function close() {
    router.push({
      pathname: '',
      query: { page },
    });
  }

  function description() {
    return (
      <div>
        {data && (
          <div className={styles.postDetail}>
            <h4 className={styles.name}>{data.name}</h4>
            <div>
              <img src={data.sprites.front_default} alt="front" />
              <img src={data.sprites.back_default} alt="back" />
              <img src={data.sprites.front_shiny} alt="shiny" />
            </div>
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
            <button className={styles.btnClose} onClick={close}>
              Close
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div onClick={close} className={styles.blackout}></div>
      <div className={styles.postDetailWrap}>
        {!isLoading ? description() : <Loading />}
      </div>
    </>
  );
};

export default PostDetail;

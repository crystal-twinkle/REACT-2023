import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import '../assets/PostDetail.css';
import { useGetDetailedCardQuery } from '../services/pokemonAPI';

const PostDetail = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const page = searchParams.get('page');
  const navigate = useNavigate();
  const { data, isLoading } = useGetDetailedCardQuery(name || '');

  function close() {
    navigate(`/posts?page=${page}`);
  }

  function description() {
    return (
      <div className="post-detail-subwrap">
        {data && (
          <div className="post-detail">
            <h4>{data.name}</h4>
            <div>
              <img src={data.sprites.front_default} alt="front" />
              <img src={data.sprites.back_default} alt="back" />
              <img src={data.sprites.front_shiny} alt="shiny" />
            </div>
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
            <button className="btn-close" onClick={close}>
              Close
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className={`post-detail-wrap`}>
        <div onClick={close} className={`blackout`}></div>
        {!isLoading ? description() : <Loading />}
      </div>
    </>
  );
};

export default PostDetail;

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../components/useFetch';
import PokemonApi from '../API/api';
import Loading from '../components/Loading';
import { IPost } from '../components/models';
import { useNavigate } from 'react-router-dom';
import '../assets/PostDetail.css';

const PostDetail = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const name = searchParams.get('name');
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<IPost>({} as IPost);
  const [fetch, isLoading] = useFetch(async (search) => {
    const response = await PokemonApi.getByName(search);
    setPokemon(response);
  });

  useEffect(() => {
    if (name) {
      fetch(name);
    }
  }, [name]);

  function close() {
    navigate(`/posts?page=${page}`);
  }

  function description(): JSX.Element {
    return (
      <>
        <div className="post-detail" id="post-detail">
          <h4>Pokemon name is {pokemon.name}</h4>
          <img
            className={`img-detail`}
            src={pokemon.sprites.front_default}
            alt="front"
          />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <button className="btn-close" onClick={close}>
            Close
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {page && name && (
        <div>
          <div onClick={close} className={`blackout blackout-show`}></div>
          <div className="post-detail_wrap">
            {isLoading ? description() : <Loading />}
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;

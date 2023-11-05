import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(false);
  const fetch = useCallback(async (search: string) => {
    try {
      setIsLoading(false);
      const response = await PokemonApi.getByName(search);
      setPokemon(response);
    } finally {
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    if (name) {
      fetch(name);
    }
  }, [fetch, name]);

  function close() {
    navigate(`/posts?page=${page}`);
  }

  function description() {
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
      <div>
        <div onClick={close} className={`blackout blackout-show`}></div>
        <div className="post-detail_wrap">
          {isLoading ? description() : <Loading />}
        </div>
      </div>
    </>
  );
};

export default PostDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../components/useFetch';
import PokemonApi from '../API/api';
import Loading from '../components/Loading';
import { IPost } from '../components/models';
import { useNavigate } from 'react-router-dom';
import '../assets/PostDetail.css';

const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [pokemon, setPokemon] = useState<IPost>({} as IPost);
  const [fetch, isLoading] = useFetch(async (search) => {
    const response = await PokemonApi.getByName(search);
    setPokemon(response);
  });

  useEffect(() => {
    fetch(params.name as string);
  }, [params.name]);

  function close() {
    navigate('/posts');
  }

  function description(): JSX.Element {
    return (
      <>
        <div className="post-detail" id="post-detail">
          <h4>Pokemon name is {pokemon.name}</h4>
          <img src={pokemon.sprites.front_default} alt="front" />
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
    <div>
      <div onClick={close} className={`blackout blackout-show`}></div>
      <div className="post-detail_wrap">
        {isLoading ? description() : <Loading />}
      </div>
    </div>
  );
};

export default PostDetail;

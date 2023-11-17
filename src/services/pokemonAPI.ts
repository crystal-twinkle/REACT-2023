import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../components/models';

interface IGetAllCardsParams {
  limit: number;
  offset: number;
}

interface IPokemonsResponse {
  count: number;
  results: IPost[];
}

export const pokemonAPI = createApi({
  reducerPath: 'PokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  endpoints: (builder) => {
    return {
      getAllCards: builder.query<IPokemonsResponse, IGetAllCardsParams>({
        query: ({ limit, offset }) => ({
          url: '',
          params: {
            limit,
            offset,
          },
        }),
      }),
      getDetailedCard: builder.query<IPost, string>({
        query: (name) => ({
          url: `/${name}`,
        }),
      }),
    };
  },
});

export const { useGetAllCardsQuery, useGetDetailedCardQuery } = pokemonAPI;

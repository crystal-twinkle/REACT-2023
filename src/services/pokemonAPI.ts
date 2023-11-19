import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost, IDetailPost } from '../components/models';

interface IGetAllCardsParams {
  limit: number;
  offset: number;
}

interface IPokemonResponse {
  count: number;
  results: IPost[];
}

export const pokemonAPI = createApi({
  reducerPath: 'PokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  endpoints: (builder) => {
    return {
      getAllCards: builder.query<IPokemonResponse, IGetAllCardsParams>({
        query: ({ limit, offset }) => ({
          url: '',
          params: {
            limit,
            offset,
          },
        }),
      }),
      getDetailedCard: builder.query<IDetailPost, string>({
        query: (name) => ({
          url: `/${name}`,
        }),
      }),
    };
  },
});

export const { useGetAllCardsQuery, useGetDetailedCardQuery } = pokemonAPI;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost, IDetailPost } from '../types/models';
import { HYDRATE } from 'next-redux-wrapper';

interface IGetAllCardsParams {
  limit: number;
  offset: number;
  search: string;
}

interface IPokemonResponse {
  count: number;
  results: IPost[];
  name: string;
}

export const pokemonAPI = createApi({
  reducerPath: 'PokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => {
    return {
      getAllCards: builder.query<IPokemonResponse, IGetAllCardsParams>({
        query: ({ limit, offset, search }) => ({
          url: `/${search}`,
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

export const {
  useGetAllCardsQuery,
  useGetDetailedCardQuery,
  util: { getRunningQueriesThunk },
} = pokemonAPI;
export const { getAllCards, getDetailedCard } = pokemonAPI.endpoints;

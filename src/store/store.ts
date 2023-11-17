import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from './reducers/searchSlice';
import { pokemonAPI } from '../services/pokemonAPI';

const store = configureStore({
  reducer: {
    [pokemonAPI.reducerPath]: pokemonAPI.reducer,
    search: searchReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

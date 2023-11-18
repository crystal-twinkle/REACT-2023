import { PreloadedState, configureStore } from '@reduxjs/toolkit';
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

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      [pokemonAPI.reducerPath]: pokemonAPI.reducer,
      search: searchReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(pokemonAPI.middleware),
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;

export default store;

import {
  PreloadedState,
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import { searchReducer } from './reducers/searchSlice';
import { pokemonAPI } from '../services/pokemonAPI';
import { pokemonReducer } from './reducers/pokemonSlice';

const rootReducer = combineReducers({
  [pokemonAPI.reducerPath]: pokemonAPI.reducer,
  search: searchReducer,
  pokemon: pokemonReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonAPI.middleware),
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(pokemonAPI.middleware),
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export default store;

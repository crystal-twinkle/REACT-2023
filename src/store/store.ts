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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonAPI.middleware),
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
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

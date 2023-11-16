import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from './reducers/searchSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

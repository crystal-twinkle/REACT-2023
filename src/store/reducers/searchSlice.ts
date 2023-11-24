import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
  query: string;
  isSearch: boolean;
}

export const initialState: ISearchState = {
  query:
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('search') || ''
      : '',
  isSearch:
    typeof localStorage !== 'undefined'
      ? !!localStorage.getItem('search')
      : false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setSearchState(state, action: PayloadAction<boolean>) {
      state.isSearch = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

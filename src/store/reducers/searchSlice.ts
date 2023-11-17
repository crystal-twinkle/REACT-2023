import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface appState {
  query: string;
  isSearch: boolean;
}

const initialState: appState = {
  query: localStorage.getItem('search') || '',
  isSearch: !!localStorage.getItem('search'),
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

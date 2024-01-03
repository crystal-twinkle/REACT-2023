import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { searchActions } from './reducers/searchSlice';
import { RootState } from './store';
import { pokemonActions } from './reducers/pokemonSlice';

const actions = {
  ...searchActions,
  ...pokemonActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

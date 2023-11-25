import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './store';
import { pokemonActions } from './reducers/pokemonSlice';

const actions = {
  ...pokemonActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

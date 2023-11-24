import React, {
  PropsWithChildren,
  createContext,
  useState,
  useMemo,
} from 'react';
import { IPost } from '../types/models';

export interface IAppContext {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  posts: IPost[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export const AppContext = createContext<IAppContext>(null!);

const AppProvider = ({ children }: PropsWithChildren) => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('search') || ''
  );
  const [posts, setPosts] = useState<IPost[]>([]);

  const value = useMemo(
    () => ({
      searchValue,
      setSearchValue,
      posts,
      setPosts,
    }),
    [searchValue, posts]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

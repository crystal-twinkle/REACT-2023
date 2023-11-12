import React, {
  PropsWithChildren,
  createContext,
  useState,
  useMemo,
} from 'react';

interface ISearchContext {
  inputSearchValue: string;
  setInputSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
export const AppContext = createContext<ISearchContext>(null!);

const AppProvider = ({ children }: PropsWithChildren) => {
  const [inputSearchValue, setInputSearchValue] = useState(
    localStorage.getItem('search') || ''
  );
  const [searchValue, setSearchValue] = useState('');

  const value = useMemo(
    () => ({
      searchValue,
      setSearchValue,
      inputSearchValue,
      setInputSearchValue,
    }),
    [inputSearchValue, searchValue]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

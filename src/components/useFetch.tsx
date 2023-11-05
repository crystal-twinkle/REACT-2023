import { useState } from 'react';

const useFetch = (
  callback: (search: string, ...args: number[]) => Promise<void>
): [(search: string, ...args: number[]) => Promise<void>, boolean, boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetching = async (search: string, ...args: number[]) => {
    try {
      setIsLoading(false);
      await callback(search, ...args);
      setError(false);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(true);
    }
  };
  return [fetching, isLoading, error];
};

export default useFetch;

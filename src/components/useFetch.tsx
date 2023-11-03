import { useState } from 'react';

const useFetch = (
  callback: (arg: string) => Promise<void>
): [(arg: string) => void, boolean, boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetching = async (arg: string) => {
    try {
      setIsLoading(false);
      await callback(arg);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(true);
    }
  };
  return [fetching, isLoading, error];
};

export default useFetch;

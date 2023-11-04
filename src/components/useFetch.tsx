import { useState } from 'react';

const useFetch = (
  callback: (...args: string[]) => Promise<void>
): [(...args: string[]) => void, boolean, boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetching = async (...args: string[]) => {
    try {
      setIsLoading(false);
      await callback(...args);
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

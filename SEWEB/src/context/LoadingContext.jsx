import React, { createContext, useContext, useState } from 'react';
import { LoadingScreen } from '../components/ui/LoadingScreen';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = (callback) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (callback) callback();
    }, 1000);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading }}>
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);

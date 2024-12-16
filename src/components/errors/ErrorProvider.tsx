import { createContext, useContext, useState, useCallback } from 'react';
import { ErrorBanner } from './ErrorBanner';

interface ErrorContextType {
  setError: (message: string | null) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}

interface ErrorProviderProps {
  children: React.ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ErrorContext.Provider value={{ setError, clearError }}>
      <ErrorBanner message={error} onDismiss={clearError} />
      {children}
    </ErrorContext.Provider>
  );
}
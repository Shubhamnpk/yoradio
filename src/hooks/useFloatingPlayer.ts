import { useState, useCallback } from 'react';

export function useFloatingPlayer() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const show = useCallback(() => {
    setIsVisible(true);
    setIsMinimized(false);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const minimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const maximize = useCallback(() => {
    setIsMinimized(false);
  }, []);

  return {
    isVisible,
    isMinimized,
    show,
    hide,
    minimize,
    maximize,
  };
}
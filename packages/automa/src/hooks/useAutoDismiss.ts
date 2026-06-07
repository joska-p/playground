import { useEffect } from 'react';

const useAutoDismiss = (
  value: unknown,
  clear: () => void,
  ms: number
): void => {
  useEffect(() => {
    if (value) {
      const timer = setTimeout(clear, ms);
      return () => clearTimeout(timer);
    }
  }, [value, clear, ms]);
};

export { useAutoDismiss };

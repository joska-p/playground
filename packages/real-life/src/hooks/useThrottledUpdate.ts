import { useRef } from 'react';

export const useThrottledUpdate = (interval: number) => {
  const lastUpdateTime = useRef(0);
  const isFirstFrame = useRef(true);

  const shouldUpdate = (currentTime: number) => {
    if (isFirstFrame.current) {
      isFirstFrame.current = false;
      return true;
    }
    if (currentTime - lastUpdateTime.current >= interval) {
      lastUpdateTime.current = currentTime;
      return true;
    }
    return false;
  };

  return { shouldUpdate };
};

import { useMemo } from 'react';

export function useCanvasSize(dimensions: { width: number; height: number }) {
  return useMemo(() => {
    const logicalSize = Math.max(
      100,
      Math.min(Math.floor(Math.min(dimensions.width, dimensions.height)), 1024)
    );
    const dpr = window.devicePixelRatio || 1;
    const bitmapSize = Math.min(Math.round(logicalSize * dpr), 2048);
    return { logicalSize, bitmapSize };
  }, [dimensions]);
}

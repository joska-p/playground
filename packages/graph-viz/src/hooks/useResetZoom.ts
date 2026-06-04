import { useCallback } from 'react';

export function useResetZoom(
  targetXRef: React.RefObject<number>,
  targetYRef: React.RefObject<number>,
  targetZoomRef: React.RefObject<number>,
  isAnimatingResetRef: React.RefObject<boolean>
) {
  return useCallback(() => {
    targetXRef.current = 0;
    targetYRef.current = 0;
    targetZoomRef.current = 0.5;
    isAnimatingResetRef.current = true;
  }, [targetXRef, targetYRef, targetZoomRef, isAnimatingResetRef]);
}

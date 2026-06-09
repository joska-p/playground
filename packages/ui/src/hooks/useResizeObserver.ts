import { useCallback, useEffect, useRef, useState } from 'react';

type Dimensions = {
  width: number;
  height: number;
};

/**
 * A hook to observe the dimensions of a DOM element.
 * @returns [ref, dimensions]
 */
export function useResizeObserver<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  Dimensions | undefined,
] {
  const ref = useRef<T>(null);
  const [dimensions, setDimensions] = useState<Dimensions | undefined>(undefined);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!entries[0]) return;
    const { width, height } = entries[0].contentRect;
    setDimensions({ width, height });
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(handleResize);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [handleResize]);

  return [ref, dimensions];
}

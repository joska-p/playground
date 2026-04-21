import { useEffect, useRef, useState, useCallback } from "react";

interface Dimensions {
  width: number;
  height: number;
}

/**
 * A hook to observe the dimensions of a DOM element.
 * @returns [ref, dimensions]
 */
export function useResizeObserver<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  Dimensions,
] {
  const ref = useRef<T>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

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

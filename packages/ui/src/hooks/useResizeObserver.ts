import { useCallback, useRef, useState } from 'react';

type Dimensions = {
  width: number;
  height: number;
};

const DEBOUNCE_MS = 120;

export function useResizeObserver<T extends HTMLElement>(): [
  (node: T | null) => void,
  Dimensions
] {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0
  });
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ref = useCallback((node: T | null) => {
    if (!node) return;

    function applySize(width: number, height: number) {
      setDimensions((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height }
      );
    }

    // Measure immediately on mount so the first render isn't delayed
    // by the debounce below.
    const initial = node.getBoundingClientRect();
    applySize(initial.width, initial.height);

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        applySize(width, height);
      }, DEBOUNCE_MS);
    });

    observer.observe(node);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      observer.disconnect();
    };
  }, []);

  return [ref, dimensions];
}

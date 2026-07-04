import { useCallback, useRef, useState } from 'react';

type Dimensions = {
  width: number;
  height: number;
};

const DEBOUNCE_MS = 120;

export function useResizeObserver(
  debounceMs = DEBOUNCE_MS
): [(node: HTMLElement | null) => void, Dimensions] {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;

      const initial = node.getBoundingClientRect();
      setDimensions({ width: initial.width, height: initial.height });

      const observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;

        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          setDimensions((prev) =>
            prev.width === width && prev.height === height ? prev : { width, height }
          );
        }, debounceMs);
      });

      observer.observe(node);

      return () => {
        if (timeout.current) clearTimeout(timeout.current);
        observer.disconnect();
      };
    },
    [debounceMs]
  );

  return [ref, dimensions];
}

import { useLayoutEffect, useRef, useState } from 'react';

type Dimensions = {
  width: number;
  height: number;
};

export function useResizeObserver<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  Dimensions
] {
  const ref = useRef<T>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    function updateSize() {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      setDimensions((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height }
      );
    }

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, dimensions];
}

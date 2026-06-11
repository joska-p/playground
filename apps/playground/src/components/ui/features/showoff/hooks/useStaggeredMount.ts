import { useEffect, useState } from 'react';

/**
 * Returns `true` after a short delay, used to trigger CSS entrance transitions.
 * Each item can stagger using `index * stepMs` as its `transitionDelay`.
 */
export function useStaggeredMount(stepMs = 60): {
  mounted: boolean;
  delayFor: (index: number) => string;
} {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(id);
  }, []);

  return {
    mounted,
    delayFor: (index: number) => `${index * stepMs}ms`,
  };
}

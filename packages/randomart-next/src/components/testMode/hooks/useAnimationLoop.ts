import { useEffect, useRef } from 'react';

export function useAnimationLoop(enabled: boolean, onTick: (deltaSeconds: number) => void): void {
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    if (!enabled) return;

    lastTimeRef.current = performance.now();

    function tick(now: number) {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      onTickRef.current(delta);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);
}

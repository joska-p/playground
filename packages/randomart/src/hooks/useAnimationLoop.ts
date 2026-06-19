import { useEffect, useLayoutEffect, useRef } from 'react';

export function useAnimationLoop(
  running: boolean,
  onFrame: (deltaMs: number) => void,
  enabled: boolean
) {
  const onFrameRef = useRef(onFrame);

  useLayoutEffect(() => {
    onFrameRef.current = onFrame;
  });

  useEffect(() => {
    if (!enabled || !running) return;

    let cancelled = false;
    let animationFrameId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const delta = now - lastTime;
      lastTime = now;

      onFrameRef.current(delta);

      if (!cancelled) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
    };
  }, [running, enabled]);
}

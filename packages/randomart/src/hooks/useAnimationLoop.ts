import { useEffect, useLayoutEffect, useRef } from 'react';

export function useAnimationLoop(
  running: boolean,
  onFrame: (deltaMs: number) => void,
  enabled: boolean
) {
  const onFrameRef = useRef(onFrame);

  // Keep the mutable reference up to date with the latest callback function
  // without triggering a re-render or resetting the animation loop timer.
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

      // Call the latest captured frame logic directly
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

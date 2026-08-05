import { useContext, useEffect, useRef } from 'react';
import { FrameLoopContext } from './FrameLoopProvider';

export function useFrame(callback: (time: number, delta: number) => void): void {
  const loop = useContext(FrameLoopContext);
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  });

  useEffect(() => {
    if (!loop) return;
    const cb = (time: number, delta: number) => {
      ref.current(time, delta);
    };
    return loop.subscribe(cb);
  }, [loop]);
}

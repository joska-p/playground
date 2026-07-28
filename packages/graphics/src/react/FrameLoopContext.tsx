/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { FrameLoop } from '../webgl/FrameLoop';

const FrameLoopContext = createContext<FrameLoop | null>(null);

function GraphicsProvider({ children }: { children: ReactNode }) {
  const loop = useMemo(() => new FrameLoop(), []);

  useEffect(() => {
    return () => {
      loop.dispose();
    };
  }, [loop]);

  return <FrameLoopContext value={loop}>{children}</FrameLoopContext>;
}

function useFrame(callback: (time: number, delta: number) => void): void {
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

export { FrameLoopContext, GraphicsProvider, useFrame };

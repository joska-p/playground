/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { createFrameLoop, type FrameLoop } from '../webgl/createFrameLoop';

const FrameLoopContext = createContext<FrameLoop | null>(null);

function GraphicsProvider({ children }: { children: ReactNode }) {
  const loop = createFrameLoop();

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

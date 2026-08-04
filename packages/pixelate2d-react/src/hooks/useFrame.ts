import { type Engine, type FrameCallback, type RenderDriver } from '@repo/pixelate2d-core';
import { useEffect, useRef } from 'react';
import { getEngine } from '../utils/engine-registry';

/**
 * Subscribe a render callback to frame ticks without re-rendering. Accepts
 * either an engine or a driver returned by `useCanvasDriver`. The latest
 * callback is always used, so inline closures are safe.
 */
export function useFrame(target: Engine | RenderDriver | null, callback: FrameCallback | null): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  const engine = target ? getEngine(target) : undefined;

  useEffect(() => {
    if (!engine) return;
    return engine.subscribe((driver, context) => {
      callbackRef.current?.(driver, context);
    });
  }, [engine]);
}

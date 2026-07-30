import { useEffect, useRef } from 'react';
import { createShaderRunner, type ShaderRunner } from '../webgl/createShaderRunner';

export function useShaderRunner(fragmentShader: string, dpr?: number) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runnerRef = useRef<ShaderRunner | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const runner = createShaderRunner({ canvas, fragmentShader, dpr });
    runnerRef.current = runner;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        const { width, height } = entry.contentRect;
        runner.resize(width, height);
      }
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      runner.dispose();
      runnerRef.current = null;
    };
  }, [dpr, fragmentShader]);

  return { canvasRef, runnerRef };
}

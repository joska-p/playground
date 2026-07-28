import { useEffect, useRef } from 'react';
import { ShaderRunner } from '../webgl/ShaderRunner';

export function useShaderRunner(fragmentShader: string, dpr?: number) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runnerRef = useRef<ShaderRunner | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const runner = new ShaderRunner(canvas, fragmentShader, dpr);
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

  useEffect(() => {
    runnerRef.current?.pipeline.compileFragmentShader(fragmentShader);
  }, [fragmentShader]);

  return { canvasRef, runnerRef };
}

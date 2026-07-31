import { useEffect, useRef } from 'react';
import { createShaderRunner, type ShaderRunner } from '../webgl/createShaderRunner';
import type { WebGLContextAttributes } from '../webgl/createWebGLContext';

export type UseShaderRunnerProps = {
  fragmentShader: string;
  dpr?: number | undefined;
  webGLContextAttributes?: WebGLContextAttributes | undefined;
};

export function useShaderRunner({
  fragmentShader,
  dpr,
  webGLContextAttributes
}: UseShaderRunnerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runnerRef = useRef<ShaderRunner | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const runner = createShaderRunner({
      fragmentShader,
      canvas,
      dpr,
      webGLContextAttributes
    });
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
  }, [fragmentShader, dpr, webGLContextAttributes]);

  return { canvasRef, runnerRef };
}

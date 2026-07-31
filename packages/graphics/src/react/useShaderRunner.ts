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

  // Snapshot of mount-time props; written inside the create-effect so it stays
  // out of render (deps [] capture the mount-time values in the closure).
  const mountPropsRef = useRef({ fragmentShader, dpr, webGLContextAttributes });

  // True while the mounted shader is the one the runner compiled on creation;
  // lets the recompile-effect skip its first run to avoid a double-compile.
  const skipRecompileRef = useRef(false);

  // Create-effect: MUST be declared above the recompile-effect — effects run in
  // declaration order, so runnerRef.current is set before the recompile effect
  // first runs. dpr/webGLContextAttributes are mount-time only: changing a
  // context's attributes requires a new context anyway, and honoring changes is
  // what caused the runner churn.
  useEffect(() => {
    mountPropsRef.current = { fragmentShader, dpr, webGLContextAttributes };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const runner = createShaderRunner({
      fragmentShader: mountPropsRef.current.fragmentShader,
      canvas,
      dpr: mountPropsRef.current.dpr,
      webGLContextAttributes: mountPropsRef.current.webGLContextAttributes
    });
    runnerRef.current = runner;
    skipRecompileRef.current = true;

    let rafId = 0;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return; // hidden canvas
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        runner.resize(width, height);
      });
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      runner.dispose();
      runnerRef.current = null;
      skipRecompileRef.current = false;
    };
  }, []);

  // Recompile the fragment program in place on the existing runner — a shader
  // edit must NOT destroy the context + GL resources (that orphans consumers
  // that keyed effects on runnerRef). Skipped on mount to avoid the
  // double-compile with createShaderRunner.
  useEffect(() => {
    if (skipRecompileRef.current) {
      skipRecompileRef.current = false;
      return;
    }
    runnerRef.current?.pipeline.compileFragmentShader(fragmentShader);
  }, [fragmentShader]);

  return { canvasRef, runnerRef };
}

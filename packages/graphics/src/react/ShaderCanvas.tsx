import { useEffect } from 'react';
import type { QuadPipeline } from '../webgl/QuadPipeline';
import { useShaderRunner } from './useShaderRunner';

export type ShaderCanvasProps = {
  fragmentShader: string;
  className?: string;
  onBeforeRender?: (pipeline: QuadPipeline, time: number) => void;
};

export function ShaderCanvas({ fragmentShader, className, onBeforeRender }: ShaderCanvasProps) {
  const { canvasRef, runnerRef } = useShaderRunner(fragmentShader);

  useEffect(() => {
    const runner = runnerRef.current;
    if (!runner) return;

    runner.start((time) => {
      if (onBeforeRender) {
        onBeforeRender(runner.pipeline, time);
      }
    });

    return () => {
      runner.stop();
    };
  }, [onBeforeRender, runnerRef]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        runnerRef.current?.setMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }}
    />
  );
}

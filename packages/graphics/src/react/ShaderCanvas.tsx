import type { QuadPipeline } from '../webgl/createQuadPipeline';
import { useFrame } from './FrameLoopContext';
import { useShaderRunner } from './useShaderRunner';
import type { WebGLContextAttributes } from '../webgl/createWebGLContext';

export type ShaderCanvasProps = {
  className?: string;
  onBeforeRender: (pipeline: QuadPipeline, time: number) => void;
  fragmentShader: string;
  dpr?: number | undefined;
  webGLContextAttributes?: WebGLContextAttributes | undefined;
};

export function ShaderCanvas({
  className,
  onBeforeRender,
  fragmentShader,
  dpr,
  webGLContextAttributes
}: ShaderCanvasProps) {
  const { canvasRef, runnerRef } = useShaderRunner({ fragmentShader, dpr, webGLContextAttributes });

  useFrame((time) => {
    const runner = runnerRef.current;
    if (runner) {
      onBeforeRender(runner.pipeline, time);
    }
    runner?.render();
  });

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        runnerRef.current?.setMouse({
          x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
          y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
        });
      }}
    />
  );
}

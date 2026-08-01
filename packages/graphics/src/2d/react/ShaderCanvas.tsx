import type { QuadPipeline } from '../createQuadPipeline';
import { useFrame } from './FrameLoopContext';
import { useInteractiveCanvas, type InteractiveCanvasOptions } from './useInteractiveCanvas';
import { usePanZoomUniforms } from './usePanZoomUniforms';
import { useShaderRunner } from './useShaderRunner';
import type { WebGLContextAttributes } from '../../core/createWebGLContext';

export type ShaderCanvasProps = {
  className?: string;
  onBeforeRender?: (pipeline: QuadPipeline, time: number) => void;
  fragmentShader: string;
  dpr?: number | undefined;
  webGLContextAttributes?: WebGLContextAttributes | undefined;
  interactive?: boolean;
  interactionOptions?: InteractiveCanvasOptions | undefined;
};

export function ShaderCanvas({
  className,
  onBeforeRender,
  fragmentShader,
  dpr,
  webGLContextAttributes,
  interactive = false,
  interactionOptions
}: ShaderCanvasProps) {
  const { canvasRef, runnerRef } = useShaderRunner({ fragmentShader, dpr, webGLContextAttributes });
  const interactionState = useInteractiveCanvas(canvasRef, interactive, interactionOptions);
  const applyPanZoom = usePanZoomUniforms(runnerRef, interactionState);

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    runnerRef.current?.setMouse({
      x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    });
  }

  useFrame((time) => {
    const runner = runnerRef.current;
    if (runner) {
      onBeforeRender?.(runner.pipeline, time);
      applyPanZoom(); // safe even when interactive=false (state stays at defaults)
    }
    runner?.render();
  });

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      onPointerMove={handlePointerMove}
    />
  );
}

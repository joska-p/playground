import type { QuadPipeline } from '../createQuadPipeline';
import { useFrame } from './FrameLoopContext';
import { useInteractiveCanvas, type InteractiveCanvasOptions } from './useInteractiveCanvas';
import { usePanZoomUniforms } from './usePanZoomUniforms';
import { useShaderRunner } from './useShaderRunner';
import type { Point2D } from '../transforms';
import type { WebGLContextAttributes } from '../../core/createWebGLContext';

export type ShaderCanvasView = {
  /** Pan in CSS pixels, y-down — the raw interaction state (not normalized). */
  pan: Point2D;
  /** Current zoom factor. */
  zoom: number;
  /** Canvas content box, CSS pixels. */
  canvasWidth: number;
  canvasHeight: number;
};

export type OnBeforeRenderProps = { pipeline: QuadPipeline; time: number; view: ShaderCanvasView };

export type ShaderCanvasProps = {
  className?: string;
  onBeforeRender?: ({ pipeline, time, view }: OnBeforeRenderProps) => void;
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
      const view = {
        pan: interactionState.current.pan,
        zoom: interactionState.current.zoom,
        canvasWidth: runner.canvas.clientWidth,
        canvasHeight: runner.canvas.clientHeight
      };
      onBeforeRender?.({ pipeline: runner.pipeline, time, view });
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

import { useRef, type CSSProperties } from 'react';
import type { QuadPipeline } from '../createQuadPipeline';
import { useFrame } from './FrameLoopContext';
import { usePanZoom, type CanvasView } from './usePanZoom';
import { usePanZoomUniforms } from './usePanZoomUniforms';
import { useShaderRunner } from './useShaderRunner';
import type { Point2D } from '../transforms';
import type { WebGLContextAttributes } from '../../core/createWebGLContext';
import type { PanZoomOptions } from './usePanZoom';

export type { CanvasView };

export type OnBeforeRenderProps = {
  pipeline: QuadPipeline;
  time: number;
  mouse: Point2D;
  view: CanvasView;
};

export type ShaderCanvasProps = {
  className?: string;
  style?: CSSProperties | undefined;
  fragmentShader: string;
  webGLContextAttributes?: WebGLContextAttributes | undefined;
  time?: boolean | string;
  onPointerMove?: ((event: React.PointerEvent<HTMLCanvasElement>) => void) | undefined;
  initialView?: { pan: Point2D; zoom: number } | undefined;
  onViewChange?: ((view: CanvasView) => void) | undefined;
  minZoom?: number | undefined;
  maxZoom?: number | undefined;
  zoomToCursor?: boolean | undefined;
  scalePanWithZoom?: boolean | undefined;
  zoomSpeed?: number | undefined;
  onBeforeRender?: ((props: OnBeforeRenderProps) => void) | undefined;
};

export function ShaderCanvas(props: ShaderCanvasProps) {
  const {
    className,
    style,
    fragmentShader,
    webGLContextAttributes,
    time = true,
    onPointerMove,
    initialView,
    onViewChange,
    minZoom,
    maxZoom,
    zoomToCursor,
    scalePanWithZoom,
    zoomSpeed
  } = props;

  const { canvasRef, runnerRef } = useShaderRunner({ fragmentShader, webGLContextAttributes });

  const panZoomOptions: PanZoomOptions = {
    initialView,
    onChange: onViewChange,
    minZoom,
    maxZoom,
    zoomToCursor,
    scalePanWithZoom,
    zoomSpeed
  };

  const panZoomRef = usePanZoom(canvasRef, panZoomOptions);
  const applyPanZoom = usePanZoomUniforms(runnerRef, panZoomRef);

  const timeName = time === false ? null : typeof time === 'string' ? time : 'u_time';
  const mouseRef = useRef<Point2D>({ x: 0, y: 0 });

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouse = {
      x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    };
    mouseRef.current = mouse;
    runnerRef.current?.setMouse(mouse);
  }

  useFrame((frameTime) => {
    const runner = runnerRef.current;
    if (!runner) return;

    if (timeName && runner.pipeline.hasUniform(timeName)) {
      runner.pipeline.setUniforms({ [timeName]: frameTime });
    }

    props.onBeforeRender?.({
      pipeline: runner.pipeline,
      time: frameTime,
      mouse: mouseRef.current,
      view: {
        pan: panZoomRef.current.pan,
        zoom: panZoomRef.current.zoom,
        canvasWidth: runner.canvas.clientWidth,
        canvasHeight: runner.canvas.clientHeight
      }
    });

    applyPanZoom();
    runner.render();
  });

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', ...style }}
      onPointerMove={onPointerMove ?? handlePointerMove}
    />
  );
}

import type { CSSProperties } from 'react';
import type { QuadPipeline } from '../createQuadPipeline';
import { useFrame } from './FrameLoopContext';
import {
  useInteractiveCanvas,
  type CanvasView,
  type InteractiveCanvasOptions
} from './useInteractiveCanvas';
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

/** Render-callback payload for the non-interactive contract. */
export type OnBeforeRenderProps = { pipeline: QuadPipeline; time: number };

/** Render-callback payload for the interactive contract — `view` present iff `interactive`. */
export type InteractiveOnBeforeRenderProps = OnBeforeRenderProps & { view: ShaderCanvasView };

/** Pan/zoom tuning knobs. View seeding/sync live at the top level (`initialView`/`onViewChange`). */
export type InteractionOptions = Omit<InteractiveCanvasOptions, 'initialView' | 'onChange'>;

type ShaderCanvasBaseProps = {
  className?: string;
  /** Canvas element styling, merged over the default fill-parent box. */
  style?: CSSProperties | undefined;
  fragmentShader: string;
  webGLContextAttributes?: WebGLContextAttributes | undefined;
  /**
   * Per-frame time uniform. `true` (default) injects into the shader's declared
   * `u_time`; a string names the uniform instead (e.g. `'uTime'`); `false` disables.
   * Injected before `onBeforeRender`, so a user-set time wins.
   */
  time?: boolean | string;
  /** Replaces the default pointer-move handler that feeds the `u_mouse` uniform. */
  onPointerMove?: ((event: React.PointerEvent<HTMLCanvasElement>) => void) | undefined;
};

export type ShaderCanvasProps =
  | (ShaderCanvasBaseProps & {
      interactive?: false;
      onBeforeRender?: ((props: OnBeforeRenderProps) => void) | undefined;
    })
  | (ShaderCanvasBaseProps & {
      interactive: true;
      interactionOptions?: InteractionOptions | undefined;
      /**
       * Seeds the interaction state on mount (used for view persistence across
       * renderers and for reset). Changing it after mount has no effect — remount
       * the canvas (e.g. via `key`) to apply a new seed.
       */
      initialView?: CanvasView | undefined;
      /** Called only when pan/zoom actually change (drag, wheel). */
      onViewChange?: ((view: CanvasView) => void) | undefined;
      onBeforeRender?: ((props: InteractiveOnBeforeRenderProps) => void) | undefined;
    });

export function ShaderCanvas(props: ShaderCanvasProps) {
  const {
    className,
    style,
    fragmentShader,
    webGLContextAttributes,
    time = true,
    onPointerMove
  } = props;
  const interactive = props.interactive === true;

  const { canvasRef, runnerRef } = useShaderRunner({ fragmentShader, webGLContextAttributes });

  const interactionOptions: InteractiveCanvasOptions | undefined =
    props.interactive === true ? props.interactionOptions : undefined;
  const initialView: CanvasView | undefined =
    props.interactive === true ? props.initialView : undefined;
  const onViewChange = props.interactive === true ? props.onViewChange : undefined;

  const interactionState = useInteractiveCanvas(canvasRef, interactive, {
    ...interactionOptions,
    initialView,
    onChange: onViewChange
  });
  const applyPanZoom = usePanZoomUniforms(runnerRef, interactionState);

  const timeName = time === false ? null : typeof time === 'string' ? time : 'u_time';

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    runnerRef.current?.setMouse({
      x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    });
  }

  // Per-frame pipeline:
  //   1. time   — auto-inject (guarded by the shader declaring the uniform)
  //   2. app    — onBeforeRender (user uniforms; user-set time wins)
  //   3. panzoom — u_panOffset / u_zoom (only when interactive and declared)
  //   4. draw   — standard uniforms (u_resolution/u_aspect/u_mouse) + render
  useFrame((frameTime) => {
    const runner = runnerRef.current;
    if (!runner) return;

    if (timeName && runner.pipeline.hasUniform(timeName)) {
      runner.pipeline.setUniforms({ [timeName]: frameTime });
    }

    if (props.interactive === true) {
      props.onBeforeRender?.({
        pipeline: runner.pipeline,
        time: frameTime,
        view: {
          pan: interactionState.current.pan,
          zoom: interactionState.current.zoom,
          canvasWidth: runner.canvas.clientWidth,
          canvasHeight: runner.canvas.clientHeight
        }
      });
    } else {
      props.onBeforeRender?.({ pipeline: runner.pipeline, time: frameTime });
    }

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

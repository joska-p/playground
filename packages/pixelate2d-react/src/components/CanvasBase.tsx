import { type FrameCallback, type RenderDriver, type ResizeStrategy } from '@repo/pixelate2d-core';
import { type Camera } from '@repo/pixelate2d-math';
import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react';
import { useCamera, type CameraControls, type CameraOptions } from '../hooks/useCamera';
import { useCanvasDriver } from '../hooks/useCanvasDriver';

export type CanvasProps = {
  /** Drag to pan the camera. */
  pan?: boolean;
  /** Scroll-wheel zoom about the pointer. */
  zoom?: boolean;
  /** Initial camera only read on mount when no `camera` prop is given. */
  initialCamera?: CameraOptions;
  /** Camera owned by the caller (e.g. from `useCamera`) instead of an internal one. */
  camera?: Camera;
  /** Controls matching the provided `camera`. Required when `camera` is given. */
  cameraControls?: CameraControls;
  onFrame?: FrameCallback;
  /** Called with the live driver whenever the backing engine (re)mounts. */
  onDriver?: (driver: RenderDriver | null) => void;
  maxFps?: number;
  dpr?: number | 'auto';
  resizeStrategy?: ResizeStrategy;
  className?: string;
  style?: CSSProperties;
  /** UI overlay rendered above the canvas. */
  children?: ReactNode;
};

export type CanvasBaseProps = CanvasProps & { type: 'cpu' | 'gpu' };

/**
 * Feature-packed canvas container: resize observation, pan/zoom gestures, a
 * closure-based render loop, and `onFrame` drawing. Children render as an
 * overlay above the canvas, so React DOM stays at UI frequency.
 */
export function CanvasBase({ type, pan = false, zoom = false, initialCamera, camera: externalCamera, cameraControls, onFrame, onDriver, maxFps, dpr, resizeStrategy, className, style, children }: CanvasBaseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [internalCamera, internalControls] = useCamera(initialCamera);
  const camera = externalCamera ?? internalCamera;
  const controls = cameraControls ?? internalControls;
  const driver = useCanvasDriver(canvasRef, { type, camera, onFrame, maxFps, dpr, resizeStrategy });

  useEffect(() => {
    onDriver?.(driver);
    return () => onDriver?.(null);
  }, [driver, onDriver]);

  // Wheel zoom rides a non-passive native listener so `preventDefault` works;
  // React attaches `wheel` passively and would silently drop it.
  const gestures = pan ? controls.bindGestures({ pan: true, zoom: false }) : undefined;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !zoom) return;
    return controls.attachWheel(canvas);
  }, [controls, zoom]);

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <canvas
        ref={canvasRef}
        {...gestures}
        style={{ width: '100%', height: '100%', display: 'block', touchAction: pan || zoom ? 'none' : 'auto' }}
      />
      {children}
    </div>
  );
}

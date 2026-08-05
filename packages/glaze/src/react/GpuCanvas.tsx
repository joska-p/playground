import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createGpuDoor, type GpuDoor, type GpuDraw } from '../gpu/createGpuDoor';
import type { Camera } from '../core/coords/camera';
import { useCamera, type CameraControls, type CameraOptions } from './useCamera';

export type GpuCanvasProps = {
  onFrame?: GpuDraw | null;
  onDoor?: (door: GpuDoor | null) => void;
  camera?: Camera;
  cameraControls?: CameraControls;
  initialCamera?: CameraOptions;
  pan?: boolean;
  zoom?: boolean;
  dpr?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function GpuCanvas({
  onFrame,
  onDoor,
  camera: externalCamera,
  cameraControls,
  initialCamera,
  pan = true,
  zoom = true,
  dpr,
  className,
  style,
  children
}: GpuCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [internalCamera, internalControls] = useCamera(initialCamera);
  const camera = externalCamera ?? internalCamera;
  const controls = cameraControls ?? internalControls;
  const [door, setDoor] = useState<GpuDoor | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const door = createGpuDoor({ canvas, camera, ...(dpr !== undefined ? { dpr } : {}) });
    setDoor(door);
    return () => {
      door.destroy();
      setDoor(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    door?.setDraw(onFrame ?? null);
  });

  useEffect(() => {
    onDoor?.(door);
    return () => onDoor?.(null);
  }, [door, onDoor]);

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

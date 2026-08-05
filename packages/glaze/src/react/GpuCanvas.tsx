import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createGpuDoor, type GpuDoor, type GpuDraw, type GpuFrameContext } from '../gpu/createGpuDoor';
import type { UniformValue } from '../gpu/shader/compileProgram';
import type { Program } from '../gpu/shader/createProgram';
import type { Camera } from '../core/coords/camera';
import { useCamera, type CameraControls, type CameraOptions } from './useCamera';

export type GpuCanvasProps = {
  /** Fragment shader compiled into a program and rendered every frame (standard uniforms auto-set). */
  fragmentShader?: string;
  /** Per-frame uniforms merged with the standard set (standard uniforms win on name clash). */
  uniforms?: (context: GpuFrameContext) => Record<string, UniformValue>;
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
  fragmentShader,
  uniforms,
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
  const programRef = useRef<Program | null>(null);
  const uniformsRef = useRef(uniforms);

  useEffect(() => {
    uniformsRef.current = uniforms;
  });

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
    if (!door || !fragmentShader) return;
    const program = door.createProgram(fragmentShader);
    programRef.current = program;
    return () => {
      program.destroy();
      programRef.current = null;
    };
  }, [door, fragmentShader]);

  useEffect(() => {
    door?.setDraw(
      onFrame ?? fragmentShader
        ? (ctx) => {
            const program = programRef.current;
            if (program) {
              program.setUniforms(uniformsRef.current ? uniformsRef.current(ctx) : {});
              door.renderProgram(program);
            }
            onFrame?.(ctx);
          }
        : null
    );
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

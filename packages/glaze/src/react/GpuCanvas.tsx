import { type CSSProperties, type ReactNode } from 'react';
import { type GpuSurface, type GpuDraw } from '../gpu/createGpuSurface';
import type { Camera } from '../core/coords/camera';
import type { UniformValue } from '../gpu/shader/compileProgram';
import type { CameraControls, CameraOptions } from './useCamera';
import { createInteractionAdapter, type CanvasInteractions } from './actions';
import { useCanvasActions } from './useCanvasActions';
import { useGpuCanvas, type CanvasRef } from './useGpuCanvas';

export type GpuCanvasProps = {
    fragmentShader?: string;
    uniforms?: (surface: GpuSurface) => Record<string, UniformValue>;
    onFrame?: GpuDraw;
    onSurface?: (surface: GpuSurface) => void;
    camera?: Camera;
    cameraControls?: CameraControls;
    initialCamera?: CameraOptions;
    minZoom?: number;
    maxZoom?: number;
    interactions?: CanvasInteractions<GpuSurface>;
    canvasRef?: CanvasRef;
    dpr?: number;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
};

export function GpuCanvas({
    fragmentShader,
    uniforms,
    onFrame,
    onSurface,
    camera: externalCamera,
    cameraControls,
    initialCamera,
    minZoom,
    maxZoom,
    interactions,
    canvasRef: externalCanvasRef,
    dpr,
    className,
    style,
    children
}: GpuCanvasProps) {
    const cameraOptions: CameraOptions = {
        ...(initialCamera ?? {}),
        ...(minZoom !== undefined ? { minZoom } : {}),
        ...(maxZoom !== undefined ? { maxZoom } : {})
    };

    const { surface, canvasRef, controls } = useGpuCanvas({
        initialCamera: cameraOptions,
        ...(fragmentShader !== undefined ? { fragmentShader } : {}),
        ...(uniforms !== undefined ? { uniforms } : {}),
        ...(onFrame !== undefined ? { onFrame } : {}),
        ...(onSurface !== undefined ? { onSurface } : {}),
        ...(externalCamera !== undefined ? { camera: externalCamera } : {}),
        ...(cameraControls !== undefined ? { cameraControls } : {}),
        ...(dpr !== undefined ? { dpr } : {}),
        ...(externalCanvasRef !== undefined ? { canvasRef: externalCanvasRef } : {})
    });

    useCanvasActions({ surface, controls }, interactions);

    const hasGestures = createInteractionAdapter(interactions).length > 0;
    const touchAction = hasGestures ? 'none' : 'auto';

    return (
        <div
            className={className}
            style={{ position: 'relative', overflow: 'hidden', ...style }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    touchAction
                }}
            />
            {children}
        </div>
    );
}

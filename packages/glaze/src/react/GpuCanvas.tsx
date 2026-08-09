import { type CSSProperties, type ReactNode, type RefObject } from 'react';
import { type GpuSurface, type GpuDraw } from '../gpu/createGpuSurface';
import type { Camera } from '../core/coords/camera';
import type { UniformValue } from '../gpu/shader/compileProgram';
import type { CameraControls, CameraOptions } from './useCamera';
import type { Gesture, PointerHandlers } from './actions';
import { useCanvasActions } from './useCanvasActions';
import { useGpuCanvas } from './useGpuCanvas';

export type GpuCanvasProps = {
    fragmentShader?: string;
    uniforms?: (surface: GpuSurface) => Record<string, UniformValue>;
    onFrame?: GpuDraw | null;
    onSurface?: (surface: GpuSurface | null) => void;
    camera?: Camera;
    cameraControls?: CameraControls;
    initialCamera?: CameraOptions;
    pan?: boolean;
    zoom?: boolean;
    panButton?: number | number[];
    zoomSpeed?: number;
    minZoom?: number;
    maxZoom?: number;
    pointerHandlers?: PointerHandlers<GpuSurface>;
    gestures?: Gesture<GpuSurface>[];
    canvasRef?: RefObject<HTMLCanvasElement | null>;
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
    pan = true,
    zoom = true,
    panButton,
    zoomSpeed,
    minZoom,
    maxZoom,
    pointerHandlers,
    gestures,
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
        fragmentShader,
        uniforms,
        onFrame,
        onSurface,
        camera: externalCamera,
        cameraControls,
        initialCamera: cameraOptions,
        dpr,
        canvasRef: externalCanvasRef
    });

    useCanvasActions(
        { surface, controls },
        { pan, zoom, panButton, zoomSpeed, pointerHandlers, gestures }
    );

    const touchAction = pan || zoom || pointerHandlers || gestures ? 'none' : 'auto';

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

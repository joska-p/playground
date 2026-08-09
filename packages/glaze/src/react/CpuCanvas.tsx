import { type CSSProperties, type ReactNode } from 'react';
import { type CpuSurface, type CpuDraw } from '../cpu/createCpuSurface';
import type { Camera } from '../core/coords/camera';
import type { CameraControls, CameraOptions } from './useCamera';
import { createInteractionAdapter, type CanvasInteractions } from './actions';
import { useCanvasActions } from './useCanvasActions';
import { useCpuCanvas, type CanvasRef } from './useCpuCanvas';

export type CpuCanvasProps = {
    onFrame?: CpuDraw;
    onSurface?: (surface: CpuSurface) => void;
    camera?: Camera;
    cameraControls?: CameraControls;
    initialCamera?: CameraOptions;
    minZoom?: number;
    maxZoom?: number;
    interactions?: CanvasInteractions<CpuSurface>;
    canvasRef?: CanvasRef;
    dpr?: number;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
};

export function CpuCanvas({
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
}: CpuCanvasProps) {
    const cameraOptions: CameraOptions = {
        ...(initialCamera ?? {}),
        ...(minZoom !== undefined ? { minZoom } : {}),
        ...(maxZoom !== undefined ? { maxZoom } : {})
    };

    const { surface, canvasRef, controls } = useCpuCanvas({
        initialCamera: cameraOptions,
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

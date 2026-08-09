import { type CSSProperties, type ReactNode, type RefObject } from 'react';
import { type CpuSurface, type CpuDraw } from '../cpu/createCpuSurface';
import type { Camera } from '../core/coords/camera';
import type { CameraControls, CameraOptions } from './useCamera';
import type { PointerHandlers } from './actions';
import { useCanvasActions } from './useCanvasActions';
import { useCpuCanvas } from './useCpuCanvas';

export type CpuCanvasProps = {
    onFrame?: CpuDraw | null;
    onSurface?: (surface: CpuSurface | null) => void;
    camera?: Camera;
    cameraControls?: CameraControls;
    initialCamera?: CameraOptions;
    pan?: boolean;
    zoom?: boolean;
    panButton?: number | number[];
    zoomSpeed?: number;
    minZoom?: number;
    maxZoom?: number;
    pointerHandlers?: PointerHandlers<CpuSurface>;
    canvasRef?: RefObject<HTMLCanvasElement | null>;
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
    pan = true,
    zoom = true,
    panButton,
    zoomSpeed,
    minZoom,
    maxZoom,
    pointerHandlers,
    canvasRef: externalCanvasRef,
    dpr,
    className,
    style,
    children
}: CpuCanvasProps) {
    const { surface, canvasRef, camera } = useCpuCanvas({
        onFrame,
        onSurface,
        camera: externalCamera,
        cameraControls,
        initialCamera,
        dpr,
        canvasRef: externalCanvasRef
    });

    useCanvasActions(
        { surface, camera },
        { pan, zoom, panButton, zoomSpeed, minZoom, maxZoom, pointerHandlers }
    );

    const touchAction = pan || zoom || pointerHandlers ? 'none' : 'auto';

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

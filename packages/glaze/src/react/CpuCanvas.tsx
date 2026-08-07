import { type CSSProperties, type ReactNode, type RefObject } from 'react';
import { type Surface, type CpuDraw } from '../cpu/createSurface';
import type { Camera } from '../core/coords/camera';
import type { CameraControls, CameraOptions } from './useCamera';
import type { PointerHandlers } from './interaction';
import { useCanvasInteraction } from './useCanvasInteraction';
import { useCpuCanvas } from './useCpuCanvas';

export type CpuCanvasProps = {
    onFrame?: CpuDraw | null;
    onSurface?: (surface: Surface | null) => void;
    camera?: Camera;
    cameraControls?: CameraControls;
    initialCamera?: CameraOptions;
    pan?: boolean;
    zoom?: boolean;
    panButton?: number | number[];
    pointerHandlers?: PointerHandlers;
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
    pointerHandlers,
    canvasRef: externalCanvasRef,
    dpr,
    className,
    style,
    children
}: CpuCanvasProps) {
    const { surface, canvasRef, camera, controls, frameRef } = useCpuCanvas({
        onFrame,
        onSurface,
        camera: externalCamera,
        cameraControls,
        initialCamera,
        dpr,
        canvasRef: externalCanvasRef
    });

    const target = canvasRef;
    const interaction = {
        camera,
        controls,
        input: surface?.input ?? null,
        getFrame: () => frameRef.current
    };
    const options = {
        pan,
        zoom,
        panButton,
        pointerHandlers
    };

    useCanvasInteraction(target, interaction, options);

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

import { type CSSProperties, type ReactNode, type RefObject } from 'react';
import { type CpuRuntime, type CpuDraw } from '../cpu/createCpuRuntime';
import type { Camera } from '../core/coords/camera';
import type { CameraControls, CameraOptions } from './useCamera';
import type { PointerHandlers } from './interaction';
import { useCanvasInteraction } from './useCanvasInteraction';
import { useCpuCanvas } from './useCpuCanvas';

export type CpuCanvasProps = {
    onFrame?: CpuDraw | null;
    onRuntime?: (runtime: CpuRuntime | null) => void;
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
    onRuntime,
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
    const { runtime, canvasRef, camera, controls, frameRef } = useCpuCanvas({
        onFrame,
        onRuntime,
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
        input: runtime?.input ?? null,
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

import { type CSSProperties, type ReactNode, type RefObject } from 'react';
import { type GpuRuntime, type GpuDraw, type GpuFrameContext } from '../gpu/createGpuRuntime';
import type { Camera } from '../core/coords/camera';
import type { UniformValue } from '../gpu/shader/compileProgram';
import type { CameraControls, CameraOptions } from './useCamera';
import type { PointerHandlers } from './interaction';
import { useCanvasInteraction } from './useCanvasInteraction';
import { useGpuCanvas } from './useGpuCanvas';

export type GpuCanvasProps = {
    fragmentShader?: string;
    uniforms?: (context: GpuFrameContext) => Record<string, UniformValue>;
    onFrame?: GpuDraw | null;
    onRuntime?: (runtime: GpuRuntime | null) => void;
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

export function GpuCanvas({
    fragmentShader,
    uniforms,
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
}: GpuCanvasProps) {
    const { runtime, canvasRef, camera, controls, frameRef } = useGpuCanvas({
        fragmentShader,
        uniforms,
        onFrame,
        onRuntime,
        camera: externalCamera,
        cameraControls,
        initialCamera,
        dpr,
        canvasRef: externalCanvasRef
    });

    useCanvasInteraction(
        canvasRef,
        {
            camera,
            controls,
            input: runtime?.input ?? null,
            getFrame: () => frameRef.current
        },
        { pan, zoom, panButton, pointerHandlers }
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

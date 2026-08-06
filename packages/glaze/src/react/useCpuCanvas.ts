import { useEffect, useEffectEvent, useRef, useState, type RefObject } from 'react';
import { createCpuRuntime, type CpuRuntime, type CpuDraw } from '../cpu/createCpuRuntime';
import type { Camera } from '../core/coords/camera';
import type { FrameSnapshot } from './interaction';
import { useCamera, type CameraControls, type CameraOptions } from './useCamera';

export type UseCpuCanvasOptions = {
    onFrame?: CpuDraw | null | undefined;
    /**
     * Called with the runtime when it becomes ready, and with `null` when
     * it is destroyed. Treat it like a ref callback.
     */
    onRuntime?: ((runtime: CpuRuntime | null) => void) | undefined;
    camera?: Camera | undefined;
    cameraControls?: CameraControls | undefined;
    initialCamera?: CameraOptions | undefined;
    /**
     * Device pixel ratio. Fixed at runtime creation.
     * Changing this prop after mount has no effect.
     */
    dpr?: number | undefined;
    canvasRef?: RefObject<HTMLCanvasElement | null> | undefined;
};

export type UseCpuCanvasResult = {
    runtime: CpuRuntime | null;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    camera: Camera;
    controls: CameraControls;
    frameRef: RefObject<FrameSnapshot | null>;
};

export function useCpuCanvas(options: UseCpuCanvasOptions): UseCpuCanvasResult {
    const {
        onFrame,
        onRuntime,
        camera: externalCamera,
        cameraControls,
        initialCamera,
        dpr,
        canvasRef: externalCanvasRef
    } = options;

    const internalRef = useRef<HTMLCanvasElement | null>(null);
    const canvasRef = externalCanvasRef ?? internalRef;

    const [internalCamera, internalControls] = useCamera(initialCamera);
    const camera = externalCamera ?? internalCamera;
    const controls = cameraControls ?? internalControls;

    const [runtime, setRuntime] = useState<CpuRuntime | null>(null);
    const frameRef = useRef<FrameSnapshot | null>(null);

    const createRuntime = useEffectEvent((canvas: HTMLCanvasElement) => {
        return createCpuRuntime({
            canvas,
            camera,
            ...(dpr !== undefined ? { dpr } : {})
        });
    });

    // Runtime lifetime is tied to the canvas element
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const instance = createRuntime(canvas);
        setRuntime(instance);

        return () => {
            instance.destroy();
            setRuntime(null);
            frameRef.current = null;
        };
    }, [canvasRef]);

    // Notify parent (ref-callback style)
    useEffect(() => {
        onRuntime?.(runtime);
        return () => onRuntime?.(null);
    }, [runtime, onRuntime]);

    // Always call the latest onFrame without re-creating the runtime
    const draw = useEffectEvent((ctx: Parameters<CpuDraw>[0]) => {
        frameRef.current = ctx;
        onFrame?.(ctx);
    });

    useEffect(() => {
        if (!runtime) return;
        runtime.setDraw(onFrame ? draw : null);
    }, [runtime, onFrame]);

    return { runtime, canvasRef, camera, controls, frameRef };
}

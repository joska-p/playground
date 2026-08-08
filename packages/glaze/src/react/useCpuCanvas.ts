import { useEffect, useEffectEvent, useRef, useState, type RefObject } from 'react';
import { createCpuSurface, type CpuSurface, type CpuDraw } from '../cpu/createCpuSurface';
import type { Camera } from '../core/coords/camera';
import type { FrameSnapshot } from './interaction';
import { useCamera, type CameraControls, type CameraOptions } from './useCamera';

export type UseCpuCanvasOptions = {
    onFrame?: CpuDraw | null | undefined;
    onSurface?: ((surface: CpuSurface | null) => void) | undefined;
    camera?: Camera | undefined;
    cameraControls?: CameraControls | undefined;
    initialCamera?: CameraOptions | undefined;
    dpr?: number | undefined;
    canvasRef?: RefObject<HTMLCanvasElement | null> | undefined;
};

export type UseCpuCanvasResult = {
    surface: CpuSurface | null;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    camera: Camera;
    controls: CameraControls;
    frameRef: RefObject<FrameSnapshot | null>;
};

export function useCpuCanvas(options: UseCpuCanvasOptions): UseCpuCanvasResult {
    const {
        onFrame,
        onSurface,
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

    const [surface, setSurface] = useState<CpuSurface | null>(null);
    const frameRef = useRef<FrameSnapshot | null>(null);

    const createNewSurface = useEffectEvent((canvas: HTMLCanvasElement) => {
        return createCpuSurface({
            canvas,
            camera,
            ...(dpr !== undefined ? { dpr } : {})
        });
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const newSurface = createNewSurface(canvas);
        setSurface(newSurface);

        return () => {
            newSurface.destroy();
            setSurface(null);
            frameRef.current = null;
        };
    }, [canvasRef]);

    useEffect(() => {
        onSurface?.(surface);
        return () => onSurface?.(null);
    }, [surface, onSurface]);

    const draw = useEffectEvent((ctx: Parameters<CpuDraw>[0]) => {
        frameRef.current = ctx;
        onFrame?.(ctx);
    });

    useEffect(() => {
        if (!surface) return;
        surface.setDraw(onFrame ? draw : null);
    }, [surface, onFrame]);

    return { surface, canvasRef, camera, controls, frameRef };
}

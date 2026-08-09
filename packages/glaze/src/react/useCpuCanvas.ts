import { useEffect, useEffectEvent, useRef, useState, type RefObject } from 'react';
import { createCpuSurface, type CpuSurface, type CpuDraw } from '../cpu/CpuSurface';
import type { Camera } from '../core/Camera';
import { useCamera, type CameraControls, type CameraOptions } from './useCamera';

export type CanvasRef = RefObject<HTMLCanvasElement | null>;

export type UseCpuCanvasOptions = {
    onFrame?: CpuDraw;
    onSurface?: (surface: CpuSurface) => void;
    camera?: Camera;
    cameraControls?: CameraControls;
    initialCamera?: CameraOptions;
    dpr?: number;
    canvasRef?: CanvasRef;
};

export type UseCpuCanvasResult = {
    surface: CpuSurface | null;
    canvasRef: CanvasRef;
    camera: Camera;
    controls: CameraControls;
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
        };
    }, [canvasRef]);

    useEffect(() => {
        if (surface) onSurface?.(surface);
    }, [surface, onSurface]);

    const draw = useEffectEvent((frame: CpuSurface) => {
        onFrame?.(frame);
    });

    useEffect(() => {
        if (!surface) return;
        surface.setDraw(onFrame ? draw : null);
    }, [surface, onFrame]);

    return { surface, canvasRef, camera, controls };
}

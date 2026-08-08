import { useEffect, useEffectEvent, useRef, useState, type RefObject } from 'react';
import { createGpuSurface, type GpuSurface, type GpuDraw } from '../gpu/createGpuSurface';
import type { Program } from '../gpu/shader/createProgram';
import type { UniformValue } from '../gpu/shader/compileProgram';
import type { Camera } from '../core/coords/camera';
import { useCamera, type CameraControls, type CameraOptions } from './useCamera';

export type UseGpuCanvasOptions = {
    fragmentShader?: string | undefined;
    uniforms?: ((surface: GpuSurface) => Record<string, UniformValue>) | undefined;
    onFrame?: GpuDraw | null | undefined;
    onSurface?: ((surface: GpuSurface | null) => void) | undefined;
    camera?: Camera | undefined;
    cameraControls?: CameraControls | undefined;
    initialCamera?: CameraOptions | undefined;
    dpr?: number | undefined;
    canvasRef?: RefObject<HTMLCanvasElement | null> | undefined;
};

export type UseGpuCanvasResult = {
    surface: GpuSurface | null;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    camera: Camera;
    controls: CameraControls;
};

export function useGpuCanvas(options: UseGpuCanvasOptions): UseGpuCanvasResult {
    const {
        fragmentShader,
        uniforms,
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

    const [surface, setSurface] = useState<GpuSurface | null>(null);
    const programRef = useRef<Program | null>(null);

    const createSurface = useEffectEvent((canvas: HTMLCanvasElement) => {
        return createGpuSurface({
            canvas,
            camera,
            ...(dpr !== undefined ? { dpr } : {})
        });
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const instance = createSurface(canvas);
        setSurface(instance);

        return () => {
            instance.destroy();
            setSurface(null);
        };
    }, [canvasRef]);

    useEffect(() => {
        if (!surface || !fragmentShader) return;

        const program = surface.createProgram(fragmentShader);
        programRef.current = program;

        return () => {
            program.destroy();
            programRef.current = null;
        };
    }, [surface, fragmentShader]);

    useEffect(() => {
        onSurface?.(surface ?? null);
        return () => onSurface?.(null);
    }, [surface, onSurface]);

    const draw = useEffectEvent((frame: GpuSurface) => {
        const program = programRef.current;
        if (program) {
            program.setUniforms(uniforms ? uniforms(frame) : {});
            frame.renderProgram(program);
        }

        onFrame?.(frame);
    });

    useEffect(() => {
        if (!surface) return;
        const shouldDraw = onFrame != null || fragmentShader != null;
        surface.setDraw(shouldDraw ? draw : null);
    }, [surface, onFrame, fragmentShader]);

    return { surface, canvasRef, camera, controls };
}

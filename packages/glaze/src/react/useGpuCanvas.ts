import { useEffect, useEffectEvent, useRef, useState, type RefObject } from 'react';
import {
    createGpuRuntime,
    type GpuRuntime,
    type GpuDraw,
    type GpuFrameContext
} from '../gpu/createGpuRuntime';
import type { Program } from '../gpu/shader/createProgram';
import type { UniformValue } from '../gpu/shader/compileProgram';
import type { Camera } from '../core/coords/camera';
import type { FrameSnapshot } from './interaction';
import { useCamera, type CameraControls, type CameraOptions } from './useCamera';

export type UseGpuCanvasOptions = {
    fragmentShader?: string | undefined;
    uniforms?: ((context: GpuFrameContext) => Record<string, UniformValue>) | undefined;
    onFrame?: GpuDraw | null | undefined;
    /**
     * Called with the runtime when it becomes ready, and with `null` when
     * it is destroyed. Treat it like a ref callback.
     */
    onRuntime?: ((runtime: GpuRuntime | null) => void) | undefined;
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

export type UseGpuCanvasResult = {
    runtime: GpuRuntime | null;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    camera: Camera;
    controls: CameraControls;
    frameRef: RefObject<FrameSnapshot | null>;
};

export function useGpuCanvas(options: UseGpuCanvasOptions): UseGpuCanvasResult {
    const {
        fragmentShader,
        uniforms,
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

    const [runtime, setRuntime] = useState<GpuRuntime | null>(null);
    const programRef = useRef<Program | null>(null);
    const frameRef = useRef<FrameSnapshot | null>(null);

    const createRuntime = useEffectEvent((canvas: HTMLCanvasElement) => {
        return createGpuRuntime({
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

    // Program lifetime is tied to the runtime + shader source
    useEffect(() => {
        if (!runtime || !fragmentShader) return;

        const program = runtime.createProgram(fragmentShader);
        programRef.current = program;

        return () => {
            program.destroy();
            programRef.current = null;
        };
    }, [runtime, fragmentShader]);

    // Notify parent (ref-callback style)
    useEffect(() => {
        onRuntime?.(runtime);
        return () => onRuntime?.(null);
    }, [runtime, onRuntime]);

    // Always call the latest draw logic without re-creating the runtime
    const draw = useEffectEvent((ctx: GpuFrameContext) => {
        frameRef.current = ctx;

        const program = programRef.current;
        if (program) {
            program.setUniforms(uniforms ? uniforms(ctx) : {});
            if (runtime) runtime.renderProgram(program);
        }

        onFrame?.(ctx);
    });

    useEffect(() => {
        if (!runtime) return;
        const shouldDraw = onFrame != null || fragmentShader != null;
        runtime.setDraw(shouldDraw ? draw : null);
    }, [runtime, onFrame, fragmentShader]);

    return { runtime, canvasRef, camera, controls, frameRef };
}

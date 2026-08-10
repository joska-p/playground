import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { createGpuSurface } from '../gpu/GpuSurface';
import type { GpuDraw, GpuSurface } from '../gpu/GpuSurface';
import type { Program } from '../gpu/shader/Program';
import type { UniformValue } from '../gpu/shader/compileProgram';
import { Camera, type Point2D } from '../core/Camera';
import { createCameraControls, type CameraControls } from '../core/CameraControls';
import { InputRouter, type InputRouterOptions } from '../core/gestures';
import { createInteractionAdapter, type CanvasInteractions } from './interactions';

export type CameraOptions = {
    zoom?: number;
    pan?: Point2D;
    minZoom?: number;
    maxZoom?: number;
};

export type GpuCanvasProps = {
    initialCamera?: CameraOptions;
    dpr?: number;
    camera?: Camera;
    cameraControls?: CameraControls;
    fragmentShader?: string;
    uniforms?: (surface: GpuSurface) => Record<string, UniformValue>;
    onDraw?: GpuDraw;
    onSurface?: (surface: GpuSurface) => void;
    canvasInteractions?: CanvasInteractions<GpuSurface>;
    className?: string;
    style?: CSSProperties;
};

export function GpuCanvas({
    initialCamera,
    dpr = 1,
    camera,
    cameraControls,
    fragmentShader,
    uniforms,
    onDraw,
    onSurface,
    canvasInteractions,
    className,
    style
}: GpuCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const surfaceRef = useRef<GpuSurface | null>(null);
    const programRef = useRef<Program | null>(null);
    const routerOptionsRef = useRef<InputRouterOptions<GpuSurface> | null>(null);

    const initialPropsRef = useRef({
        camera,
        cameraControls,
        initialCamera,
        dpr,
        onSurface,
        canvasInteractions
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const {
            camera: cameraProp,
            cameraControls: controlsProp,
            initialCamera: initial,
            dpr: initialDpr,
            onSurface: onSurfaceProp,
            canvasInteractions: interactions
        } = initialPropsRef.current;

        const surfaceCamera =
            cameraProp ??
            new Camera(initial?.pan?.x ?? 0, initial?.pan?.y ?? 0, initial?.zoom ?? 1);
        const surfaceControls =
            controlsProp ??
            createCameraControls(
                surfaceCamera,
                initial?.minZoom,
                initial?.maxZoom,
                new Camera(surfaceCamera.x, surfaceCamera.y, surfaceCamera.zoom)
            );

        const surface = createGpuSurface({
            canvas,
            camera: surfaceCamera,
            dpr: initialDpr
        });
        surfaceRef.current = surface;
        onSurfaceProp?.(surface);

        const options: InputRouterOptions<GpuSurface> = {
            input: surface.input,
            cameraControls: surfaceControls,
            getSurface: () => surface,
            gestures: createInteractionAdapter(interactions)
        };
        const router = new InputRouter(options);
        routerOptionsRef.current = options;

        return () => {
            router.dispose();
            surface.destroy();
            surfaceRef.current = null;
            programRef.current = null;
            routerOptionsRef.current = null;
        };
    }, []);

    useEffect(() => {
        const surface = surfaceRef.current;
        if (!surface || !fragmentShader) return;

        const program = surface.createProgram(fragmentShader);
        programRef.current = program;

        return () => {
            program.destroy();
            programRef.current = null;
        };
    }, [fragmentShader]);

    useEffect(() => {
        const surface = surfaceRef.current;
        if (!surface) return;

        const shouldDraw = onDraw !== undefined || fragmentShader !== undefined;
        const draw: GpuDraw = (frame) => {
            const program = programRef.current;
            if (program) {
                program.setUniforms(uniforms ? uniforms(frame) : {});
                frame.renderProgram(program);
            }
            onDraw?.(frame);
        };

        surface.setDraw(shouldDraw ? draw : null);
    }, [onDraw, uniforms, fragmentShader]);

    useEffect(() => {
        const options = routerOptionsRef.current;
        if (!options) return;
        options.gestures = createInteractionAdapter(canvasInteractions);
    }, [canvasInteractions]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                touchAction: 'none',
                ...style
            }}
        />
    );
}

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { createCpuSurface } from '../cpu/CpuSurface';
import type { CpuDraw, CpuSurface } from '../cpu/CpuSurface';
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

export type CpuCanvasProps = {
    initialCamera?: CameraOptions;
    dpr?: number;
    camera?: Camera;
    cameraControls?: CameraControls;
    onDraw?: CpuDraw;
    onSurface?: (surface: CpuSurface) => void;
    canvasInteractions?: CanvasInteractions<CpuSurface>;
    className?: string;
    style?: CSSProperties;
};

export function CpuCanvas({
    initialCamera,
    dpr = 1,
    camera,
    cameraControls,
    onDraw,
    onSurface,
    canvasInteractions,
    className,
    style
}: CpuCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const surfaceRef = useRef<CpuSurface | null>(null);
    const routerOptionsRef = useRef<InputRouterOptions<CpuSurface> | null>(null);

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

        const surface = createCpuSurface({
            canvas,
            camera: surfaceCamera,
            dpr: initialDpr
        });
        surfaceRef.current = surface;
        onSurfaceProp?.(surface);

        const options: InputRouterOptions<CpuSurface> = {
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
            routerOptionsRef.current = null;
        };
    }, []);

    useEffect(() => {
        surfaceRef.current?.setDraw(onDraw ?? null);
    }, [onDraw]);

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

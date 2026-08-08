import { createFrameLoop, type FrameCallback } from '../core/createFrameLoop';
import { defaultCamera, type Camera } from '../core/coords/camera';
import { createInputStore, type InputStore } from './createInputStore';

export type CpuSurfaceConfig = {
    canvas: HTMLCanvasElement;
    camera?: Camera;
    dpr?: number;
};

export type CpuDraw = (surface: CpuSurface) => void;

export type CpuSurface = {
    time: number;
    deltaTime: number;
    frameCount: number;
    width: number;
    height: number;
    dpr: number;
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    readonly camera: Camera;
    readonly input: InputStore;
    readonly isRunning: boolean;
    setDraw(draw: CpuDraw | null): void;
    subscribe(draw: CpuDraw): () => void;
    clear(color: string): void;
    applyCamera(): void;
    destroy(): void;
};

export function createCpuSurface(config: CpuSurfaceConfig): CpuSurface {
    const canvas = config.canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Glaze: Canvas2D context unavailable');

    const camera: Camera = config.camera ?? defaultCamera();
    const dpr = config.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);
    const input = createInputStore();
    const loop = createFrameLoop();

    const subscribers = new Set<CpuDraw>();
    let cpuDraw: CpuDraw | null = null;
    let frameCount = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let rendererAttached = false;
    let unsubscribeRenderer: (() => void) | null = null;

    const resize = (): void => {
        cssWidth = Math.max(1, canvas.clientWidth);
        cssHeight = Math.max(1, canvas.clientHeight);
        const deviceWidth = Math.round(cssWidth * dpr);
        const deviceHeight = Math.round(cssHeight * dpr);
        if (canvas.width !== deviceWidth) canvas.width = deviceWidth;
        if (canvas.height !== deviceHeight) canvas.height = deviceHeight;
    };

    const applyCamera = (): void => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.transform(camera.zoom, 0, 0, camera.zoom, camera.x, camera.y);
        context.scale(dpr, dpr);
    };

    const clear = (color: string): void => {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
    };

    const startRendering = (): void => {
        if (rendererAttached) return;
        unsubscribeRenderer = loop.subscribe(onFrame);
        rendererAttached = true;
    };

    const stopRendering = (): void => {
        if (!rendererAttached) return;
        unsubscribeRenderer?.();
        unsubscribeRenderer = null;
        rendererAttached = false;
    };

    // Build the public surface first so the frame loop can update it and hand it to draw callbacks.
    const surface: CpuSurface = {
        time: 0,
        deltaTime: 0,
        frameCount: 0,
        width: 0,
        height: 0,
        dpr,
        canvas,
        context,
        camera,
        input,

        get isRunning(): boolean {
            return loop.isRunning;
        },

        setDraw(newCpuDraw: CpuDraw | null): void {
            cpuDraw = newCpuDraw;
            if (newCpuDraw && subscribers.size === 0) startRendering();
            else if (!newCpuDraw && subscribers.size === 0) stopRendering();
        },

        subscribe(fn: CpuDraw): () => void {
            subscribers.add(fn);
            startRendering();
            return () => {
                subscribers.delete(fn);
                if (subscribers.size === 0 && cpuDraw === null) stopRendering();
            };
        },

        clear,
        applyCamera,

        destroy(): void {
            stopRendering();
            loop.dispose();
            input.destroy();
            subscribers.clear();
            cpuDraw = null;
        }
    };

    const onFrame: FrameCallback = (time, deltaTime): void => {
        resize();
        frameCount++;
        applyCamera();

        surface.time = time;
        surface.deltaTime = deltaTime;
        surface.frameCount = frameCount;
        surface.width = cssWidth;
        surface.height = cssHeight;

        const current = cpuDraw;
        if (current) current(surface);
        for (const subscriber of subscribers) subscriber(surface);
        input.endFrame();
    };

    // Size the canvas once up front so one-shot draws made outside the frame loop survive
    // (the loop's first resize would otherwise clear the buffer).
    resize();

    return surface;
}

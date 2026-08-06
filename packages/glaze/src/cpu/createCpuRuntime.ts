import { createFrameLoop, type FrameCallback } from '../core/createFrameLoop';
import { defaultCamera, type Camera } from '../core/coords/camera';
import { createInputStore, type InputStore } from './input';

export type CpuRuntimeConfig = {
        canvas: HTMLCanvasElement;
        camera?: Camera;
        dpr?: number;
};

export type CpuFrameContext = {
        readonly time: number;
        readonly deltaTime: number;
        readonly frameCount: number;
        readonly camera: Camera;
        readonly input: InputStore;
        readonly width: number;
        readonly height: number;
        readonly dpr: number;
};

export type CpuDraw = (context: CpuFrameContext) => void;

export type CpuRuntime = {
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

export function createCpuRuntime(config: CpuRuntimeConfig): CpuRuntime {
        const canvas = config.canvas;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Glaze: Canvas2D context unavailable');
        const camera: Camera = config.camera ?? defaultCamera();
        const dpr =
                config.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);
        const input = createInputStore();
        const loop = createFrameLoop();
        const subscribers = new Set<CpuDraw>();
        let draw: CpuDraw | null = null;
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

        const onFrame: FrameCallback = (time, deltaTime): void => {
                resize();
                frameCount++;
                applyCamera();
                const frameContext: CpuFrameContext = {
                        time,
                        deltaTime,
                        frameCount,
                        camera,
                        input,
                        width: cssWidth,
                        height: cssHeight,
                        dpr
                };
                const current = draw;
                if (current) current(frameContext);
                for (const subscriber of subscribers) subscriber(frameContext);
                input.endFrame();
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

        return {
                canvas,
                context,
                camera,
                input,

                get isRunning(): boolean {
                        return loop.isRunning;
                },

                setDraw(fn: CpuDraw | null): void {
                        draw = fn;
                        if (fn && subscribers.size === 0) startRendering();
                        else if (!fn && subscribers.size === 0) stopRendering();
                },

                subscribe(fn: CpuDraw): () => void {
                        subscribers.add(fn);
                        startRendering();
                        return () => {
                                subscribers.delete(fn);
                                if (subscribers.size === 0 && draw === null) stopRendering();
                        };
                },

                clear,
                applyCamera,

                destroy(): void {
                        stopRendering();
                        loop.dispose();
                        input.destroy();
                        subscribers.clear();
                        draw = null;
                }
        };
}

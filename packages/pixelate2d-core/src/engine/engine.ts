import { type Camera, defaultCamera } from '@repo/pixelate2d-math';
import type { FrameCallback, FrameContext, RenderDriver, ResizeStrategy } from '../core/types';
import { createCpuDriver } from '../drivers/cpu';
import { createGpuDriver } from '../drivers/gpu';
import { createInputStore, type InputStore } from './input';

/** Closure-based frame bookkeeping: delta time, elapsed time, frame count, fps. */
export type EngineStore = {
        getState(): { time: number; deltaTime: number; frameCount: number; fps: number };
        tick(deltaSeconds: number): void;
        reset(): void;
};

export function createEngineStore(): EngineStore {
        let time = 0;
        let deltaTime = 0;
        let frameCount = 0;
        let fps = 0;
        return {
                getState: () => ({ time, deltaTime, frameCount, fps }),
                tick(deltaSeconds: number): void {
                        time += deltaSeconds;
                        deltaTime = deltaSeconds;
                        frameCount++;
                        const instant = deltaSeconds > 0 ? 1 / deltaSeconds : 0;
                        fps = fps === 0 ? instant : fps * 0.9 + instant * 0.1;
                },
                reset(): void {
                        time = 0;
                        deltaTime = 0;
                        frameCount = 0;
                        fps = 0;
                }
        };
}

/** The runtime coordinating driver, input, resizing, and the rAF loop. */
export type Engine = {
        readonly driver: RenderDriver;
        readonly input: InputStore;
        /** World → screen viewport applied to every frame. Mutate it freely. */
        camera: Camera;
        start(): void;
        stop(): void;
        isRunning(): boolean;
        setDraw(fn: FrameCallback | null): void;
        /** Register a render callback; returns an unsubscribe function. */
        subscribe(fn: FrameCallback): () => void;
        destroy(): void;
};

export type EngineConfig = {
        canvas: HTMLCanvasElement;
        driver?: RenderDriver;
        driverKind?: 'cpu' | 'gpu';
        camera?: Camera;
        onFrame?: FrameCallback;
        maxFps?: number;
        dpr?: number | 'auto';
        resizeStrategy?: ResizeStrategy;
};

function resolveDpr(dpr: number | 'auto' | undefined): number {
        if (typeof dpr === 'number') return dpr;
        return typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
}

export function createEngine(config: EngineConfig): Engine {
        const canvas = config.canvas;
        const store = createEngineStore();
        const input = createInputStore();
        const driver =
                config.driver ??
                (config.driverKind === 'gpu' ? createGpuDriver(canvas) : createCpuDriver(canvas));
        const maxFps = config.maxFps;
        const resizeStrategy = config.resizeStrategy ?? 'canvas';
        const dpr = resolveDpr(config.dpr);

        const camera: Camera = config.camera ?? defaultCamera();
        const subscribers = new Set<FrameCallback>();
        let draw: FrameCallback | null = config.onFrame ?? null;
        let running = false;
        let rafId = 0;
        let lastTime = 0;
        let destroyed = false;
        let resizeObserver: ResizeObserver | null = null;
        let cssWidth = 0;
        let cssHeight = 0;

        function resize(): void {
                const width = resizeStrategy === 'window' ? window.innerWidth : canvas.clientWidth;
                const height =
                        resizeStrategy === 'window' ? window.innerHeight : canvas.clientHeight;
                const deviceWidth = Math.max(1, Math.round(width * dpr));
                const deviceHeight = Math.max(1, Math.round(height * dpr));
                if (canvas.width !== deviceWidth) canvas.width = deviceWidth;
                if (canvas.height !== deviceHeight) canvas.height = deviceHeight;
                cssWidth = width;
                cssHeight = height;
        }

        function render(): void {
                if (destroyed) return;
                driver.camera = camera;
                const state = store.getState();
                const context: FrameContext = {
                        driver,
                        deltaTime: state.deltaTime,
                        time: state.time,
                        frameCount: state.frameCount,
                        fps: state.fps,
                        input,
                        camera,
                        width: cssWidth,
                        height: cssHeight,
                        dpr
                };
                const callback = draw;
                if (callback) callback(driver, context);
                for (const subscriber of subscribers) subscriber(driver, context);
                input.endFrame();
        }

        function frame(now: number): void {
                rafId = requestAnimationFrame(frame);
                if (!running) return;
                const rawDelta = (now - lastTime) / 1000;
                lastTime = now;
                if (maxFps !== undefined && maxFps > 0 && rawDelta < 1 / maxFps) return;
                store.tick(Math.min(rawDelta, 0.1));
                render();
        }

        const onWindowResize = (): void => {
                resize();
        };

        return {
                driver,
                input,
                camera,

                start(): void {
                        if (running || destroyed) return;
                        running = true;
                        input.attach(canvas);
                        resize();
                        if (resizeStrategy === 'window') {
                                window.addEventListener('resize', onWindowResize);
                        } else if (typeof ResizeObserver !== 'undefined') {
                                resizeObserver = new ResizeObserver(() => {
                                        resize();
                                });
                                resizeObserver.observe(canvas);
                        }
                        lastTime = performance.now();
                        rafId = requestAnimationFrame(frame);
                },

                stop(): void {
                        if (!running) return;
                        running = false;
                        cancelAnimationFrame(rafId);
                        input.detach();
                        if (resizeObserver) {
                                resizeObserver.disconnect();
                                resizeObserver = null;
                        }
                        window.removeEventListener('resize', onWindowResize);
                },

                isRunning(): boolean {
                        return running;
                },

                setDraw(fn: FrameCallback | null): void {
                        draw = fn;
                },

                subscribe(fn: FrameCallback): () => void {
                        subscribers.add(fn);
                        return () => {
                                subscribers.delete(fn);
                        };
                },

                destroy(): void {
                        if (destroyed) return;
                        destroyed = true;
                        stop();
                        store.reset();
                        subscribers.clear();
                        draw = null;
                        driver.destroy();
                }
        };
}

export type RunLoopConfig = {
        canvas: HTMLCanvasElement;
        kind?: 'cpu' | 'gpu';
        camera?: Camera;
        maxFps?: number;
        dpr?: number | 'auto';
        resizeStrategy?: ResizeStrategy;
};

/**
 * Imperative scripting entry point — the non-React twin of the canvas
 * components. Curried so a single configured loop can own many draws:
 *
 * ```ts
 * const stop = runLoop({ canvas, kind: 'cpu', camera })((driver, ctx) => {
 *   driver.clear('#0a0a0c');
 *   drawCircle('#ffd700')(8)({ x: 20, y: 20 })(driver);
 * });
 * ```
 */
export function runLoop(config: RunLoopConfig): (draw: FrameCallback) => () => void {
        const engine = createEngine({
                canvas: config.canvas,
                driverKind: config.kind ?? 'cpu',
                camera: config.camera,
                maxFps: config.maxFps,
                dpr: config.dpr,
                resizeStrategy: config.resizeStrategy
        });
        engine.start();
        return (draw: FrameCallback): (() => void) => {
                engine.setDraw(draw);
                return () => {
                        engine.destroy();
                };
        };
}

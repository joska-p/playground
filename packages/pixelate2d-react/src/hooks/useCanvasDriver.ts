import {
        type Engine,
        type FrameCallback,
        type RenderDriver,
        type ResizeStrategy,
        createEngine
} from '@repo/pixelate2d-core';
import type { Camera } from '@repo/pixelate2d-math';
import { type RefObject, useEffect, useRef, useState } from 'react';
import { registerEngine } from '../utils/engine-registry';

export type UseCanvasDriverOptions = {
        type: 'cpu' | 'gpu';
        camera?: Camera;
        onFrame?: FrameCallback;
        maxFps?: number;
        dpr?: number | 'auto';
        resizeStrategy?: ResizeStrategy;
        /** Start the render loop immediately. Defaults to `true`. */
        autostart?: boolean;
};

/**
 * Create a driver and its backing engine for a canvas ref. React owns the DOM
 * lifecycle; the engine's rAF loop runs independently and never re-renders.
 * Returns the driver (or `null` until the canvas is mounted).
 */
export function useCanvasDriver(
        canvasRef: RefObject<HTMLCanvasElement | null>,
        options: UseCanvasDriverOptions
): RenderDriver | null {
        const [driver, setDriver] = useState<RenderDriver | null>(null);
        const engineRef = useRef<Engine | null>(null);
        const optionsRef = useRef(options);

        useEffect(() => {
                optionsRef.current = options;
                engineRef.current?.setDraw(options.onFrame ?? null);
        });

        useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const current = optionsRef.current;
                const engine = createEngine({
                        canvas,
                        driverKind: current.type,
                        camera: current.camera,
                        maxFps: current.maxFps,
                        dpr: current.dpr,
                        resizeStrategy: current.resizeStrategy
                });
                registerEngine(engine.driver, engine);
                engineRef.current = engine;
                if (current.autostart !== false) engine.start();
                setDriver(engine.driver);
                return () => {
                        engineRef.current = null;
                        engine.destroy();
                };
        }, [canvasRef]);

        return driver;
}

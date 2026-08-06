import { useEffect, useRef, type RefObject } from 'react';
import { createShaderRunner, type ShaderRunner } from '../createShaderRunner';
import type { WebGLContextAttributes } from '../../core/createWebGLContext';

export type UseShaderRunnerProps = {
    fragmentShader: string;
    webGLContextAttributes?: WebGLContextAttributes | undefined;
};

export type UseShaderRunnerResult = {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    runnerRef: RefObject<ShaderRunner | null>;
};

export function useShaderRunner({
    fragmentShader,
    webGLContextAttributes
}: UseShaderRunnerProps): UseShaderRunnerResult {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const runnerRef = useRef<ShaderRunner | null>(null);

    // Tracks the shader string that is currently compiled in the GPU pipeline.
    // This avoids double-compiling on mount and safely handles React Strict Mode.
    const compiledShaderRef = useRef<string | null>(null);

    // Capture mount-time configuration for WebGL context creation.
    // Changing context attributes requires creating a new context, so we freeze
    // the initial values to prevent unintentional teardowns from unstable object literals.
    const initialConfigRef = useRef({ webGLContextAttributes });

    // 1. SETUP EFFECT: Manages canvas lifecycle and WebGL context creation.
    // Runs ONLY on mount / unmount.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const runner = createShaderRunner({
            fragmentShader,
            canvas,
            webGLContextAttributes: initialConfigRef.current.webGLContextAttributes
        });

        runnerRef.current = runner;
        compiledShaderRef.current = fragmentShader;

        let rafId = 0;
        const observer = new ResizeObserver(([entry]) => {
            if (!entry) return;
            const { width, height } = entry.contentRect;
            if (width === 0 || height === 0) return; // Hidden canvas

            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                runner.resize(width, height);
            });
        });

        observer.observe(canvas);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafId);
            runner.dispose();
            runnerRef.current = null;
            compiledShaderRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Intentional empty deps: Context creation is strictly once per mount.

    // 2. RECOMPILE EFFECT: Updates the fragment program in-place without destroying the context.
    // Runs whenever `fragmentShader` changes.
    useEffect(() => {
        // If the runner isn't ready yet or the shader hasn't changed, skip compilation.
        if (!runnerRef.current || compiledShaderRef.current === fragmentShader) {
            return;
        }

        runnerRef.current.pipeline.compileFragmentShader(fragmentShader);
        compiledShaderRef.current = fragmentShader;
    }, [fragmentShader]);

    return { canvasRef, runnerRef };
}

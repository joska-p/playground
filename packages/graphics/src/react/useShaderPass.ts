import { useCallback, useEffect, useRef } from 'react';
import {
  createShaderUniformBuilder,
  type Point2D,
  type ShaderUniformValues
} from '../math/transforms';
import { QuadPipeline } from '../webgl/QuadPipeline';
import { WebGLContext, type WebGLContextConfig } from '../webgl/WebGLContext';

export type UseShaderPassOptions = {
  fragmentShader: string;
  dpr?: number;
  alpha?: boolean;
};

export function useShaderPass(options: UseShaderPassOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<WebGLContext | null>(null);
  const pipelineRef = useRef<QuadPipeline | null>(null);
  const uniformBuilderRef = useRef<(mouseBufferPixel?: Point2D) => ShaderUniformValues>(() => ({
    uniformResolution: [0, 0],
    uniformAspectRatio: 1,
    uniformMouse: [0, 0]
  }));
  const rafRef = useRef<number>(0);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = options.dpr ?? Math.min(window.devicePixelRatio, 2);
    const config: WebGLContextConfig = { canvas, dpr };
    if (options.alpha !== undefined) config.alpha = options.alpha;
    const ctx = new WebGLContext(config);
    const uniformBuilder = createShaderUniformBuilder(canvas.clientWidth, canvas.clientHeight, dpr);
    const pipeline = new QuadPipeline(ctx.gl, uniformBuilder);

    pipeline.compileFragmentShader(options.fragmentShader);

    ctxRef.current = ctx;
    pipelineRef.current = pipeline;
    uniformBuilderRef.current = uniformBuilder;
  }, [options.fragmentShader, options.dpr, options.alpha]);

  useEffect(() => {
    setup();
    const raf = rafRef.current;
    return () => {
      pipelineRef.current?.dispose();
      cancelAnimationFrame(raf);
    };
  }, [setup]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = options.dpr ?? Math.min(window.devicePixelRatio, 2);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        ctxRef.current?.resize();
        uniformBuilderRef.current = createShaderUniformBuilder(width, height, dpr);
      }
    });
    observer.observe(canvas);
    return () => {
      observer.disconnect();
    };
  }, [options.dpr]);

  return { canvasRef };
}

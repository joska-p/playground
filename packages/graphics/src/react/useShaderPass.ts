import { useCallback, useEffect, useRef } from 'react';
import { SpaceMapper } from '../math/SpaceMapper';
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
  const mapperRef = useRef<SpaceMapper | null>(null);
  const rafRef = useRef<number>(0);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = options.dpr ?? Math.min(window.devicePixelRatio, 2);
    const config: WebGLContextConfig = { canvas, dpr };
    if (options.alpha !== undefined) config.alpha = options.alpha;
    const ctx = new WebGLContext(config);
    const mapper = new SpaceMapper({
      cssWidth: canvas.clientWidth,
      cssHeight: canvas.clientHeight,
      dpr
    });
    const pipeline = new QuadPipeline(ctx.gl, mapper);

    pipeline.compileFragmentShader(options.fragmentShader);

    ctxRef.current = ctx;
    pipelineRef.current = pipeline;
    mapperRef.current = mapper;
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

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        ctxRef.current?.resize();
        mapperRef.current?.resize({ cssWidth: width, cssHeight: height });
      }
    });
    observer.observe(canvas);
    return () => {
      observer.disconnect();
    };
  }, []);

  return { canvasRef };
}

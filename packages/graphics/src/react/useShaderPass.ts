import { useEffect, useRef } from 'react';
import { createShaderUniformBuilder, type Point2D } from '../math/transforms';
import { QuadPipeline } from '../webgl/QuadPipeline';
import { WebGLContext, type WebGLContextConfig } from '../webgl/WebGLContext';

export type UseShaderPassOptions = {
  fragmentShader: string;
  dpr?: number;
  alpha?: boolean;
  /**
   * Called every frame just before the built-in uniforms are uploaded and
   * the fullscreen triangle is drawn. Use pipeline.setUniforms() here to
   * push any custom uniforms (e.g. uTime, uChroma, uGridSize).
   */
  onBeforeRender?: (pipeline: QuadPipeline, time: number) => void;
};

export function useShaderPass(options: UseShaderPassOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pipelineRef = useRef<QuadPipeline | null>(null);
  const ctxRef = useRef<WebGLContext | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<Point2D>({ x: 0, y: 0 });

  // Always keep this ref pointing at the latest callback — avoids stale closures
  // inside the rAF loop without making it a setup effect dependency.
  const onBeforeRenderRef = useRef(options.onBeforeRender);

  useEffect(() => {
    onBeforeRenderRef.current = options.onBeforeRender;
  }, [options.onBeforeRender]);

  // ── Initialise WebGL context, pipeline, mouse tracking, resize observer ──
  // Runs once on mount. DPR and alpha don't change dynamically, so they're
  // captured at mount time.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = options.dpr ?? Math.min(window.devicePixelRatio, 2);
    const config: WebGLContextConfig = { canvas, dpr };
    if (options.alpha !== undefined) config.alpha = options.alpha;

    const ctx = new WebGLContext(config);
    const uniformBuilder = createShaderUniformBuilder(canvas.clientWidth, canvas.clientHeight, dpr);
    const pipeline = new QuadPipeline(ctx.gl, uniformBuilder);

    ctxRef.current = ctx;
    pipelineRef.current = pipeline;

    // ── Pointer tracking (feeds into the built-in u_mouse / uniformMouse uniform) ──
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr
      };
    };
    canvas.addEventListener('pointermove', onPointerMove);

    // ── Resize observer — syncs the uniform builder so resolution uniforms stay correct ──
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        ctxRef.current?.resize();
        const newBuilder = createShaderUniformBuilder(width, height, dpr);
        pipelineRef.current?.updateUniformBuilder(newBuilder);
      }
    });
    observer.observe(canvas);

    // ── Render loop ──
    const loop = () => {
      const time = performance.now() / 1000;
      const p = pipelineRef.current;
      if (p) {
        onBeforeRenderRef.current?.(p, time);
        p.render(mouseRef.current);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      pipeline.dispose();
      pipelineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Re-compile shader when the source string changes ──
  // Reuses the existing context & pipeline — no teardown required.
  useEffect(() => {
    pipelineRef.current?.compileFragmentShader(options.fragmentShader);
  }, [options.fragmentShader]);

  return { canvasRef };
}

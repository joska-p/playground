import { useEffect, useRef } from 'react';
import {
  createWebGLContext,
  defaultDevicePixelRatio
} from '@repo/graphics/core/createWebGLContext';
import { applyStandardUniforms } from '@repo/graphics/core/standardUniforms';
import { createShaderUniformBuilder, type Point2D } from '@repo/graphics/2d/transforms';
import { useInteractiveCanvas } from '@repo/graphics/2d/react/useInteractiveCanvas';
import { useFrame } from '@repo/graphics/2d/react/FrameLoopContext';
import perturbationShader from '../core/mandelbrot-perturbation.frag?raw';
import {
  createPerturbationPipeline,
  type PerturbationPipeline
} from '../core/createPerturbationPipeline';
import { computeMaxIterations, computeReferenceOrbit } from '../core/perturbationOrbit';
import {
  useAmbientLight,
  useBumpHeight,
  useChromaScale,
  useHueFrequency,
  useHueShift,
  useInteriorScale,
  useIterationBase,
  useIterationCap,
  useIterationScale,
  usePixelEps,
  useSunAngle
} from '../stores/store';

type Runner = {
  canvas: HTMLCanvasElement;
  pipeline: PerturbationPipeline;
  setMouse(pixel: Point2D): void;
  render(): void;
  dispose(): void;
};

function PerturbationScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const iterationBase = useIterationBase();
  const iterationScale = useIterationScale();
  const iterationCap = useIterationCap();
  const interiorScale = useInteriorScale();
  const pixelEps = usePixelEps();
  const ambientLight = useAmbientLight();
  const bumpHeight = useBumpHeight();
  const chromaScale = useChromaScale();
  const hueFrequency = useHueFrequency();
  const hueShift = useHueShift();
  const sunAngle = useSunAngle();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = createWebGLContext({
      canvas,
      webGLContextAttributes: { antialias: true }
    });
    const pipeline = createPerturbationPipeline(ctx.gl);
    pipeline.compileFragmentShader(perturbationShader);

    let builder = createShaderUniformBuilder(
      canvas.clientWidth,
      canvas.clientHeight,
      defaultDevicePixelRatio()
    );
    let mousePx: Point2D = { x: 0, y: 0 };

    const offContextRestored = ctx.onContextRestored(() => {
      ctx.reinitialize();
      pipeline.reinitialize();
    });

    const runner: Runner = {
      canvas,
      pipeline,
      setMouse(pixel: Point2D): void {
        mousePx = pixel;
      },
      render(): void {
        applyStandardUniforms(pipeline, builder(mousePx));
        pipeline.render();
      },
      dispose(): void {
        offContextRestored();
        pipeline.dispose();
      }
    };
    runnerRef.current = runner;

    let rafId = 0;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return; // Hidden canvas
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        ctx.resize(width, height);
        builder = createShaderUniformBuilder(width, height, defaultDevicePixelRatio());
      });
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      runner.dispose();
      runnerRef.current = null;
    };
  }, []);

  const interactionState = useInteractiveCanvas(canvasRef, true, {
    maxZoom: 1e7,
    zoomToCursor: true,
    scalePanWithZoom: true,
    zoomSpeed: 250
  });

  useFrame(() => {
    const runner = runnerRef.current;
    if (!runner) return;
    if (runner.canvas.clientWidth === 0 || runner.canvas.clientHeight === 0) return;

    const { pan, zoom } = interactionState.current;

    // Map the interaction view onto the complex-plane center the reference orbit
    // lives at (same convention as the DS shader: c = (uvCoord - 0.5)·(3/zoom) + center).
    const panNormX = -pan.x / runner.canvas.clientWidth;
    const panNormY = pan.y / runner.canvas.clientHeight;
    const centerRe = 3.0 * panNormX - 0.5;
    const centerIm = 3.0 * panNormY;

    const maxIterations = computeMaxIterations(zoom, iterationBase, iterationScale, iterationCap);
    const orbit = computeReferenceOrbit(centerRe, centerIm, maxIterations);
    runner.pipeline.setReferenceOrbit(orbit);

    runner.pipeline.setUniforms({
      u_zoom: zoom,
      u_orbit: runner.pipeline.orbitTexture,
      u_orbitLength: orbit.orbitLength,
      u_referenceIterations: orbit.referenceIterations,
      u_interiorScale: interiorScale,
      u_pixelEps: pixelEps,
      u_sunAngle: sunAngle,
      u_bumpHeight: bumpHeight,
      u_ambient: ambientLight,
      u_hueShift: hueShift,
      u_hueFrequency: hueFrequency,
      u_chromaScale: chromaScale
    });

    runner.render();
  });

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    runnerRef.current?.setMouse({
      x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    });
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
      onPointerMove={handlePointerMove}
    />
  );
}

export { PerturbationScene };

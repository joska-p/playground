import { useEffect, useRef } from 'react';
import { createWebGLContext } from '@repo/graphics/core/createWebGLContext';
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
import { useParams } from '../stores/createParamStore';
import { perturbationStore } from '../stores/perturbationStore';
import {
  setView,
  useRenderer,
  useResetVersion,
  useViewPan,
  useViewZoom
} from '../stores/viewStore';

type Runner = {
  canvas: HTMLCanvasElement;
  pipeline: PerturbationPipeline;
  setMouse(pixel: Point2D): void;
  render(): void;
  dispose(): void;
};

const MAX_ZOOM = 1e7;

// Inner canvas component: the key on it (from PerturbationScene) remounts the
// whole runner + interaction state on activation and on reset, so the WebGL
// context is always bound to the live canvas and initialView reseeds correctly.
function PerturbationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runnerRef = useRef<Runner | null>(null);

  const params = useParams(perturbationStore);
  const pan = useViewPan();
  const zoom = useViewZoom();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = createWebGLContext({
      canvas,
      webGLContextAttributes: { antialias: true }
    });
    const pipeline = createPerturbationPipeline(ctx.gl);
    pipeline.compileFragmentShader(perturbationShader);

    let builder = createShaderUniformBuilder(canvas.clientWidth, canvas.clientHeight);
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
        builder = createShaderUniformBuilder(width, height);
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
    maxZoom: MAX_ZOOM,
    zoomToCursor: true,
    scalePanWithZoom: true,
    zoomSpeed: 250,
    initialView: { pan, zoom },
    onChange: setView
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

    const maxIterations = computeMaxIterations(
      zoom,
      params.iterationBase,
      params.iterationScale,
      params.iterationCap
    );
    const orbit = computeReferenceOrbit(centerRe, centerIm, maxIterations);
    runner.pipeline.setReferenceOrbit(orbit);

    runner.pipeline.setUniforms({
      u_zoom: zoom,
      u_orbit: runner.pipeline.orbitTexture,
      u_orbitLength: orbit.orbitLength,
      u_referenceIterations: orbit.referenceIterations,
      u_interiorScale: params.interiorScale,
      u_pixelEps: params.pixelEps,
      u_sunAngle: params.sunAngle,
      u_bumpHeight: params.bumpHeight,
      u_ambient: params.ambientLight,
      u_hueShift: params.hueShift,
      u_hueFrequency: params.hueFrequency,
      u_chromaScale: params.chromaScale
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

function PerturbationScene() {
  const renderer = useRenderer();
  const isActive = renderer === 'perturbation';
  const pan = useViewPan();
  const zoom = useViewZoom();
  const resetVersion = useResetVersion();

  // Other renderers can zoom deeper than this one supports; clamp on activation.
  useEffect(() => {
    if (isActive && zoom > MAX_ZOOM) {
      setView({ pan, zoom: MAX_ZOOM });
    }
  }, [isActive, pan, zoom]);

  return <PerturbationCanvas key={isActive ? `active-${String(resetVersion)}` : 'hidden'} />;
}

export { PerturbationScene };

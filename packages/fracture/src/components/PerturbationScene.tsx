import { useEffect, useRef } from 'react';
import { createWebGLContext } from '@repo/graphics/core/createWebGLContext';
import { applyStandardUniforms } from '@repo/graphics/core/standardUniforms';
import { createShaderUniformBuilder, type Point2D } from '@repo/graphics/2d/transforms';
import { usePanZoom, type PanZoomOptions } from '@repo/graphics/2d/react/usePanZoom';
import { useFrame } from '@repo/graphics/2d/react/FrameLoopContext';
import perturbationShader from '../core/mandelbrot-perturbation.frag?raw';
import {
  createPerturbationPipeline,
  type PerturbationPipeline
} from '../core/createPerturbationPipeline';
import {
  computeMaxIterations,
  computeReferenceOrbit,
  computeSecondaryOrbit,
  type ReferenceOrbit
} from '../core/perturbationOrbit';
import { useParams } from '../stores/createParamStore';
import { perturbationStore } from '../stores/perturbationStore';
import { setView, useRenderer, useViewPan, useViewZoom } from '../stores/viewStore';
import type { View } from '../stores/viewStore';

type Orbits = {
  primary: ReferenceOrbit;
  secondary: ReferenceOrbit;
};

type Runner = {
  canvas: HTMLCanvasElement;
  pipeline: PerturbationPipeline;
  /** Last orbits computed for the current view; null until the first frame runs. */
  orbits: Orbits | null;
  setMouse(pixel: Point2D): void;
  render(): void;
  dispose(): void;
};

/**
 * Practical ceiling once the centre is still float64 and the delta is DS.
 * Beyond ~1e15 the float64 centre itself loses significance; raise only after
 * you switch the reference-orbit math to BigInt / decimal.
 */
const MAX_ZOOM = 1e15;

/**
 * Complex-plane width of the view at zoom = 1.
 *
 * `pan` (from usePanZoom with `scalePanWithZoom: true`) is accumulated in
 * "zoom-normalized" units: every drag increment is pre-divided by the zoom
 * level *at the time of that drag*, so the stored value is already
 * zoom-independent. Converting it to a complex-plane offset must therefore
 * use this fixed, zoom = 1 width — NOT the current per-frame view scale
 * (3 / zoom). Multiplying by the current scale would divide old pan history
 * by zoom a second time, so the effective centre would drift further from
 * where the user actually dragged every time they zoomed afterwards.
 */
const WORLD_SCALE = 3.0;

/** Split a float64 value into a double-single pair (hi, lo). */
function splitDS(x: number): [number, number] {
  const hi = Math.fround(x); // nearest float32
  const lo = x - hi; // exact residual in float64, still exact as float32
  return [hi, lo];
}

// Inner canvas component: the key on it (from PerturbationScene) remounts the
// whole runner + interaction state on activation and on reset, so the WebGL
// context is always bound to the live canvas and initialView reseeds correctly.
function PerturbationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runnerRef = useRef<Runner | null>(null);

  // NaN sentinels guarantee the first frame always computes an orbit.
  const lastCenterRe = useRef(NaN);
  const lastCenterIm = useRef(NaN);
  const lastZoom = useRef(NaN);

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
      orbits: null,
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

  const panZoomOptions: PanZoomOptions = {
    maxZoom: MAX_ZOOM,
    zoomToCursor: true,
    scalePanWithZoom: true,
    zoomSpeed: 250,
    initialView: { pan, zoom },
    onChange: (view: View) => {
      setView({ pan: view.pan, zoom: view.zoom });
    }
  };

  const panZoomRef = usePanZoom(canvasRef, panZoomOptions);

  useFrame(() => {
    const runner = runnerRef.current;
    if (!runner) return;
    if (runner.canvas.clientWidth === 0 || runner.canvas.clientHeight === 0) return;

    const { pan, zoom } = panZoomRef.current;

    // ─── FIXED CENTRE ────────────────────────────────────────────────
    // pan is stored in zoom-normalized units (because scalePanWithZoom = true).
    // The same convention is used by usePanZoomUniforms.
    const panNormX = -pan.x / runner.canvas.clientWidth;
    const panNormY = pan.y / runner.canvas.clientHeight;

    // Convert pan with the FIXED zoom = 1 width, not the current view scale
    // (see WORLD_SCALE doc comment above) — this is the pan/zoom bug fix.
    const centerRe = panNormX * WORLD_SCALE - 0.5; // classic Mandelbrot base centre
    const centerIm = panNormY * WORLD_SCALE;

    // Complex-plane width of the *current* view — this one correctly shrinks
    // with zoom and drives the per-pixel delta / reference orbit spacing.
    const viewScale = WORLD_SCALE / zoom;
    // ────────────────────────────────────────────────────────────────

    const viewChanged =
      centerRe !== lastCenterRe.current ||
      centerIm !== lastCenterIm.current ||
      zoom !== lastZoom.current;

    if (viewChanged) {
      const maxIterations = computeMaxIterations(
        zoom,
        params.iterationBase,
        params.iterationScale,
        params.iterationCap
      );

      // Primary at the exact view centre
      const primary = computeReferenceOrbit(centerRe, centerIm, maxIterations);

      // Secondary a few pixels away (still useful for the current view)
      const secondary = computeSecondaryOrbit(centerRe, centerIm, viewScale, maxIterations);

      runner.pipeline.setReferenceOrbits(primary, secondary);
      runner.orbits = { primary, secondary };

      lastCenterRe.current = centerRe;
      lastCenterIm.current = centerIm;
      lastZoom.current = zoom;
    }

    // Always true after the block above on the very first frame (NaN sentinels
    // guarantee viewChanged), so this is a type-safety guard, not a real skip.
    if (!runner.orbits) return;
    const { primary, secondary } = runner.orbits;

    const [scaleHi, scaleLo] = splitDS(viewScale);

    runner.pipeline.setUniforms({
      u_zoom: zoom,
      u_scale: [scaleHi, scaleLo],

      u_orbit: runner.pipeline.orbitTexture,
      u_orbitLength: primary.orbitLength,
      u_referenceIterations: primary.referenceIterations,

      u_orbit2: runner.pipeline.orbitTexture2,
      u_orbitLength2: secondary.orbitLength,
      u_referenceIterations2: secondary.referenceIterations,

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

  // Other renderers can zoom deeper than this one supports; clamp on activation.
  useEffect(() => {
    if (isActive && zoom > MAX_ZOOM) {
      setView({ pan, zoom: MAX_ZOOM });
    }
  }, [isActive, pan, zoom]);

  return <PerturbationCanvas />;
}

export { PerturbationScene };

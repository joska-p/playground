import { useEffect, useRef } from 'react';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import perturbationShader from '../core/mandelbrot-perturbation.frag?raw';
import { createOrbitTextures, type OrbitTextures } from '../core/createOrbitTextures';
import {
    computeMaxIterations,
    computeReferenceOrbit,
    computeSecondaryOrbit,
    type ReferenceOrbit
} from '../core/perturbationOrbit';
import { fractalParamsUniforms } from '../core/fractalUniforms';
import { useFractureView } from '../core/useFractureView';
import { useParams } from '../stores/createParamStore';
import { perturbationStore } from '../stores/perturbationStore';
import { setView, useRenderer, useViewPan, useViewZoom } from '../stores/viewStore';

type Orbits = {
    primary: ReferenceOrbit;
    secondary: ReferenceOrbit;
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
 * `pan` (stored zoom-normalized, see useFractureView) is accumulated in
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

function PerturbationScene() {
    const params = useParams(perturbationStore);

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

    const { camera, controls, pointerHandlers, syncView } = useFractureView({
        initialView: { pan, zoom },
        maxZoom: MAX_ZOOM
    });

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const texturesRef = useRef<OrbitTextures | null>(null);
    const orbitsRef = useRef<Orbits | null>(null);

    // NaN sentinels guarantee the first visible frame always computes an orbit.
    const lastCenterRe = useRef(NaN);
    const lastCenterIm = useRef(NaN);
    const lastZoom = useRef(NaN);

    // Dispose the raw-GL textures with the component; the glaze runtime owns
    // its own resources and cleans those up when the canvas unmounts.
    useEffect(() => {
        return () => {
            texturesRef.current?.dispose();
            texturesRef.current = null;
            orbitsRef.current = null;
        };
    }, []);

    // Glaze reinitializes its programs on context restore, but our raw-GL orbit
    // textures are dead afterwards; recreate and re-upload the last orbits.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const onRestored = () => {
            const orbits = orbitsRef.current;
            if (orbits) {
                texturesRef.current?.dispose();
                texturesRef.current?.upload(orbits.primary, orbits.secondary);
            }
        };
        canvas.addEventListener('webglcontextrestored', onRestored);
        return () => {
            canvas.removeEventListener('webglcontextrestored', onRestored);
        };
    }, [canvasRef]);

    return (
        <div className="h-screen w-screen">
            <GpuCanvas
                className="h-full w-full"
                fragmentShader={perturbationShader}
                camera={camera}
                cameraControls={controls}
                pointerHandlers={pointerHandlers}
                canvasRef={canvasRef}
                uniforms={({ camera: view, width, height }) => {
                    syncView();

                    // Hidden scenes (Activity mode="hidden") report 0 size; skip the
                    // expensive reference-orbit math until the canvas is visible.
                    const canvas = canvasRef.current;
                    if (!canvas || canvas.clientWidth === 0 || canvas.clientHeight === 0) {
                        return {};
                    }

                    // Lazily bind the orbit textures to the glaze-owned GL context
                    // (the first frame runs only once the runtime is live).
                    if (!texturesRef.current) {
                        const gl = canvas.getContext('webgl2');
                        if (!gl) return {};
                        texturesRef.current = createOrbitTextures(gl);
                    }

                    // ─── FIXED CENTRE ────────────────────────────────────────────────
                    // pan is stored in zoom-normalized units (see useFractureView).
                    const panNormX = view.x / view.zoom / width;
                    const panNormY = view.y / view.zoom / height;

                    // Convert pan with the FIXED zoom = 1 width, not the current view
                    // scale (see WORLD_SCALE doc comment above) — the pan/zoom fix.
                    // pan is a drag offset: it moves opposite the cursor
                    // (content-follows), hence the negated centerRe; y is flipped by
                    // the canvas→vUv conversion, so centerIm stays positive.
                    const aspect = width / height;
                    // Pin the center to screenToWorld across zoom: the shader's
                    // (uvCoord − 0.5) reference sits inside the /zoom divide, which
                    // glaze's screenToWorld-based zoomAt does not compensate.
                    const drift = 1.0 - 1.0 / view.zoom;
                    const centerRe =
                        -panNormX * WORLD_SCALE * aspect - 0.5 - 0.5 * WORLD_SCALE * aspect * drift;
                    const centerIm = panNormY * WORLD_SCALE + 0.5 * WORLD_SCALE * drift;

                    // Complex-plane width of the *current* view — this one correctly
                    // shrinks with zoom and drives the per-pixel delta / reference
                    // orbit spacing.
                    const viewScale = WORLD_SCALE / view.zoom;
                    // ────────────────────────────────────────────────────────────────

                    const viewChanged =
                        centerRe !== lastCenterRe.current ||
                        centerIm !== lastCenterIm.current ||
                        view.zoom !== lastZoom.current;

                    if (viewChanged) {
                        const maxIterations = computeMaxIterations(
                            view.zoom,
                            params.iterationBase,
                            params.iterationScale,
                            params.iterationCap
                        );

                        // Primary at the exact view centre
                        const primary = computeReferenceOrbit(centerRe, centerIm, maxIterations);

                        // Secondary a few pixels away (still useful for the current view)
                        const secondary = computeSecondaryOrbit(
                            centerRe,
                            centerIm,
                            viewScale,
                            maxIterations
                        );

                        texturesRef.current.upload(primary, secondary);
                        orbitsRef.current = { primary, secondary };

                        lastCenterRe.current = centerRe;
                        lastCenterIm.current = centerIm;
                        lastZoom.current = view.zoom;
                    }

                    if (!orbitsRef.current) return {};
                    const { primary, secondary } = orbitsRef.current;

                    const [scaleHi, scaleLo] = splitDS(viewScale);

                    return {
                        u_scale: [scaleHi, scaleLo],

                        u_orbit: texturesRef.current.tex1,
                        u_orbitLength: primary.orbitLength,
                        u_referenceIterations: primary.referenceIterations,

                        u_orbit2: texturesRef.current.tex2,
                        u_orbitLength2: secondary.orbitLength,
                        u_referenceIterations2: secondary.referenceIterations,

                        ...fractalParamsUniforms(params)
                    };
                }}
            />
        </div>
    );
}

export { PerturbationScene };

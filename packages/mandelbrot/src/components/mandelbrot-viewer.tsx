/**
 * The Mandelbrot viewer, wired onto `@repo/glaze`.
 *
 * GpuCanvas is a pure GL surface + frame loop: glaze supplies the fullscreen
 * triangle and compiles `FRAGMENT_SRC`; this component feeds it per-frame
 * uniforms. All view math stays in BigFloat land (`view.ts`); only the
 * spacing + reference offset are translated at the canvas boundary. glaze's
 * float32 Camera is deliberately not used for pan/zoom — it can't hold
 * arbitrary-depth zoom.
 */

import { useEffect, useRef, useState } from 'react';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import type { GpuSurface } from '@repo/glaze/gpu/createGpuSurface';
import type { PointerHandlers } from '@repo/glaze/react/interaction';
import { computeReferenceAsync, toRequest, type OrbitResult } from '../lib/reference-worker';
import {
    type View,
    initialView,
    panByPixels,
    pixelSpacing,
    reprecision,
    zoomAtPixel
} from '../lib/mandelbrot/view';
import { toNumber } from '../lib/big-float';
import {
    type LookState,
    DEFAULT_LOOK,
    effectiveMaxIter,
    lookToParams
} from '../lib/mandelbrot/look';
import { needsRecompute, Superseder } from '../lib/reference-policy';
import { FRAGMENT_SRC } from '../lib/webgl/shaders';
import { createOrbitTexture, REF_TEX_WIDTH, type OrbitTexture } from '../lib/orbit-textures';
import { ControlPanel } from './control-panel';
import { Hud } from './hud';

// Probe up front so the error card renders instead of letting glaze's runtime
// throw inside GpuCanvas (which would surface the App-level error boundary).
const WEBGL2_AVAILABLE =
    typeof document !== 'undefined' &&
    document.createElement('canvas').getContext('webgl2') !== null;

// TEMP DIAGNOSTICS — remove after fixing the blank canvas.
let diagLogged = 0;
const diag = (...args: unknown[]) => {
    if (diagLogged < 30) {
        diagLogged++;
        console.info('[mb-diag]', ...args);
    }
};

export function MandelbrotViewer() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const viewRef = useRef<View>(initialView());
    const lookRef = useRef<LookState>(DEFAULT_LOOK);

    // Reference-orbit bookkeeping.
    const refCenterRef = useRef<View | null>(null);
    const refLengthRef = useRef(0);
    const computingRef = useRef(false);
    const supersederRef = useRef(new Superseder());

    // Raw-GL orbit texture + the last orbit (needed to re-upload after a
    // context restore, since app-created textures are dead afterwards).
    const texturesRef = useRef<OrbitTexture | null>(null);
    const lastOrbitRef = useRef<OrbitResult | null>(null);
    const orbitVersionRef = useRef(0);
    const uploadedVersionRef = useRef(0);

    const [look, setLook] = useState<LookState>(DEFAULT_LOOK);
    const [hud, setHud] = useState({ zoom: 0, cx: -0.6, cy: 0, computing: false });

    const updateHud = () => {
        const v = viewRef.current;
        setHud((h) => ({
            ...h,
            zoom: v.zoom,
            cx: toNumber(reprecision(v).cx),
            cy: toNumber(reprecision(v).cy)
        }));
    };

    const requestReference = async (view: View) => {
        diag('requestReference start, computing=', computingRef.current);
        if (computingRef.current) return;
        computingRef.current = true;
        const token = supersederRef.current.begin();
        setHud((h) => ({ ...h, computing: true }));

        try {
            const withP = reprecision(view);
            const iters = effectiveMaxIter(lookRef.current.maxIter, view.zoom);
            const req = toRequest(withP.cx, withP.cy, iters);
            const orbit = await computeReferenceAsync(req);
            diag(
                'orbit resolved, length=',
                orbit.length,
                'superseded=',
                !supersederRef.current.isCurrent(token)
            );
            if (!supersederRef.current.isCurrent(token)) return; // superseded
            orbitVersionRef.current += 1;
            lastOrbitRef.current = orbit;
            refCenterRef.current = withP;
            refLengthRef.current = orbit.length;
        } catch (e) {
            console.log('[v0] reference compute failed:', (e as Error).message);
        } finally {
            computingRef.current = false;
            setHud((h) => ({ ...h, computing: false }));
        }
    };

    // These closures only read refs and stable setState, so their identity never
    // matters — hold them behind refs so effects/listeners keep stable deps
    // without useCallback (the compiler can't memoize this imperative component).
    const updateHudRef = useRef(updateHud);
    const requestReferenceRef = useRef(requestReference);

    // Pan/zoom handlers drive the BigFloat view. Built once via a lazy state
    // initializer so the object's identity is stable across renders and glaze's
    // interaction controller attaches its listeners once.
    const [pointerHandlers] = useState<PointerHandlers<GpuSurface>>(() => {
        let dragging = false;
        let lastX = 0;
        let lastY = 0;

        const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

        const maybeRecompute = () => {
            // Recompute reference if we've panned/zoomed far from the current ref.
            const view = viewRef.current;
            const ref = refCenterRef.current;
            const canvas = canvasRef.current;
            if (!ref || !canvas) return;
            const h = canvas.height;
            if (needsRecompute(view, ref, refLengthRef.current, lookRef.current, h)) {
                void requestReferenceRef.current(view);
            }
        };

        return {
            onPointerDown(event) {
                dragging = true;
                lastX = event.clientX;
                lastY = event.clientY;
                canvasRef.current?.setPointerCapture(event.pointerId);
                return true;
            },
            onPointerMove(event) {
                if (!dragging) return true;
                const canvas = canvasRef.current;
                if (!canvas) return true;
                const d = dpr();
                viewRef.current = panByPixels(
                    viewRef.current,
                    (event.clientX - lastX) * d,
                    (event.clientY - lastY) * d,
                    canvas.height
                );
                lastX = event.clientX;
                lastY = event.clientY;
                updateHudRef.current();
                return true;
            },
            onPointerUp(event) {
                dragging = false;
                canvasRef.current?.releasePointerCapture(event.pointerId);
                maybeRecompute();
                return true;
            },
            onWheel(event) {
                event.preventDefault();
                const canvas = canvasRef.current;
                if (!canvas) return true;
                const rect = canvas.getBoundingClientRect();
                const d = dpr();
                viewRef.current = zoomAtPixel(
                    viewRef.current,
                    -event.deltaY * 0.0025,
                    (event.clientX - rect.left) * d,
                    (event.clientY - rect.top) * d,
                    canvas.width,
                    canvas.height
                );
                updateHudRef.current();
                maybeRecompute();
                return true;
            }
        };
    });

    // Keep refs in sync with the look state driven by the panel.
    useEffect(() => {
        lookRef.current = look;
    }, [look]);

    // Dispose the orbit texture with the component; the glaze runtime owns its
    // own resources and cleans those up when the canvas unmounts.
    useEffect(() => {
        return () => {
            texturesRef.current?.dispose();
            texturesRef.current = null;
        };
    }, []);

    // Glaze recompiles its programs on context restore, but our raw-GL orbit
    // texture is dead afterwards; recreate + re-upload the last orbit.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const onRestored = () => {
            texturesRef.current?.dispose();
            texturesRef.current = null;
            uploadedVersionRef.current = 0;
        };
        canvas.addEventListener('webglcontextrestored', onRestored);
        return () => {
            canvas.removeEventListener('webglcontextrestored', onRestored);
        };
    }, []);

    // First reference orbit on mount.
    useEffect(() => {
        void requestReferenceRef.current(viewRef.current);
    }, []);

    // Recompute reference when maxIter changes (orbit length depends on it).
    useEffect(() => {
        void requestReferenceRef.current(viewRef.current);
    }, [look.maxIter]);

    const handleReset = () => {
        viewRef.current = initialView();
        updateHudRef.current();
        void requestReferenceRef.current(viewRef.current);
    };

    if (!WEBGL2_AVAILABLE) {
        return (
            <div className="flex h-dvh w-full items-center justify-center bg-background p-8">
                <div className="max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground">
                    <h2 className="mb-2 text-lg font-semibold text-balance">WebGL2 unavailable</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        WebGL2 is not available in this browser. This visualizer needs WebGL2 with
                        float-texture support. Try a recent version of Chrome, Firefox, or Safari on
                        a device with GPU acceleration enabled.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="relative h-dvh w-full overflow-hidden bg-background">
            <GpuCanvas
                className="h-full w-full"
                fragmentShader={FRAGMENT_SRC}
                canvasRef={canvasRef}
                pan={false}
                zoom={false}
                pointerHandlers={pointerHandlers}
                dpr={Math.min(window.devicePixelRatio || 1, 2)}
                uniforms={() => {
                    const refCenter = refCenterRef.current;
                    if (!refCenter) {
                        diag('uniforms: {} no refCenter');
                        return {};
                    }

                    const canvas = canvasRef.current;
                    if (!canvas) {
                        diag('uniforms: {} no canvas');
                        return {};
                    }

                    const orbit = lastOrbitRef.current;
                    if (!orbit) {
                        diag('uniforms: {} no orbit');
                        return {};
                    }

                    // Lazily create the texture on the glaze-owned context and
                    // upload each new orbit exactly once.
                    let texture = texturesRef.current;
                    if (!texture || orbitVersionRef.current !== uploadedVersionRef.current) {
                        if (!texture) {
                            const gl = canvas.getContext('webgl2');
                            if (!gl) {
                                diag('uniforms: {} no gl');
                                return {};
                            }
                            texture = createOrbitTexture(gl);
                            texturesRef.current = texture;
                        }
                        texture.upload(orbit.data, orbit.length);
                        uploadedVersionRef.current = orbitVersionRef.current;
                        diag('texture uploaded, version=', uploadedVersionRef.current);
                    }

                    const view = viewRef.current;
                    const devW = canvas.width;
                    const devH = canvas.height;
                    if (devW === 0 || devH === 0) {
                        diag('uniforms: {} zero size', devW, devH);
                        return {};
                    }

                    const spacing = pixelSpacing(view.zoom, devH);
                    const rv = reprecision(view);
                    // Offset of the reference point from the view center, in
                    // complex units (the shader's uRefOffset contract).
                    const refOffsetX = toNumber(rv.cx) - toNumber(refCenter.cx);
                    const refOffsetY = toNumber(rv.cy) - toNumber(refCenter.cy);

                    const wantIters = effectiveMaxIter(lookRef.current.maxIter, view.zoom);
                    const uMaxIter = Math.min(wantIters, refLengthRef.current);
                    diag('uniforms: full set', {
                        uResolution: [devW, devH],
                        uSpacing: spacing,
                        uMaxIter,
                        uRefCount: refLengthRef.current,
                        zoom: view.zoom
                    });
                    return {
                        uResolution: [devW, devH],
                        uSpacing: spacing,
                        uRefOffset: [refOffsetX, refOffsetY],
                        // Never iterate past the stored reference orbit.
                        uMaxIter,
                        uRef: texture.texture,
                        uRefWidth: REF_TEX_WIDTH,
                        uRefCount: refLengthRef.current,
                        ...lookToParams(lookRef.current)
                    };
                }}
            >
                <Hud
                    zoom={hud.zoom}
                    cx={hud.cx}
                    cy={hud.cy}
                    maxIter={effectiveMaxIter(look.maxIter, hud.zoom)}
                    computing={hud.computing}
                />
                <ControlPanel
                    look={look}
                    onChange={setLook}
                    onReset={handleReset}
                />
            </GpuCanvas>
        </main>
    );
}

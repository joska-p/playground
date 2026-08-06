import { useCallback, useEffect, useRef, useState } from 'react';
import { MandelbrotRenderer, type LookParams } from '../lib/webgl/renderer';
import { computeReferenceAsync, toRequest } from '../lib/reference-worker';
import {
    type View,
    initialView,
    panByPixels,
    pixelSpacing,
    precisionForZoom,
    reprecision,
    zoomAtPixel
} from '../lib/mandelbrot/view';
import { ControlPanel, type LookState } from './control-panel';
import { Hud } from './hud';

const DEFAULT_LOOK: LookState = {
    // maxIter here is a *budget* multiplier (%); the effective iteration count
    // scales with zoom depth so deep zooms keep resolving border detail.
    maxIter: 100,
    colorFreq: 8,
    colorOffset: 0.62,
    lightAngle: 135,
    lightHeight: 1.35,
    glow: 0.35,
    chroma: 0.14,
    baseL: 0.62
};

/** Hard ceiling to protect the GPU/CPU from runaway iteration counts. */
const MAX_ITER_CAP = 60000;

/**
 * Effective iteration count for a zoom depth. Detail near the border needs
 * more iterations the deeper we go — roughly linear in zoom (log2 mag), scaled
 * by the user's budget slider (100 = default).
 */
export function effectiveMaxIter(budgetPct: number, zoom: number): number {
    const base = 256 + zoom * 96;
    return Math.min(MAX_ITER_CAP, Math.round((base * budgetPct) / 100));
}

function lookToParams(s: LookState): LookParams {
    return {
        colorFreq: s.colorFreq,
        colorOffset: s.colorOffset,
        lightAngle: (s.lightAngle * Math.PI) / 180,
        lightHeight: s.lightHeight,
        glow: s.glow,
        chroma: s.chroma,
        baseL: s.baseL
    };
}

export function MandelbrotViewer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<MandelbrotRenderer | null>(null);
    const viewRef = useRef<View>(initialView());
    const lookRef = useRef<LookState>(DEFAULT_LOOK);
    const dirtyRef = useRef(true);
    const rafRef = useRef(0);

    // Reference-orbit bookkeeping.
    const refCenterRef = useRef<View | null>(null);
    const refLengthRef = useRef(0);
    const computingRef = useRef(false);
    const refTokenRef = useRef(0);

    const [look, setLook] = useState<LookState>(DEFAULT_LOOK);
    const [error, setError] = useState<string | null>(null);
    const [hud, setHud] = useState({ zoom: 0, cx: -0.6, cy: 0, computing: false });

    // Keep refs in sync with the look state driven by the panel.
    useEffect(() => {
        lookRef.current = look;
        dirtyRef.current = true;
    }, [look]);

    const requestReference = useCallback(async (view: View) => {
        if (computingRef.current) return;
        computingRef.current = true;
        const token = ++refTokenRef.current;
        setHud((h) => ({ ...h, computing: true }));

        try {
            const withP = reprecision(view);
            const iters = effectiveMaxIter(lookRef.current.maxIter, view.zoom);
            const req = toRequest(withP.cx, withP.cy, iters);
            const orbit = await computeReferenceAsync(req);
            if (token !== refTokenRef.current) return; // superseded
            const renderer = rendererRef.current;
            if (renderer) {
                renderer.setReference(orbit.data, orbit.length);
                refCenterRef.current = withP;
                refLengthRef.current = orbit.length;
                dirtyRef.current = true;
            }
        } catch (e) {
            console.log('[v0] reference compute failed:', (e as Error).message);
        } finally {
            computingRef.current = false;
            setHud((h) => ({ ...h, computing: false }));
        }
    }, []);

    // Initialize WebGL.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let renderer: MandelbrotRenderer;
        try {
            renderer = new MandelbrotRenderer(canvas);
        } catch (e) {
            setError((e as Error).message);
            return;
        }
        rendererRef.current = renderer;

        requestReference(viewRef.current);

        const loop = () => {
            rafRef.current = requestAnimationFrame(loop);
            const r = rendererRef.current;
            const refCenter = refCenterRef.current;
            if (!r || !refCenter || !dirtyRef.current) return;
            dirtyRef.current = false;

            const view = viewRef.current;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = Math.floor(canvas.clientWidth * dpr);
            const h = Math.floor(canvas.clientHeight * dpr);
            r.resize(w, h);

            const spacing = pixelSpacing(view.zoom, h);

            // Offset of the reference point from the current center, in pixels.
            // Both share precision; convert delta to float pixel space.
            const prec = precisionForZoom(view.zoom);
            const dx = toNum(reprecision(view).cx, prec) - toNum(refCenter.cx, prec);
            const dy = toNum(reprecision(view).cy, prec) - toNum(refCenter.cy, prec);
            const refOffsetX = dx / spacing;
            const refOffsetY = dy / spacing;

            const wantIters = effectiveMaxIter(lookRef.current.maxIter, view.zoom);
            r.render({
                spacing,
                refOffsetX,
                refOffsetY,
                // Never iterate past the stored reference orbit.
                maxIter: Math.min(wantIters, refLengthRef.current),
                ...lookToParams(lookRef.current)
            });
        };
        rafRef.current = requestAnimationFrame(loop);

        const onResize = () => {
            dirtyRef.current = true;
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            rendererRef.current = null;
        };
    }, [requestReference]);

    // Pointer + wheel input.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let dragging = false;
        let lastX = 0;
        let lastY = 0;
        const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

        const maybeRecompute = () => {
            // Recompute reference if we've panned/zoomed far from the current ref.
            const view = viewRef.current;
            const ref = refCenterRef.current;
            if (!ref) return;
            const h = canvas.clientHeight * dpr();
            const spacing = pixelSpacing(view.zoom, h);
            const prec = precisionForZoom(view.zoom);
            const dxPx = (toNum(reprecision(view).cx, prec) - toNum(ref.cx, prec)) / spacing;
            const dyPx = (toNum(reprecision(view).cy, prec) - toNum(ref.cy, prec)) / spacing;
            const distPx = Math.hypot(dxPx, dyPx);
            const zoomDrift = Math.abs(view.zoom - ref.zoom);
            // Recompute if the depth now demands substantially more iterations than
            // the current reference orbit provides (deep zoom keeps resolving).
            const wantIters = effectiveMaxIter(lookRef.current.maxIter, view.zoom);
            const needMoreIters = wantIters > refLengthRef.current * 1.3;
            if (distPx > canvas.clientHeight * 0.35 || zoomDrift > 2 || needMoreIters) {
                requestReference(view);
            }
        };

        const onDown = (e: PointerEvent) => {
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            canvas.setPointerCapture(e.pointerId);
        };
        const onMove = (e: PointerEvent) => {
            if (!dragging) return;
            const d = dpr();
            const h = canvas.clientHeight * d;
            viewRef.current = panByPixels(
                viewRef.current,
                (e.clientX - lastX) * d,
                (e.clientY - lastY) * d,
                h
            );
            lastX = e.clientX;
            lastY = e.clientY;
            dirtyRef.current = true;
            updateHud();
        };
        const onUp = (e: PointerEvent) => {
            dragging = false;
            canvas.releasePointerCapture(e.pointerId);
            maybeRecompute();
        };
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const d = dpr();
            const px = (e.clientX - rect.left) * d;
            const py = (e.clientY - rect.top) * d;
            const w = canvas.clientWidth * d;
            const h = canvas.clientHeight * d;
            const dZoom = -e.deltaY * 0.0025;
            viewRef.current = zoomAtPixel(viewRef.current, dZoom, px, py, w, h);
            dirtyRef.current = true;
            updateHud();
            maybeRecompute();
        };

        canvas.addEventListener('pointerdown', onDown);
        canvas.addEventListener('pointermove', onMove);
        canvas.addEventListener('pointerup', onUp);
        canvas.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            canvas.removeEventListener('pointerdown', onDown);
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerup', onUp);
            canvas.removeEventListener('wheel', onWheel);
        };
    }, [requestReference]);

    const updateHud = useCallback(() => {
        const v = viewRef.current;
        const prec = precisionForZoom(v.zoom);
        setHud((h) => ({
            ...h,
            zoom: v.zoom,
            cx: toNum(reprecision(v).cx, prec),
            cy: toNum(reprecision(v).cy, prec)
        }));
    }, []);

    const handleReset = useCallback(() => {
        viewRef.current = initialView();
        dirtyRef.current = true;
        updateHud();
        requestReference(viewRef.current);
    }, [requestReference, updateHud]);

    // Recompute reference when maxIter changes (orbit length depends on it).
    useEffect(() => {
        requestReference(viewRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [look.maxIter]);

    if (error) {
        return (
            <div className="flex h-dvh w-full items-center justify-center bg-background p-8">
                <div className="max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground">
                    <h2 className="mb-2 text-lg font-semibold text-balance">WebGL2 unavailable</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {error} This visualizer needs WebGL2 with float-texture support. Try a
                        recent version of Chrome, Firefox, or Safari on a device with GPU
                        acceleration enabled.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="relative h-dvh w-full overflow-hidden bg-background">
            <canvas
                ref={canvasRef}
                className="h-full w-full touch-none"
                style={{ cursor: 'grab' }}
                aria-label="Interactive Mandelbrot set visualization. Drag to pan, scroll to zoom."
            />
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
        </main>
    );
}

// Local helper to read a BigFloat as a float at a target precision.
function toNum(a: { m: bigint; prec: number }, prec: number): number {
    // Reuse fromNumber/toNumber semantics without importing toNumber twice.
    const neg = a.m < BigInt(0);
    const m = neg ? -a.m : a.m;
    const bits = m.toString(2).length;
    const drop = Math.max(0, bits - 53);
    const top = Number(m >> BigInt(drop));
    const value = top * 2 ** (drop - a.prec);
    return neg ? -value : value;
}

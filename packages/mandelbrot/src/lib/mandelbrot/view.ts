/**
 * View state + camera math for the Mandelbrot viewer.
 *
 * The center is stored in arbitrary precision (BigFloat) so it never loses
 * detail as we zoom. `zoom` is the base-2 log of linear magnification, i.e.
 * magnification = 2^zoom. Pixel spacing (complex units per device pixel) is
 * derived from zoom and shrinks exponentially with depth.
 */

import { type BigFloat, add, fromNumber, withPrec } from '../big-float';

/** Complex-plane height shown at zoom 0. Classic full view is ~3 units tall. */
export const BASE_SPAN_Y = 3.0;

export type View = {
    cx: BigFloat;
    cy: BigFloat;
    /** log2 of linear magnification. */
    zoom: number;
};

/** Fractional bits to keep on the center for a given zoom depth. */
export function precisionForZoom(zoom: number): number {
    return Math.max(64, Math.ceil(zoom) + 52);
}

/** Complex units per device pixel at the current zoom + canvas height. */
export function pixelSpacing(zoom: number, heightPx: number): number {
    return (BASE_SPAN_Y * Math.pow(2, -zoom)) / Math.max(1, heightPx);
}

export function initialView(): View {
    const prec = precisionForZoom(0);
    return {
        // Center a touch left so the whole set is framed nicely.
        cx: fromNumber(-0.6, prec),
        cy: fromNumber(0, prec),
        zoom: 0
    };
}

/** Ensure both coordinates carry enough precision for the current zoom. */
export function reprecision(view: View): View {
    const prec = precisionForZoom(view.zoom);
    if (view.cx.prec === prec) return view;
    return {
        cx: withPrec(view.cx, prec),
        cy: withPrec(view.cy, prec),
        zoom: view.zoom
    };
}

/** Pan by a device-pixel delta (drag). Moves the center opposite the drag. */
export function panByPixels(view: View, dxPx: number, dyPx: number, heightPx: number): View {
    const s = pixelSpacing(view.zoom, heightPx);
    const prec = precisionForZoom(view.zoom);
    return {
        cx: add(view.cx, fromNumber(-dxPx * s, prec)),
        cy: add(view.cy, fromNumber(dyPx * s, prec)),
        zoom: view.zoom
    };
}

/**
 * Zoom by `dZoom` (in log2 magnification) about a screen anchor, keeping the
 * complex point under that anchor fixed.
 *
 * newCenter = center + offset * (1 - 2^-dZoom)
 */
export function zoomAtPixel(
    view: View,
    dZoom: number,
    anchorPx: number,
    anchorPy: number,
    widthPx: number,
    heightPx: number
): View {
    const s = pixelSpacing(view.zoom, heightPx);
    const offX = (anchorPx - widthPx / 2) * s;
    const offY = -(anchorPy - heightPx / 2) * s;
    const k = 1 - Math.pow(2, -dZoom);

    const newZoom = Math.max(0, view.zoom + dZoom);
    const prec = precisionForZoom(newZoom);

    return reprecision({
        cx: add(withPrec(view.cx, prec), fromNumber(offX * k, prec)),
        cy: add(withPrec(view.cy, prec), fromNumber(offY * k, prec)),
        zoom: newZoom
    });
}

/** Human-readable magnification, e.g. "1.0e6x". */
export function formatMagnification(zoom: number): string {
    const log10 = (zoom * Math.LN2) / Math.LN10;
    if (log10 < 3) {
        return `${Math.pow(2, zoom).toFixed(1)}x`;
    }
    const exp = Math.floor(log10);
    const mant = Math.pow(10, log10 - exp);
    return `${mant.toFixed(2)}e${String(exp)}x`;
}

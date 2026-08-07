import type { Signal } from '../core/types';
import type { Viz } from './types';

type PolylineOptions = {
    /** How many terms to show */
    maxTerms?: number;
    /** Vertical scale (world units per sequence value) */
    yScale?: number;
    /** Horizontal spacing between terms */
    xSpacing?: number;
    color?: string;
    pointRadius?: number;
    lineWidth?: number;
};

export function createPolylineViz(options: PolylineOptions = {}): Viz {
    const {
        maxTerms = 120,
        yScale = 1,
        xSpacing = 12,
        color = '#38bdf8',
        pointRadius = 3,
        lineWidth = 2
    } = options;

    return {
        id: 'polyline',
        name: 'Polyline',

        render(signal: Signal, runtime: { context: CanvasRenderingContext2D }) {
            // Materialize a window of the signal
            const terms = signal.take(maxTerms);
            if (terms.length === 0) return;

            // Simple mapping: x = index * spacing, y = value * yScale
            // We draw in world space; the camera will handle pan/zoom.
            const points = terms.map((value, i) => ({
                x: i * xSpacing,
                y: -value * yScale // negative so positive values go up
            }));

            // Clear is normally done by the host, but we keep the viz self-contained for now
            // runtime.clear?.(…) – depends on CPU vs GPU, so we leave it to the host

            // Draw the connecting line
            for (let i = 1; i < points.length; i++) {
                const a = points[i - 1] ?? { x: 0, y: 0 };
                const b = points[i] ?? { x: 0, y: 0 };
                // CPU style
                // we assume the host already imported drawLine, or we call a helper
                // For the first version we do it imperatively via the context
                const c = runtime.context;
                c.beginPath();
                c.moveTo(a.x, a.y);
                c.lineTo(b.x, b.y);
                c.strokeStyle = color;
                c.lineWidth = lineWidth;
                c.stroke();
                // GPU style (later)
                // runtime.drawLine?.(a, b, { stroke: color, lineWidth });
            }

            // Draw the points
            for (const p of points) {
                const c = runtime.context;
                c.beginPath();
                c.arc(p.x, p.y, pointRadius, 0, Math.PI * 2);
                c.fillStyle = color;
                c.fill();
            }
            // runtime.drawCircle?.(p, pointRadius, { fill: color });
        }
    };
}

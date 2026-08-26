import { createCssColor, createPositiveNumber } from '@repo/glaze/core/types';
import type { Viz } from './types';
import type { Signal } from '../core/types';
import type { CpuSurface } from '@repo/glaze/cpu/CpuSurface';

type PolylineOptions = {
    maxTerms?: number;
    yScale?: number;
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

        render(signal: Signal, surface: CpuSurface) {
            const terms = signal.take(maxTerms);

            if (terms.length === 0) return;

            const points = terms.map((value, i) => ({
                x: i * xSpacing,
                y: -value * yScale // negative so positive values go up
            }));

            for (let i = 1; i < points.length; i++) {
                const a = points[i - 1] ?? { x: 0, y: 0 };
                const b = points[i] ?? { x: 0, y: 0 };

                surface.line(
                    a.x,
                    a.y,
                    b.x,
                    b.y,
                    createCssColor(color),
                    createPositiveNumber(lineWidth)
                );
            }

            for (const p of points) {
                surface.circle(p.x, p.y, createPositiveNumber(pointRadius), createCssColor(color));
            }
        }
    };
}

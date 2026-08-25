import { createCssColor, createFontSize, createPositiveNumber } from '../../../core/types';
import { CpuCanvas } from '../../../react/CpuCanvas';

import type { Point2D } from '../../../core/Camera';
import type { CpuDraw } from '../../../cpu/CpuSurface';

const MINOR = 20;
const MAJOR = 100;
const MINOR_CULL = 12;

const range = (start: number, end: number, step: number): number[] => {
    const values: number[] = [];

    for (let value = Math.floor(start / step) * step; value <= end; value += step) {
        values.push(value);
    }

    return values;
};

const bounds = (surface: {
    width: number;
    height: number;
    screenToWorld(point: Point2D): Point2D;
}): { min: Point2D; max: Point2D } => ({
    min: surface.screenToWorld({ x: 0, y: 0 }),
    max: surface.screenToWorld({ x: surface.width, y: surface.height })
});

export function GraphPaper() {
    const onFrame: CpuDraw = (surface) => {
        const { min, max } = bounds(surface);

        surface.clear(createCssColor('#0a0d12'));

        const minorCulled = (MAJOR / MINOR) * surface.camera.zoom < MINOR_CULL;
        const step = minorCulled ? MAJOR : MINOR;

        for (const x of range(min.x, max.x, step)) {
            const major = step === MAJOR || Math.round(x / MAJOR) === x / MAJOR;

            surface.line(
                x,
                min.y,
                x,
                max.y,
                createCssColor(major ? '#1f2937' : '#131a24'),
                createPositiveNumber(major ? 1.5 : 1)
            );
        }

        for (const y of range(min.y, max.y, step)) {
            const major = step === MAJOR || Math.round(y / MAJOR) === y / MAJOR;

            surface.line(
                min.x,
                y,
                max.x,
                y,
                createCssColor(major ? '#1f2937' : '#131a24'),
                createPositiveNumber(major ? 1.5 : 1)
            );
        }

        surface
            .line(0, min.y, 0, max.y, createCssColor('#f43f5e'), createPositiveNumber(2))
            .line(min.x, 0, max.x, 0, createCssColor('#38bdf8'), createPositiveNumber(2))
            .text('world origin', 6, -6, createCssColor('#64748b'), createFontSize(11))
            .text(
                `zoom ${surface.camera.zoom.toFixed(2)}×`,
                8,
                20,
                createCssColor('#475569'),
                createFontSize(11)
            );
    };

    return (
        <CpuCanvas
            onFrame={onFrame}
            initialCamera={{ zoom: 0.8 }}
            className="h-full w-full"
        />
    );
}

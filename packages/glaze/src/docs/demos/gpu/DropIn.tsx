import { useState } from 'react';

import { createCssColor, createFontSize, createPositiveNumber } from '../../../core/types';
import { CpuCanvas } from '../../../react/CpuCanvas';
import { GpuCanvas } from '../../../react/GpuCanvas';

import type { CssColor, FontSize, PositiveNumber } from '../../../core/types';
import type { CpuDraw } from '../../../cpu/CpuSurface';
import type { GpuDraw } from '../../../gpu/GpuSurface';

/**
 * Structural contract satisfied by both `CpuSurface` and `GpuSurface`, so one scene function drives
 * both runtimes.
 */
interface ShapeSurface {
    width: number;
    height: number;
    time: number;
    frameCount: number;
    circle(
        x: number,
        y: number,
        radius: PositiveNumber,
        fill?: CssColor,
        stroke?: CssColor,
        lineWidth?: PositiveNumber
    ): ShapeSurface;
    text(text: string, x: number, y: number, fill?: CssColor, fontSize?: FontSize): ShapeSurface;
}

const STAR_COLORS = [
    createCssColor('#38bdf8'),
    createCssColor('#a78bfa'),
    createCssColor('#f472b6'),
    createCssColor('#fbbf24'),
    createCssColor('#e2e8f0')
];

const colorAt = (index: number): CssColor =>
    STAR_COLORS[index % STAR_COLORS.length] ?? STAR_COLORS[0];

const fract = (value: number): number => value - Math.floor(value);

const hash = (index: number): number => fract(Math.sin(index * 127.1) * 43758.5453);

interface Star {
    sx: number;
    sy: number;
    radius: PositiveNumber;
    phase: number;
    drift: number;
    color: CssColor;
}

const makeStars = (count: number): Star[] =>
    Array.from({ length: count }, (_, i) => ({
        sx: hash(i * 3 + 1),
        sy: hash(i * 3 + 2),
        radius: createPositiveNumber(0.6 + hash(i * 3 + 3) * 1.8),
        phase: hash(i * 3 + 4) * Math.PI * 2,
        drift: 0.02 + hash(i * 3 + 5) * 0.05,
        color: colorAt(i)
    }));

const drawScene = (surface: ShapeSurface, stars: Star[]): void => {
    const twinkle = 0.6 + 0.4 * Math.sin(surface.time * 2);

    for (const star of stars) {
        const x = star.sx * surface.width;
        const y = ((star.sy + surface.time * star.drift) % 1) * surface.height;

        surface.circle(x, y, createPositiveNumber(star.radius * twinkle), star.color);
    }

    surface.text(
        `${String(stars.length)} circles · frame ${String(surface.frameCount)}`,
        12,
        20,
        createCssColor('#64748b'),
        createFontSize(11)
    );
};

type Runtime = 'cpu' | 'gpu';

export function DropIn() {
    const [runtime, setRuntime] = useState<Runtime>('cpu');
    const [count, setCount] = useState(6000);
    const stars = makeStars(count);

    const onCpuDraw: CpuDraw = (surface) => {
        surface.clear(createCssColor('#05070b'));
        drawScene(surface, stars);
    };

    const onGpuDraw: GpuDraw = (surface) => {
        surface.clear(createCssColor('#05080b'));
        drawScene(surface, stars);
    };

    return (
        <div className="flex h-full w-full flex-col gap-2">
            <div className="flex items-center gap-3 text-xs">
                <div className="flex overflow-hidden rounded-md border border-white/10">
                    {(['cpu', 'gpu'] as const).map((mode) => (
                        <button
                            key={mode}
                            type="button"
                            onClick={() => {
                                setRuntime(mode);
                            }}
                            className={`px-3 py-1 font-mono uppercase tracking-wide ${
                                runtime === mode
                                    ? 'bg-amber-300 text-black'
                                    : 'bg-transparent text-neutral-400 hover:text-neutral-200'
                            }`}
                        >
                            {mode === 'cpu' ? 'CpuCanvas' : 'GpuCanvas'}
                        </button>
                    ))}
                </div>
                <span className="font-mono text-neutral-500">
                    {runtime === 'cpu' ? 'Canvas2D' : 'WebGL2 batching'}
                </span>
                <div className="ml-auto flex items-center gap-2 font-mono text-neutral-500">
                    <input
                        type="range"
                        min={1000}
                        max={20000}
                        step={1000}
                        value={count}
                        onChange={(event) => {
                            setCount(Number(event.target.value));
                        }}
                        className="w-32 accent-amber-300"
                    />
                    <span className="w-16 text-right">{count.toLocaleString()} circles</span>
                </div>
            </div>
            <div className="relative min-h-0 flex-1">
                {runtime === 'cpu' ? (
                    <CpuCanvas
                        onFrame={onCpuDraw}
                        className="h-full w-full"
                    />
                ) : (
                    <GpuCanvas
                        onFrame={onGpuDraw}
                        className="h-full w-full"
                    />
                )}
            </div>
        </div>
    );
}

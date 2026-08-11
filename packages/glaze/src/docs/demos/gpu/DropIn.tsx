import { useMemo, useState } from 'react';
import type { CpuDraw } from '../../../cpu/CpuSurface';
import type { GpuDraw } from '../../../gpu/GpuSurface';
import { CpuCanvas } from '../../../react/CpuCanvas';
import { GpuCanvas } from '../../../react/GpuCanvas';

/**
 * The drawing surface contract the scene needs. Both CpuSurface and GpuSurface satisfy it
 * structurally, so one scene function drives both runtimes — the only difference is how each
 * clears.
 */
interface ShapeSurface {
    width: number;
    height: number;
    time: number;
    frameCount: number;
    circle(
        x: number,
        y: number,
        radius: number,
        fill?: string,
        stroke?: string,
        lineWidth?: number
    ): ShapeSurface;
    text(text: string, x: number, y: number, fill?: string, fontSize?: number): ShapeSurface;
}

const STAR_COLORS = ['#38bdf8', '#a78bfa', '#f472b6', '#fbbf24', '#e2e8f0'] as const;

const colorAt = (index: number): string =>
    STAR_COLORS[index % STAR_COLORS.length] ?? STAR_COLORS[0];

const fract = (value: number): number => value - Math.floor(value);

const hash = (index: number): number => fract(Math.sin(index * 127.1) * 43758.5453);

interface Star {
    sx: number;
    sy: number;
    radius: number;
    phase: number;
    drift: number;
    color: string;
}

const makeStars = (count: number): Star[] =>
    Array.from({ length: count }, (_, i) => ({
        sx: hash(i * 3 + 1),
        sy: hash(i * 3 + 2),
        radius: 0.6 + hash(i * 3 + 3) * 1.8,
        phase: hash(i * 3 + 4) * Math.PI * 2,
        drift: 0.02 + hash(i * 3 + 5) * 0.05,
        color: colorAt(i)
    }));

const drawScene = (surface: ShapeSurface, stars: Star[]): void => {
    const twinkle = 0.6 + 0.4 * Math.sin(surface.time * 2);
    for (const star of stars) {
        const x = star.sx * surface.width;
        const y = ((star.sy + surface.time * star.drift) % 1) * surface.height;
        surface.circle(x, y, star.radius * twinkle, star.color);
    }
    surface.text(
        `${String(stars.length)} circles · frame ${String(surface.frameCount)}`,
        12,
        20,
        '#64748b',
        11
    );
};

type Runtime = 'cpu' | 'gpu';

export function DropIn() {
    const [runtime, setRuntime] = useState<Runtime>('cpu');
    const [count, setCount] = useState(6000);
    const stars = useMemo(() => makeStars(count), [count]);

    const onCpuDraw: CpuDraw = (surface) => {
        surface.clear('#05070b');
        drawScene(surface, stars);
    };

    const onGpuDraw: GpuDraw = (surface) => {
        surface.clear(0.02, 0.03, 0.045, 1);
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
                        onDraw={onCpuDraw}
                        className="h-full w-full"
                    />
                ) : (
                    <GpuCanvas
                        onDraw={onGpuDraw}
                        className="h-full w-full"
                    />
                )}
            </div>
        </div>
    );
}

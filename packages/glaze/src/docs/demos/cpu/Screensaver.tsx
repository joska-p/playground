import { createCssColor, createFontSize, createPositiveNumber } from '../../../core/types';
import { CpuCanvas } from '../../../react/CpuCanvas';

import type { CssColor, PositiveNumber } from '../../../core/types';
import type { CpuDraw } from '../../../cpu/types';

const PARTICLE_COUNT = 120;
const GRAVITY = 260;
const TRAIL_COLOR = 'rgba(5, 7, 11, 0.06)' as CssColor;

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: PositiveNumber;
    color: CssColor;
}

const FILLS = ['#38bdf8', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'] as CssColor[];

const colorAt = (index: number): CssColor => FILLS[index % FILLS.length] ?? FILLS[0];

const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    x: 200 + (i % 5) * 130,
    y: -40 - i * 8,
    vx: (Math.random() - 0.5) * 60,
    vy: Math.random() * 40,
    radius: createPositiveNumber(2 + Math.random() * 4),
    color: colorAt(i)
}));

export function Screensaver() {
    const onFrame: CpuDraw = (surface) => {
        surface
            .rect(
                -surface.camera.x / surface.camera.zoom,
                -surface.camera.y / surface.camera.zoom,
                createPositiveNumber(surface.width / surface.camera.zoom),
                createPositiveNumber(surface.height / surface.camera.zoom),
                TRAIL_COLOR
            )
            .text(
                `frame ${String(surface.frameCount)} · time ${surface.time.toFixed(1)}s · dpr ${String(surface.dpr)}`,
                16,
                24,
                createCssColor('#475569'),
                createFontSize(11)
            );

        for (const particle of particles) {
            particle.vy += GRAVITY * surface.deltaTime;
            particle.x += particle.vx * surface.deltaTime;
            particle.y += particle.vy * surface.deltaTime;

            if (particle.y > surface.height) {
                particle.y = -10;
                particle.vy = -Math.abs(particle.vy) * 0.2;
            }

            if (particle.x < 0 || particle.x > surface.width) particle.vx *= -1;

            surface.circle(particle.x, particle.y, particle.radius, particle.color);
        }
    };

    return (
        <CpuCanvas
            onFrame={onFrame}
            canvasInteractions={{ pan: false, zoom: false }}
            className="h-full w-full"
        />
    );
}

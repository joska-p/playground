import { useRef } from 'react';

import { createCssColor, createFontSize, createPositiveNumber } from '../../../core/types';
import { GpuCanvas } from '../../../react/GpuCanvas';

import type { GpuDraw } from '../../../gpu/types';
import type { Program } from '../../../gpu/shader/Program';

const gridFragmentSource = /* glsl */ `
    precision highp float;
    in vec2 vUv;
    out vec4 out_color;

    uniform vec3 u_camera;
    uniform vec2 u_resolution;
    uniform float u_dpr;
    uniform float u_time;

    void main() {
        vec2 css = vUv * (u_resolution / u_dpr);
        vec2 world = (css - u_camera.xy) / u_camera.z;
        vec2 p = world / 48.0;

        vec2 cell = fract(p);
        vec2 id = floor(p);
        vec2 edge = abs(cell - 0.5);
        float line = 1.0 - smoothstep(0.44, 0.5, max(edge.x, edge.y));

        float hash = fract(sin(dot(id, vec2(12.9898, 78.233))) * 43758.5453);
        float glow = 0.3 + 0.7 * hash * (0.5 + 0.5 * sin(u_time * 3.0 + hash * 6.2831));

        float scan = 0.5 + 0.5 * sin(vUv.y * u_resolution.y * 0.2 - u_time * 4.0);

        vec3 bg = vec3(0.02, 0.03, 0.05);
        vec3 grid = vec3(0.15, 1.0, 0.7);
        out_color = vec4(mix(bg, grid, line * glow * (0.55 + 0.45 * scan)), 1.0);
    }
`;

const hull = 0.72;
const shield = 0.41;

export function CyberHud() {
    const programRef = useRef<Program | null>(null);

    const onFrame: GpuDraw = (surface) => {
        surface.clear(createCssColor('#000000'));

        let program = programRef.current;

        if (!program) {
            program = surface.createProgram(gridFragmentSource);
            programRef.current = program;
        }

        surface.renderProgram(program);

        const p = surface.pointer;

        surface
            .line(p.x - 18, p.y, p.x - 6, p.y, createCssColor('#22d3ee'), createPositiveNumber(2))
            .line(p.x + 6, p.y, p.x + 18, p.y, createCssColor('#22d3ee'), createPositiveNumber(2))
            .line(p.x, p.y - 18, p.x, p.y - 6, createCssColor('#22d3ee'), createPositiveNumber(2))
            .line(p.x, p.y + 6, p.x, p.y + 18, createCssColor('#22d3ee'), createPositiveNumber(2))
            .circle(
                p.x,
                p.y,
                createPositiveNumber(24),
                undefined,
                createCssColor('#22d3ee'),
                createPositiveNumber(1.5)
            );

        surface
            .rect(
                24,
                24,
                createPositiveNumber(220),
                createPositiveNumber(14),
                createCssColor('#1e293b')
            )
            .rect(
                26,
                26,
                createPositiveNumber(216 * hull),
                createPositiveNumber(10),
                createCssColor('#34d399')
            )
            .text('HULL', 26, 20, createCssColor('#34d399'), createFontSize(10))
            .rect(
                24,
                46,
                createPositiveNumber(220),
                createPositiveNumber(14),
                createCssColor('#1e293b')
            )
            .rect(
                26,
                48,
                createPositiveNumber(216 * shield),
                createPositiveNumber(10),
                createCssColor('#818cf8')
            )
            .text('SHIELD', 26, 42, createCssColor('#818cf8'), createFontSize(10))
            .text(
                `SECTOR ${String(Math.round(p.x / 48))}:${String(Math.round(p.y / 48))}`,
                p.x + 32,
                p.y - 24,
                createCssColor('#e2e8f0'),
                createFontSize(11)
            )
            .text(
                'drag to pan · scroll to zoom',
                26,
                306,
                createCssColor('#475569'),
                createFontSize(10)
            );
    };

    return (
        <GpuCanvas
            onFrame={onFrame}
            className="h-full w-full"
        />
    );
}

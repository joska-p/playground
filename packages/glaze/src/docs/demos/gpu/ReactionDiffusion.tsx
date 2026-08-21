import { useEffect, useRef } from 'react';

import { createStateBuffer, type StateBuffer } from '../../../gpu/StateBuffer';
import { GpuCanvas } from '../../../react/GpuCanvas';

import type { GpuDraw, GpuSurface } from '../../../gpu/GpuSurface';
import type { LiveInteractionEvent } from '../../../react/interactions';

const SIZE = 256;
const INJECT_RADIUS = 0.025;
const INJECT_AMOUNT = 0.9;

const simulateFragmentSource = /* glsl */ `
    precision highp float;
    in vec2 vUv;
    out vec4 out_color;

    uniform sampler2D u_state;
    uniform vec2 u_simSize;
    uniform vec2 u_mouse; // buffer-space UV of the pointer
    uniform float u_radius; // injection radius, in buffer UV
    uniform vec2 u_inject; // amount added to (u, v) inside the radius

    ivec2 wrap(ivec2 coord) {
        ivec2 size = ivec2(u_simSize);
        return (coord + size) % size;
    }

    vec2 sampleState(ivec2 coord) {
        return texelFetch(u_state, wrap(coord), 0).rg;
    }

    void main() {
        ivec2 coord = ivec2(gl_FragCoord.xy);
        vec2 center = sampleState(coord);
        vec2 north = sampleState(coord + ivec2(0, 1));
        vec2 south = sampleState(coord + ivec2(0, -1));
        vec2 east = sampleState(coord + ivec2(1, 0));
        vec2 west = sampleState(coord + ivec2(-1, 0));

        // Gray–Scott reaction–diffusion: uvv consumes u, feeds v, diffuses out.
        float du = 0.2097;
        float dv = 0.105;
        float f = 0.037;
        float k = 0.061;

        vec2 laplacian = north + south + east + west - 4.0 * center;
        float uvv = center.x * center.y * center.y;

        float nextU = center.x + (du * laplacian.x - uvv + f * (1.0 - center.x));
        float nextV = center.y + (dv * laplacian.y + uvv - (f + k) * center.y);

        float d = distance(vUv, u_mouse);
        nextV += u_inject.y * smoothstep(u_radius, 0.0, d);

        out_color = vec4(clamp(nextU, 0.0, 1.0), clamp(nextV, 0.0, 1.0), 0.0, 1.0);
    }
`;

const visualizeFragmentSource = /* glsl */ `
    precision highp float;
    in vec2 vUv;
    out vec4 out_color;

    uniform sampler2D u_state;
    uniform vec2 u_resolution;
    uniform float u_dpr;
    uniform vec3 u_camera;
    uniform float u_simSize;

    void main() {
        vec2 css = vUv * (u_resolution / u_dpr);
        vec2 world = (css - u_camera.xy) / u_camera.z;
        vec2 uv = fract(world / u_simSize);

        float v = texture(u_state, uv).g;
        float u = texture(u_state, uv).r;

        vec3 deep = vec3(0.02, 0.03, 0.05);
        vec3 mid = vec3(0.05, 0.55, 0.55);
        vec3 hot = vec3(0.75, 0.45, 0.9);
        vec3 color = mix(deep, mid, smoothstep(0.0, 0.35, v));
        color = mix(color, hot, smoothstep(0.35, 0.8, v));
        color = mix(color, deep, (1.0 - u) * 0.15);

        out_color = vec4(color, 1.0);
    }
`;

const mod = (value: number, size: number): number => ((value % size) + size) % size;

export function ReactionDiffusion() {
    const bufferRef = useRef<{ surface: GpuSurface; buffer: StateBuffer } | null>(null);
    const injecting = useRef(false);

    const ensureBuffer = (surface: GpuSurface): StateBuffer => {
        const entry = bufferRef.current;

        if (entry?.surface === surface) return entry.buffer;

        entry?.buffer.destroy();
        const buffer = createStateBuffer(surface.gl, SIZE, SIZE);

        buffer.addProgram('simulate', simulateFragmentSource);
        buffer.init(new Uint8Array(SIZE * SIZE).fill(255));
        bufferRef.current = { surface, buffer };

        return buffer;
    };

    useEffect(
        () => () => {
            bufferRef.current?.buffer.destroy();
            bufferRef.current = null;
        },
        []
    );

    const onStart = ({ nativeEvent }: LiveInteractionEvent<PointerEvent, GpuSurface>): void => {
        if (nativeEvent.button !== 0) return;

        injecting.current = true;
    };

    const onEnd = (): void => {
        injecting.current = false;
    };

    const onDraw: GpuDraw = (surface) => {
        const buffer = ensureBuffer(surface);

        let uv = {
            x: mod(surface.pointer.x, SIZE) / SIZE,
            y: mod(surface.pointer.y, SIZE) / SIZE
        };
        let amount = injecting.current ? INJECT_AMOUNT : 0;

        // First ~4s: an automatic seeding brush writes the opening structure.
        if (surface.frameCount < 240) {
            const t = surface.frameCount / 60;

            uv = {
                x: 0.25 + 0.2 * Math.sin(t * 0.6),
                y: 0.25 + 0.3 * Math.sin(t * 0.9 + 2.0)
            };
            amount = INJECT_AMOUNT;
        }

        buffer.useProgram('simulate');
        buffer.setUniforms({
            u_simSize: [SIZE, SIZE],
            u_mouse: [uv.x, uv.y],
            u_radius: INJECT_RADIUS,
            u_inject: [0, amount]
        });
        buffer.step();
    };

    const uniforms = (surface: GpuSurface) => ({
        u_state: ensureBuffer(surface).getTexture(),
        u_simSize: SIZE
    });

    return (
        <GpuCanvas
            fragmentShader={visualizeFragmentSource}
            uniforms={uniforms}
            onDraw={onDraw}
            canvasInteractions={{ onStart, onEnd }}
            className="h-full w-full"
        />
    );
}

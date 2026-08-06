import { useEffect, useState } from 'react';
import type { GpuRuntime, GpuFrameContext } from '@repo/glaze/gpu/createGpuRuntime';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import { readGpuPixel } from '../proof/sample';
import { stashProof, type Sample } from '../proof/types';

const plasmaFragmentSource = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 out_color;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 p = (vUv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  float d = length(p);
  float angle = atan(p.y, p.x);
  float wave = 0.5 + 0.5 * sin(d * 5.0 - u_time * 4.0 + angle * 2.0);
  vec3 color = mix(vec3(0.08, 0.05, 0.16), vec3(1.0, 0.35, 0.18), wave);
  out_color = vec4(color, 1.0);
}
`.trim();

const SAMPLE_POINTS = [
        { x: 150, y: 150 },
        { x: 250, y: 80 },
        { x: 320, y: 200 }
] as const;

export function ProgramGpu() {
        const [runtime, setRuntime] = useState<GpuRuntime | null>(null);

        useEffect(() => {
                if (!runtime) return;
                const sample = (ctx: GpuFrameContext): Record<string, Sample> => {
                        const result: Record<string, Sample> = {};
                        for (const [index, point] of SAMPLE_POINTS.entries()) {
                                result[`p${String(index)}`] = readGpuPixel(
                                        runtime.gl,
                                        ctx.height,
                                        ctx.dpr,
                                        point.x,
                                        point.y
                                );
                        }
                        return result;
                };
                let frameA: Record<string, Sample> | null = null;
                return runtime.subscribe((ctx) => {
                        if (ctx.frameCount === 30) {
                                frameA = sample(ctx);
                                stashProof('programGpu', {
                                        frameA,
                                        frameB: null,
                                        changed: false,
                                        maxDelta: 0
                                });
                        }
                        if (ctx.frameCount === 46 && frameA) {
                                const frameB = sample(ctx);
                                let maxDelta = 0;
                                for (const [index] of SAMPLE_POINTS.entries()) {
                                        const a = frameA[`p${String(index)}`] ?? [0, 0, 0, 0];
                                        const b = frameB[`p${String(index)}`] ?? [0, 0, 0, 0];
                                        const delta =
                                                Math.abs(a[0] - b[0]) +
                                                Math.abs(a[1] - b[1]) +
                                                Math.abs(a[2] - b[2]) +
                                                Math.abs(a[3] - b[3]);
                                        maxDelta = Math.max(maxDelta, delta);
                                }
                                stashProof('programGpu', {
                                        frameA,
                                        frameB,
                                        changed: maxDelta > 15,
                                        maxDelta
                                });
                        }
                });
        }, [runtime]);

        return (
                <div className="h-75 w-100">
                        <GpuCanvas
                                fragmentShader={plasmaFragmentSource}
                                onRuntime={setRuntime}
                                className="h-full w-full"
                        />
                </div>
        );
}

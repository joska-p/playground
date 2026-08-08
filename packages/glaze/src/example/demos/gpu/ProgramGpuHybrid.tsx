import { useEffect, useRef, useState } from 'react';
import { GpuCanvas } from '../../../react/GpuCanvas';
import type { GpuRuntime } from '../../../gpu/createGpuRuntime';
import type { UniformValue } from '../../../gpu/shader/compileProgram';
import { createStateBuffer, type StateBuffer } from '../../../gpu/createStateBuffer';

const GRID = 96;

const simFragmentSource = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform highp sampler2D u_state;
uniform vec2 u_gridSize;

ivec2 wrap(ivec2 c) {
  return ivec2(mod(vec2(c) + u_gridSize, u_gridSize));
}

int cellAt(ivec2 c) {
  return int(texelFetch(u_state, wrap(c), 0).r * 255.0 + 0.5);
}

void main() {
  ivec2 coord = ivec2(gl_FragCoord.xy);
  int alive = cellAt(coord);
  int n = 0;
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      if (dx == 0 && dy == 0) continue;
      n += cellAt(coord + ivec2(dx, dy));
    }
  }
  float next = 0.0;
  if (alive == 1 && (n == 2 || n == 3)) next = 1.0 / 255.0;
  else if (alive == 0 && n == 3) next = 1.0 / 255.0;
  fragColor = vec4(next, 0.0, 0.0, 1.0);
}
`.trim();

// Display shader samples the pass texture through the built-in pan/zoom camera.
const displayFragmentSource = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 out_color;

uniform sampler2D u_state;
uniform vec2 u_resolution;
uniform vec3 u_camera;
uniform float u_dpr;

void main() {
  vec2 pan = vec2(u_camera.x * u_dpr / u_resolution.x, 1.0 - u_camera.y * u_dpr / u_resolution.y);
  vec2 uv = (vUv - pan) / u_camera.z;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    out_color = vec4(0.02, 0.03, 0.05, 1.0);
    return;
  }
  float alive = texture(u_state, uv).r * 255.0;
  vec3 dead = vec3(0.05, 0.07, 0.12);
  vec3 live = vec3(0.96, 0.6, 0.22);
  out_color = vec4(mix(dead, live, alive), 1.0);
}
`.trim();

/** Mulberry32 seeded PRNG so the starting soup is reproducible. */
function mulberry32(seed: number): () => number {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function seedSoup(): Uint8Array {
    const cells = new Uint8Array(GRID * GRID);
    const random = mulberry32(0x1f0caffe);
    for (let i = 0; i < cells.length; i++) {
        cells[i] = random() < 0.18 ? 1 : 0;
    }
    return cells;
}

export function ProgramGpuHybrid() {
    const [runtime, setRuntime] = useState<GpuRuntime | null>(null);
    const bufferRef = useRef<StateBuffer | null>(null);

    useEffect(() => {
        if (!runtime) return;
        const buffer = createStateBuffer(runtime.gl, GRID, GRID);
        buffer.addProgram('sim', simFragmentSource);
        buffer.init(seedSoup());
        bufferRef.current = buffer;
        return () => {
            buffer.destroy();
            bufferRef.current = null;
        };
    }, [runtime]);

    return (
        <div className="h-75 w-100">
            <GpuCanvas
                fragmentShader={displayFragmentSource}
                onSurface={setRuntime}
                className="h-full w-full"
                uniforms={(): Record<string, UniformValue> => {
                    const buffer = bufferRef.current;
                    if (!buffer) return {};
                    // Advance the simulation, then hand the freshly written state to the display.
                    buffer.useProgram('sim');
                    buffer.step();
                    return { u_state: buffer.getTexture() };
                }}
            />
        </div>
    );
}

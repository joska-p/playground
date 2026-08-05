import { useEffect, useRef, useState } from 'react';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import type { GpuDoor } from '@repo/glaze/gpu/createGpuDoor';
import type { UniformValue } from '@repo/glaze/gpu/shader/compileProgram';
import { createGpuPass, type GpuPass } from '@repo/glaze/gpu/createGpuPass';

const GRID = 96;

// Conway's Game of Life stepping into a ping-pong texture pair.
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

// Display shader samples the pass texture through the built-in pan/zoom
// camera (`u_camera` is auto-set by glaze each frame).
const displayFragmentSource = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 out_color;

uniform sampler2D u_state;
uniform vec2 u_resolution;
uniform vec3 u_camera;
uniform float u_dpr;

void main() {
  vec2 pan = u_camera.xy * u_dpr / u_resolution;
  vec2 uv = (vUv - pan) / u_camera.z;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    out_color = vec4(0.02, 0.03, 0.05, 1.0);
    return;
  }
  float alive = texture(u_state, uv).r;
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

export function PassGpu() {
        const [door, setDoor] = useState<GpuDoor | null>(null);
        const passRef = useRef<GpuPass | null>(null);

        useEffect(() => {
                if (!door) return;
                const pass = createGpuPass(door.gl, GRID, GRID);
                pass.addProgram('sim', simFragmentSource);
                pass.init(seedSoup());
                passRef.current = pass;
                return () => {
                        pass.destroy();
                        passRef.current = null;
                };
        }, [door]);

        return (
                <div className="h-75 w-100">
                        <GpuCanvas
                                fragmentShader={displayFragmentSource}
                                onDoor={setDoor}
                                className="h-full w-full"
                                uniforms={(): Record<string, UniformValue> => {
                                        const pass = passRef.current;
                                        if (!pass) return {};
                                        // Advance the simulation, then hand the freshly written state to the display.
                                        pass.useProgram('sim');
                                        pass.step();
                                        return { u_state: pass.getTexture() };
                                }}
                        />
                </div>
        );
}

'use client';

import { useEffect, useRef } from 'react';

/**
 * EdgeFieldCanvas
 *
 * The same effect as EdgeField.tsx, but computed live on the GPU instead of
 * baked to an image. This is the version to reach for if you want to
 * tweak parameters in real time, animate it, or bring back cursor
 * interactivity — all three are nearly free here because the whole
 * pipeline runs per-pixel in a fragment shader instead of as multi-pass
 * SVG filter primitives.
 *
 * How each old feX primitive maps to this shader:
 *   feTurbulence            -> fbm() / valueNoise(), a hand-rolled value
 *                              noise (simplex would look slightly more
 *                              organic; value noise is easier to read if
 *                              you're learning from this)
 *   feComponentTransfer     -> the `floor(n * BANDS) / BANDS` line
 *     (discrete)               (posterizing the noise into flat bands)
 *   feConvolveMatrix        -> edgeDetect(), which samples banded() at the
 *     (Laplacian)               same 3x3 offsets as the old kernel — but
 *                              since there's no source texture, each "tap"
 *                              re-evaluates the noise function itself
 *   feColorMatrix           -> abs(sum) in edgeDetect() — same idea as
 *     (luminanceToAlpha)        turning edge brightness into alpha
 *   feFlood + feComposite   -> mixing u_colorCold / u_colorHot into the
 *                              final color based on the edge value
 *   feGaussianBlur + feMerge-> the second, wider-spaced edgeDetect() call
 *                              blended in as a cheap bloom approximation
 *
 * This assumes prefers-reduced-motion is handled at the mount site (don't
 * render <EdgeFieldCanvas /> at all if the user prefers reduced motion),
 * matching how EdgeField.tsx is gated elsewhere in the app.
 */

const VERTEX_SRC = `#version 300 es
// Fullscreen triangle: 3 vertices that cover the whole viewport with no
// vertex buffer needed, cheaper than the usual 2-triangle quad.
const vec2 POSITIONS[3] = vec2[3](
  vec2(-1.0, -1.0),
  vec2(3.0, -1.0),
  vec2(-1.0, 3.0)
);
void main() {
  gl_Position = vec4(POSITIONS[gl_VertexID], 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;      // pixel coords, origin top-left
uniform float u_seed;
uniform float u_scale;     // noise frequency, analogous to baseFrequency
uniform float u_bands;     // posterization steps
uniform vec3 u_colorCold;
uniform vec3 u_colorHot;
uniform float u_hotRadius; // px

out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// feTurbulence equivalent: 3 octaves, matching the original numOctaves={3}
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    value += amplitude * valueNoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// feComponentTransfer(discrete) equivalent
float banded(vec2 uv) {
  float n = fbm(uv * u_scale + u_seed);
  return floor(n * u_bands) / u_bands;
}

// feConvolveMatrix(Laplacian) + feColorMatrix(luminanceToAlpha) equivalent.
// spread controls how far apart the 9 taps are — small spread = thin crisp
// lines (the base pass), larger spread = a soft halo (the bloom pass).
float edgeDetect(vec2 uv, float spread) {
  vec2 texel = spread / u_resolution;
  float sum = 0.0;
  sum += banded(uv + texel * vec2(-1.0, -1.0));
  sum += banded(uv + texel * vec2(0.0, -1.0));
  sum += banded(uv + texel * vec2(1.0, -1.0));
  sum += banded(uv + texel * vec2(-1.0, 0.0));
  sum += banded(uv + texel * vec2(0.0, 0.0)) * -8.0;
  sum += banded(uv + texel * vec2(1.0, 0.0));
  sum += banded(uv + texel * vec2(-1.0, 1.0));
  sum += banded(uv + texel * vec2(0.0, 1.0));
  sum += banded(uv + texel * vec2(1.0, 1.0));
  return abs(sum);
}

void main() {
  vec2 fragPx = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  vec2 uv = fragPx / u_resolution;

  float sharp = edgeDetect(uv, 1.0);
  float bloom = edgeDetect(uv, 4.0);
  float edge = clamp(sharp + bloom * 0.6, 0.0, 1.0);

  float distToMouse = length(fragPx - u_mouse);
  float hot = 1.0 - smoothstep(0.0, u_hotRadius, distToMouse);

  vec3 color = mix(u_colorCold, u_colorHot, hot);
  fragColor = vec4(color, edge);
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext): WebGLProgram {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }
  return program;
}

// Colors as 0-1 RGB triples. Swap these for anything --glow-color resolves
// to if you want to read the CSS variable at runtime instead (see note in
// the effect below).
const COLOR_COLD: [number, number, number] = [0.86, 0.78, 0.35];
const COLOR_HOT: [number, number, number] = [0.55, 0.85, 0.62];

// Caps devicePixelRatio so retina/4K screens don't quietly 4x the per-pixel
// shader cost. 1.5 is a reasonable ceiling for a background effect.
const MAX_DPR = 1.5;

export function EdgeFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true
    });
    if (!gl) {
      console.warn('EdgeFieldCanvas: WebGL2 unavailable, skipping render.');
      return;
    }

    const program = createProgram(gl);
    gl.useProgram(program);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      seed: gl.getUniformLocation(program, 'u_seed'),
      scale: gl.getUniformLocation(program, 'u_scale'),
      bands: gl.getUniformLocation(program, 'u_bands'),
      colorCold: gl.getUniformLocation(program, 'u_colorCold'),
      colorHot: gl.getUniformLocation(program, 'u_colorHot'),
      hotRadius: gl.getUniformLocation(program, 'u_hotRadius')
    };

    gl.uniform3fv(uniforms.colorCold, COLOR_COLD);
    gl.uniform3fv(uniforms.colorHot, COLOR_HOT);
    gl.uniform1f(uniforms.seed, 11.0);
    gl.uniform1f(uniforms.scale, 6.0);
    gl.uniform1f(uniforms.bands, 8.0);
    gl.uniform1f(uniforms.hotRadius, 440.0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const mouse = { x: -9999, y: -9999 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        gl!.viewport(0, 0, width, height);
      }
    }
    resize();
    window.addEventListener('resize', resize);

    let rafId: number;
    const start = performance.now();
    function frame(now: number) {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      gl!.uniform2f(uniforms.resolution, canvas!.width, canvas!.height);
      gl!.uniform1f(uniforms.time, (now - start) / 1000);
      gl!.uniform2f(uniforms.mouse, mouse.x * dpr, mouse.y * dpr);

      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(rafId);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-screen w-screen"
      aria-hidden="true"
    />
  );
}

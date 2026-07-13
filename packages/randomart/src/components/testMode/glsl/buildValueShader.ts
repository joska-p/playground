import type { ExpressionNode, GrammarRule } from '@repo/randomart-engine/types';
import { colormapGLSL } from '../lib/colormap';
import { GLSL_ARGS } from '../lib/evalHelpers';

export const VALUE_VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/**
 * Wraps a rule's raw GLSL expression (rule.toGLSL) in a standalone fragment
 * shader that:
 *  - maps the [-1, 1] plane onto `p` / `x` / `y`, mirroring the CPU renderer
 *  - exposes an animated `t` uniform so the GPU preview can match `useT()`
 *  - reuses the exact same colormap as ValueCanvasCPU
 *
 * Throws if the rule doesn't implement toGLSL (e.g. some structural rules) -
 * callers should catch this and fall back to an error state.
 */
export function buildValueFragmentShader(rule: GrammarRule, node: ExpressionNode): string {
  const expression = rule.toGLSL(GLSL_ARGS, node);

  return `
precision highp float;
varying vec2 vUv;
uniform float uT;
${colormapGLSL()}

float random2d(vec2 co) {
  float dot_ = dot(co, vec2(12.9898, 78.233));
  return fract(sin(dot_) * 43758.5453);
}

float hash1(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

float smoothNoise(float t) {
  float i = floor(t);
  float f = fract(t);
  float u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(hash1(i), hash1(i + 1.0), u);
}

vec2 smoothNoise2(float t) {
  return vec2(smoothNoise(t), smoothNoise(t + 31.71));
}

float pseudoRecaman(vec2 coords) {
  float d = length(coords);
  // Separate the step into a continuous float, a floor, and a fractional remainder
  float continuousStep = clamp(d * 15.0, 1.0, 15.0);
  int lowStep = int(floor(continuousStep));
  float stepFract = fract(continuousStep);

  float val = 0.0;
  float nextVal = 0.0;

  // Single loop to gather both current and next step values
  for(int i = 1; i < 16; i++) {
    // Calculate the sequence logic up to our current floor step
    if (i <= lowStep + 1) {
      float flip = fract(sin(val * 12.9898) * 43758.5453);
      float nextFlipped = (flip > 0.5 && (val - float(i)) > 0.0) ? (val - float(i)) : (val + float(i));

      if (i <= lowStep) {
        val = nextFlipped;
      }
      if (i == lowStep + 1) {
        nextVal = nextFlipped;
      }
    }
  }

  // Smoothly blend across the step boundary using the fraction
  float finalVal = mix(val, nextVal, stepFract);
  return fract(finalVal * 0.2);
}

float bandedNoise(vec2 coords) {
  float n = smoothNoise(coords.x * 3.0) * smoothNoise(coords.y * 3.0);
  float bands = 6.0; // The number of flat color posterization steps
  return floor(n * bands) / bands;
}

vec2 voronoiHash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float voronoiCells(vec2 p) {
  vec2 n = floor(p);
  vec2 f = fract(p);
  float md = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = voronoiHash(n + g);
      o = 0.5 + 0.5 * sin(u_time * 0.0 + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      md = min(md, d);
    }
  }
  return md * 2.0 - 1.0;
}

float fbmNoise(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * random2d(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value * 2.0 - 1.0;
}

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float x = p.x;
  float y = p.y;
  float t = uT;
  float value = ${expression};
  vec3 color = valueToColor(value);
  gl_FragColor = vec4(color, 1.0);
}
`;
}

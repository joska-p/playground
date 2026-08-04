import type { Point2D } from '../../core/coords/camera';
import type { DrawStyle } from '../../cpu/shapes/types';
import type { UniformValue } from '../shader/compileProgram';
import { colorArray } from './color';

export const lineFragmentSource = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 out_color;
uniform vec2 u_resolution;
uniform vec3 u_camera;
uniform float u_dpr;
uniform vec2 u_a;
uniform vec2 u_b;
uniform float u_width;
uniform vec4 u_color;

vec2 world() {
  vec2 frag = vUv * u_resolution;
  vec2 device = vec2(frag.x, u_resolution.y - frag.y);
  vec2 css = device / u_dpr;
  return (css - u_camera.xy) / u_camera.z;
}

float capsuleSDF(vec2 p) {
  vec2 ab = u_b - u_a;
  float t = clamp(dot(p - u_a, ab) / dot(ab, ab), 0.0, 1.0);
  return length(p - u_a - ab * t) - u_width * 0.5;
}

void main() {
  vec2 w = world();
  float sd = capsuleSDF(w);
  float aa = 2.0 / (u_camera.z * u_dpr);
  float a = 1.0 - smoothstep(-aa, aa, sd);
  out_color = vec4(u_color.rgb, u_color.a * a);
}
`.trim();

export function lineUniforms(a: Point2D, b: Point2D, style: DrawStyle): Record<string, UniformValue> {
  return {
    u_a: [a.x, a.y],
    u_b: [b.x, b.y],
    u_width: style.lineWidth ?? 1,
    u_color: colorArray(style.stroke ?? style.fill ?? '#000000')
  };
}

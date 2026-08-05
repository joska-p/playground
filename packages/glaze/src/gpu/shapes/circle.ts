import type { Point2D } from '../../core/coords/camera';
import type { DrawStyle } from '../../cpu/shapes/types';
import type { UniformValue } from '../shader/compileProgram';
import { colorArray } from './color';

export const circleFragmentSource = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 out_color;
uniform vec2 u_resolution;
uniform vec3 u_camera;
uniform float u_dpr;
uniform vec2 u_center;
uniform float u_radius;
uniform vec4 u_fill;
uniform vec4 u_stroke;
uniform float u_strokeWidth;

vec2 world() {
  vec2 frag = vUv * u_resolution;
  vec2 device = vec2(frag.x, u_resolution.y - frag.y);
  vec2 css = device / u_dpr;
  return (css - u_camera.xy) / u_camera.z;
}

float coverage(float sd) {
  float aa = 2.0 / (u_camera.z * u_dpr);
  return 1.0 - smoothstep(-aa, aa, sd);
}

void main() {
  vec2 w = world();
  float sd = length(w - u_center) - u_radius;
  float strokeHalf = u_strokeWidth * 0.5;
  float aFill = u_fill.a > 0.0 ? coverage(sd) : 0.0;
  float aStroke = u_stroke.a > 0.0 ? coverage(sd - strokeHalf) * (1.0 - coverage(sd + strokeHalf)) : 0.0;
  float A = aStroke + aFill * (1.0 - aStroke);
  vec3 C = u_stroke.rgb * aStroke + u_fill.rgb * aFill * (1.0 - aStroke);
  if (A > 0.0) C /= A;
  out_color = vec4(C, A);
}
`.trim();

export function circleUniforms(center: Point2D, radius: number, style: DrawStyle): Record<string, UniformValue> {
  return {
    u_center: [center.x, center.y],
    u_radius: radius,
    u_fill: style.fill === undefined ? [0, 0, 0, 0] : colorArray(style.fill),
    u_stroke: style.stroke === undefined ? [0, 0, 0, 0] : colorArray(style.stroke),
    u_strokeWidth: style.lineWidth ?? 1
  };
}

import { toGLSL } from '@repo/randomart-engine-next';
import type { ExprNode } from '@repo/randomart-engine-next/types';

export const VALUE_VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export function buildValueFragmentShader(node: ExprNode): string {
  const expression = toGLSL(node);

  return `
precision highp float;
varying vec2 vUv;
uniform float uT;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float x = p.x;
  float y = p.y;
  float t = uT;
  float value = ${expression};
  float gray = clamp(value, -1.0, 1.0) * 0.5 + 0.5;
  gl_FragColor = vec4(gray, gray, gray, 1.0);
}
`;
}

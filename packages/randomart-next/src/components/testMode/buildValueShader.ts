import { toGLSL } from '@repo/randomart-engine-next/tree';
import type { Node } from '@repo/randomart-engine-next/types';

export const VALUE_VERTEX_SHADER = /* glsl */ `
  #version 300 es
  precision highp float;

  in vec3 position;
  in vec2 uv;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  out vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`.trim();

export function buildValueFragmentShader(node: Node): string {
    const expression = toGLSL(node);

    return /* glsl */ `
        precision highp float;
        in vec2 vUv;
        uniform float u_time;
        out vec4 fragColor;

        void main() {
            vec2 p = vUv * 2.0 - 1.0;
            float x = p.x;
            float y = p.y;
            float value = ${expression};
            float gray = clamp(value, -1.0, 1.0) * 0.5 + 0.5;
            fragColor = vec4(gray, gray, gray, 1.0);
        }
    `;
}

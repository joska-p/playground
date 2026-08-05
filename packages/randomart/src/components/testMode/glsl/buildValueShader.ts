import { resolveGlslDeps } from '@repo/randomart-engine/compile/glslLibrary';
import type { ExpressionNode, GrammarRule } from '@repo/randomart-engine/types';
import { colormapGLSL } from '../lib/colormap';
import { GLSL_ARGS } from '../lib/evalHelpers';

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

export function buildValueFragmentShader(rule: GrammarRule, node: ExpressionNode): string {
        const expression = rule.toGLSL(GLSL_ARGS, node);
        const noiseFunctions = resolveGlslDeps(rule.noiseDependencies ?? []);

        return /* glsl */ `#version 300 es
precision highp float;

in vec2 vUv;
uniform float uT;
${colormapGLSL()}

${noiseFunctions}

out vec4 fragColor;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float x = p.x;
  float y = p.y;
  float t = uT;
  float value = ${expression};
  vec3 color = valueToColor(value);
  fragColor = vec4(color, 1.0);
}
`;
}

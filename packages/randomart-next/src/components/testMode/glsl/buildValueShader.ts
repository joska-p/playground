import { resolveGlslDeps } from '@repo/randomart-engine/compile/glslLibrary';
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
  const noiseFunctions = resolveGlslDeps(rule.noiseDependencies ?? []);

  return `
precision highp float;
varying vec2 vUv;
uniform float uT;
${colormapGLSL()}

${noiseFunctions}

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

import type { ExprNode } from '@repo/randomart-engine-next';
import { resolveGlslDeps, toGLSL } from '@repo/randomart-engine-next';
import { colormapGLSL } from '../lib/colormap';

export const VALUE_VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/** Map expression node types to their required GLSL library function IDs. */
const NOISE_DEPS_BY_NODE: Partial<Record<ExprNode['type'], string[]>> = {
  'recaman-pattern': ['pseudoRecaman']
};

/** Recursively collect noise library dependency IDs referenced by a tree. */
function collectNoiseDeps(node: ExprNode, deps: Set<string>): void {
  const nodeDeps = NOISE_DEPS_BY_NODE[node.type];
  if (nodeDeps) {
    for (const id of nodeDeps) {
      deps.add(id);
    }
  }
  if (node.children) {
    for (const child of node.children) {
      collectNoiseDeps(child, deps);
    }
  }
}

/**
 * Wraps a node's raw GLSL expression (toGLSL) in a standalone fragment
 * shader that:
 *  - maps the [-1, 1] plane onto `p` / `x` / `y`, mirroring the CPU renderer
 *  - exposes an animated `t` uniform so the GPU preview can match `useT()`
 *  - reuses the exact same colormap as ValueCanvasCPU
 *
 * Throws if the node can't be compiled to GLSL — callers should catch this
 * and fall back to an error state.
 */
export function buildValueFragmentShader(node: ExprNode): string {
  const expression = toGLSL(node);
  const noiseDeps = new Set<string>();
  collectNoiseDeps(node, noiseDeps);
  const noiseFunctions = resolveGlslDeps([...noiseDeps]);

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

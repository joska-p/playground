/**
 * GLSL fragment-shader compiler.
 *
 * Takes three expression trees (R, G, B channels) and optional animation
 * behaviors, resolves GLSL library dependencies, and produces a complete
 * #version 300 es fragment shader string ready for WebGL 2 use.
 */

import { getColorSpaceGlslFunction, wrapWithColorSpaceConversion } from './glsl-color-spaces.js';
import { resolveGlslDeps } from './glsl-library.js';
import { getOperator } from './grammar/operators/registry.js';
import { toGLSL } from './tree.js';
import type { AnimationBehavior, ApplyCodeContext, ColorSpaceId, ExprNode } from './types.js';

function buildShaderPreamble(noiseIds: string[], behaviors: AnimationBehavior[]): string {
  const noiseFunctions = resolveGlslDeps(noiseIds);
  const seen = new Set<string>();
  const behaviorFunctions = behaviors
    .filter((b) => {
      if (seen.has(b.id)) return false;
      seen.add(b.id);
      return true;
    })
    .map((b) => b.glslFunction ?? '')
    .filter((fn) => fn.length > 0)
    .join('\n');
  return (noiseFunctions ? noiseFunctions + '\n\n' : '') + behaviorFunctions;
}

/** Recursively collect noise library dependency IDs referenced by a tree. */
function collectNoiseDependencies(node: ExprNode, deps: Set<string>): void {
  const op = getOperator(node.type);
  if (op.noiseDependencies) {
    for (const id of op.noiseDependencies) {
      deps.add(id);
    }
  }
  if (node.children) {
    for (const child of node.children) {
      collectNoiseDependencies(child, deps);
    }
  }
}

function applyAnimationBehaviors(
  behaviors: AnimationBehavior[],
  behaviorType: AnimationBehavior['type']
): string {
  const ctx: ApplyCodeContext = {
    time: 'u_time',
    speed: 'u_animSpeed',
    spatial: 'p',
    color: 'color'
  };
  return behaviors
    .filter((b) => b.type === behaviorType)
    .map((b) => b.applyCode(ctx))
    .join('\n');
}

/**
 * Produces a single vec3(...) GLSL expression for all three color channels.
 *
 * Each tree is individually compiled via toGLSL(), producing a scalar
 * expression string that uses the animated 'p' coordinate variable.
 */
function compileColorExpression(treeR: ExprNode, treeG: ExprNode, treeB: ExprNode): string {
  return `vec3(${toGLSL(treeR)}, ${toGLSL(treeG)}, ${toGLSL(treeB)})`;
}

/**
 * Compiles three expression trees (R, G, B channels) + animation behaviors
 * into a complete GLSL fragment shader string.
 *
 * The shader expects the following uniforms:
 *  - u_time       (float)  elapsed time
 *  - u_animSpeed  (float)  animation speed multiplier
 *  - u_resolution (vec2)   viewport resolution in pixels
 *  - u_mouse      (vec2)   mouse position in pixels
 *
 * The vertex shader must supply v_texCoord (vec2) in [0, 1] range.
 *
 * When `colorSpace` is not `'srgb'`, the expression trees are treated as
 * coordinates in the specified perceptual color space (OKLCH, OKLab, or HSL)
 * and converted to sRGB before display.
 */
export function compileToShader(
  treeR: ExprNode,
  treeG: ExprNode,
  treeB: ExprNode,
  behaviors: AnimationBehavior[] = [],
  colorSpace: ColorSpaceId = 'srgb'
): string {
  const noiseDeps = new Set<string>();
  const colorExpr = compileColorExpression(treeR, treeG, treeB);
  const spatialCode = applyAnimationBehaviors(behaviors, 'spatial');
  const colorCode = applyAnimationBehaviors(behaviors, 'color');
  const colorSpaceGlsl = getColorSpaceGlslFunction(colorSpace);

  collectNoiseDependencies(treeR, noiseDeps);
  collectNoiseDependencies(treeG, noiseDeps);
  collectNoiseDependencies(treeB, noiseDeps);

  for (const b of behaviors) {
    for (const id of b.noiseDependencies ?? []) {
      noiseDeps.add(id);
    }
  }

  return `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_animSpeed;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

in vec2 v_texCoord;

out vec4 fragColor;

${buildShaderPreamble([...noiseDeps], behaviors)}
${colorSpaceGlsl ? colorSpaceGlsl + '\n' : ''}
void main() {
  vec2 p = v_texCoord * 2.0 - 1.0;
  p.y = -p.y;

  float t_time = u_time;
  float t_speed = u_animSpeed;
  ${spatialCode}

${wrapWithColorSpaceConversion(colorExpr, colorSpace)}

  ${colorCode}

  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
}

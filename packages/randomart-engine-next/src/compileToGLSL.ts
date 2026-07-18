/**
 * GLSL fragment-shader compiler.
 *
 * Takes three expression trees (R, G, B channels) and optional animation
 * behaviors, resolves GLSL library dependencies, and produces a complete
 * #version 300 es fragment shader string ready for WebGL 2 use.
 */

import { toGLSL } from './expression.js';
import { resolveGlslDeps } from './glsl-library.js';
import { getOperator } from './grammar/operators/registry.js';
import type { AnimationBehavior, ApplyCodeContext, ColorSpaceId, ExprNode } from './types.js';

function buildPreamble(noiseIds: string[], behaviors: AnimationBehavior[]): string {
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
function collectNoiseDeps(node: ExprNode, deps: Set<string>): void {
  const op = getOperator(node.type);
  if (op.noiseDependencies) {
    for (const id of op.noiseDependencies) {
      deps.add(id);
    }
  }
  if (node.children) {
    for (const child of node.children) {
      collectNoiseDeps(child, deps);
    }
  }
}

function applyBehaviors(
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

// ---------------------------------------------------------------------------
// Color-space conversion GLSL functions
// ---------------------------------------------------------------------------

const OKLCH_TO_SRGB_GLSL = `\
vec3 oklchToSrgb(vec3 oklch) {
  float L = oklch.x;
  float C = oklch.y;
  float h = oklch.z;
  float a = C * cos(h);
  float b = C * sin(h);
  float l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  float m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  float s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  float l = l_ * l_ * l_;
  float m = m_ * m_ * m_;
  float s = s_ * s_ * s_;
  vec3 linearRgb;
  linearRgb.r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  linearRgb.g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  linearRgb.b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  vec3 lo = linearRgb * 12.92;
  vec3 hi = 1.055 * pow(max(linearRgb, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;
  return clamp(mix(hi, lo, lessThanEqual(linearRgb, vec3(0.0031308))), 0.0, 1.0);
}`;

const OKLAB_TO_SRGB_GLSL = `\
vec3 oklabToSrgb(vec3 oklab) {
  float L = oklab.x;
  float a = oklab.y;
  float b = oklab.z;
  float l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  float m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  float s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  float l = l_ * l_ * l_;
  float m = m_ * m_ * m_;
  float s = s_ * s_ * s_;
  vec3 linearRgb;
  linearRgb.r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  linearRgb.g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  linearRgb.b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  vec3 lo = linearRgb * 12.92;
  vec3 hi = 1.055 * pow(max(linearRgb, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;
  return clamp(mix(hi, lo, lessThanEqual(linearRgb, vec3(0.0031308))), 0.0, 1.0);
}`;

const HSL_TO_SRGB_GLSL = `\
vec3 hslToSrgb(vec3 hsl) {
  float h = hsl.x / 360.0;
  float s = hsl.y / 100.0;
  float l = hsl.z / 100.0;
  vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}`;

const COLOR_SPACE_GLSL: Record<string, string> = {
  oklch: OKLCH_TO_SRGB_GLSL,
  oklab: OKLAB_TO_SRGB_GLSL,
  hsl: HSL_TO_SRGB_GLSL
};

/**
 * Generates the GLSL code that maps raw expression-tree outputs into the
 * target color space and converts back to sRGB.
 */
function colorSpaceWrap(rawExpr: string, colorSpace: ColorSpaceId): string {
  switch (colorSpace) {
    case 'oklch':
      return `\
  vec3 _cs_raw = ${rawExpr};
  float _L = clamp(_cs_raw.x * 0.5 + 0.5, 0.0, 1.0);
  float _C = abs(_cs_raw.y) * 0.4;
  float _H = (_cs_raw.z * 0.5 + 0.5) * 6.28318;
  vec3 color = oklchToSrgb(vec3(_L, _C, _H));`;
    case 'oklab':
      return `\
  vec3 _cs_raw = ${rawExpr};
  float _L = clamp(_cs_raw.x * 0.5 + 0.5, 0.0, 1.0);
  float _a = _cs_raw.y * 0.4;
  float _b = _cs_raw.z * 0.4;
  vec3 color = oklabToSrgb(vec3(_L, _a, _b));`;
    case 'hsl':
      return `\
  vec3 _cs_raw = ${rawExpr};
  float _H = (_cs_raw.x * 0.5 + 0.5) * 360.0;
  float _S = abs(_cs_raw.y) * 100.0;
  float _L = clamp(_cs_raw.z * 0.5 + 0.5, 0.0, 1.0) * 100.0;
  vec3 color = hslToSrgb(vec3(_H, _S, _L));`;
    default:
      return `  vec3 color = ${rawExpr};`;
  }
}

/**
 * Produces a single vec3(...) GLSL expression for all three color channels.
 *
 * Each tree is individually compiled via toGLSL(), producing a scalar
 * expression string that uses the animated 'p' coordinate variable.
 * Collects noise library IDs as a side-effect.
 */
function compileColorExpr(treeR: ExprNode, treeG: ExprNode, treeB: ExprNode): string {
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
 * and converted to sRGB before display. This fundamentally changes what the
 * same expression math produces visually.
 */
export function compileToGLSL(
  treeR: ExprNode,
  treeG: ExprNode,
  treeB: ExprNode,
  behaviors: AnimationBehavior[] = [],
  colorSpace: ColorSpaceId = 'srgb'
): string {
  const noiseDeps = new Set<string>();
  const colorExpr = compileColorExpr(treeR, treeG, treeB);
  const spatialCode = applyBehaviors(behaviors, 'spatial');
  const colorCode = applyBehaviors(behaviors, 'color');
  const colorSpaceFn = COLOR_SPACE_GLSL[colorSpace] ?? '';

  // Collect noise dependencies from expression trees
  collectNoiseDeps(treeR, noiseDeps);
  collectNoiseDeps(treeG, noiseDeps);
  collectNoiseDeps(treeB, noiseDeps);

  // Collect noise dependencies from active behaviors
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

${buildPreamble([...noiseDeps], behaviors)}
${colorSpaceFn ? colorSpaceFn + '\n' : ''}
void main() {
  vec2 p = v_texCoord * 2.0 - 1.0;
  p.y = -p.y;

  float t_time = u_time;
  float t_speed = u_animSpeed;
  ${spatialCode}

${colorSpaceWrap(colorExpr, colorSpace)}

  ${colorCode}

  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
}

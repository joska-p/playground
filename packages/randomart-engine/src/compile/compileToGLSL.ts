import { getRule } from '../grammar/registry';
import type { AnimationBehavior, ExpressionNode } from '../types';

// Pseudo-random / noise helpers available to every shader
const GLSL_NOISE_HELPERS = `
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
`;

function buildPreamble(behaviors: AnimationBehavior[]): string {
  const behaviorFunctions = behaviors.map((b) => b.glslFunction).join('\n');
  return GLSL_NOISE_HELPERS + '\n' + behaviorFunctions;
}

function applyBehaviors(behaviors: AnimationBehavior[], type: AnimationBehavior['type']): string {
  return behaviors
    .filter((b) => b.type === type)
    .map((b) => b.applyCode('u_time', 'u_animSpeed'))
    .join('\n');
}

// Recursively compiles an ExpressionNode into a GLSL expression string
function compileNode(node: ExpressionNode): string {
  if (node.ruleId === 'vec3') {
    const [r, g, b] = node.args.map(compileNode);
    return `vec3(${r}, ${g}, ${b})`;
  }

  const rule = getRule(node.ruleId);
  if (!rule) return '0.0';

  if (rule.id === 'constant' && node.constantValue !== undefined) {
    return node.constantValue.toFixed(10);
  }

  return rule.toGLSL(node.args.map(compileNode));
}

// Produces a single vec3(...) GLSL expression for all three color channels,
// regardless of whether the input is a vec3 node or three separate R/G/B trees.
function compileColorExpr(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode
): string {
  if (treeR.ruleId === 'vec3') {
    return compileNode(treeR);
  }
  return `vec3(${compileNode(treeR)}, ${compileNode(treeG)}, ${compileNode(treeB)})`;
}

// Compiles three expression trees (R, G, B channels) + animation behaviors
// into a complete GLSL fragment shader string.
export function compileToGLSL(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  behaviors: AnimationBehavior[]
): string {
  const colorExpr = compileColorExpr(treeR, treeG, treeB);
  const spatialCode = applyBehaviors(behaviors, 'spatial');
  const colorCode = applyBehaviors(behaviors, 'color');

  return `precision highp float;

uniform float u_time;
uniform float u_animSpeed;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

${buildPreamble(behaviors)}

void main() {
  // 1. Establish the clean, centered coordinate base p [-1.0, 1.0]
  vec2 p = v_texCoord * 2.0 - 1.0;
  p.y = -p.y; // Flip Y so up is positive standard Cartesian space

  // 2. Inject spatial animations (Modifies 'p' uniformly)
  float t_time = u_time;
  float t_speed = u_animSpeed;
  ${spatialCode}

  // 3. Evaluate the generative color nodes (reading the animated 'p')
  vec3 color = ${colorExpr};

  // 4. Inject color adjustments
  ${colorCode}

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
}

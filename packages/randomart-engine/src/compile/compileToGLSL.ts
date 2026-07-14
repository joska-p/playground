import { getRule, type RuleId } from '../grammar/registry';
import type { AnimationBehavior, ApplyCodeContext, ExpressionNode } from '../types';
import { resolveGlslDeps } from './glslLibrary';

function buildPreamble(noiseIds: string[], behaviors: AnimationBehavior[]): string {
  const noiseFunctions = resolveGlslDeps(noiseIds);
  const seen = new Set<string>();
  const behaviorFunctions = behaviors
    .filter((b) => {
      if (seen.has(b.id)) return false;
      seen.add(b.id);
      return true;
    })
    .map((b) => b.glslFunction)
    .join('\n');
  return (noiseFunctions ? noiseFunctions + '\n\n' : '') + behaviorFunctions;
}

function applyBehaviors(behaviors: AnimationBehavior[], type: AnimationBehavior['type']): string {
  const ctx: ApplyCodeContext = {
    time: 'u_time',
    speed: 'u_animSpeed',
    spatial: 'p',
    color: 'color'
  };
  return behaviors
    .filter((b) => b.type === type)
    .map((b) => b.applyCode(ctx))
    .join('\n');
}

// Recursively compiles an ExpressionNode into a GLSL expression string.
// Collects noise library dependencies as a side-effect.
function compileNode(node: ExpressionNode, deps: Set<string>): string {
  if (node.ruleId === 'vec3') {
    const args = node.args.map((a) => compileNode(a, deps));
    const r = args[0] ?? '0.0';
    const g = args[1] ?? '0.0';
    const b = args[2] ?? '0.0';
    return `vec3(${r}, ${g}, ${b})`;
  }

  const rule = getRule(node.ruleId as RuleId);
  if (!rule) return '0.0';

  if (rule.noiseDependencies) {
    for (const id of rule.noiseDependencies) {
      deps.add(id);
    }
  }

  if (rule.id === 'constant' && node.constantValue !== undefined) {
    return node.constantValue.toFixed(10);
  }

  return rule.toGLSL(node.args.map((a) => compileNode(a, deps)));
}

// Produces a single vec3(...) GLSL expression for all three color channels
function compileColorExpr(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  deps: Set<string>
): string {
  return `vec3(${compileNode(treeR, deps)}, ${compileNode(treeG, deps)}, ${compileNode(treeB, deps)})`;
}

// Compiles three expression trees (R, G, B channels) + animation behaviors
// into a complete GLSL fragment shader string.
export function compileToGLSL(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode,
  behaviors: AnimationBehavior[]
): string {
  const noiseDeps = new Set<string>();
  const colorExpr = compileColorExpr(treeR, treeG, treeB, noiseDeps);
  const spatialCode = applyBehaviors(behaviors, 'spatial');
  const colorCode = applyBehaviors(behaviors, 'color');

  // Collect noise dependencies from active behaviors
  for (const b of behaviors) {
    for (const id of b.noiseDependencies ?? []) {
      noiseDeps.add(id);
    }
  }

  // CRITICAL: #version 300 es MUST be on the very first line without leading whitespace!
  return `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_animSpeed;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// WebGL 2 syntax swaps 'varying' for 'in'
in vec2 v_texCoord;

// WebGL 2 syntax requires declaring an explicit output vec4 variable
out vec4 fragColor;

${buildPreamble([...noiseDeps], behaviors)}

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

  // WebGL 2 output assignment
  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
}

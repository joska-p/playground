import { getColorSpaceGlslFunction, wrapWithColorSpaceConversion } from './glsl-color-spaces.js';
import { resolveGlslDeps } from './glsl-library.js';
import { getOperator } from './grammar/operators/registry.js';
import { toGLSL } from './tree.js';
import type { ApplyCodeContext, Behavior, ColorSpaceId, Node } from './types.js';

function buildShaderPreamble(noiseIds: string[], behaviors: Behavior[]): string {
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

function collectNoiseDependencies(node: Node, deps: Set<string>): void {
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

function applyBehaviors(behaviors: Behavior[], behaviorType: Behavior['kind']): string {
  const ctx: ApplyCodeContext = {
    time: 'u_time',
    speed: 'u_animSpeed',
    spatial: 'p',
    color: 'color'
  };
  return behaviors
    .filter((b) => b.kind === behaviorType)
    .map((b) => b.applyCode(ctx))
    .join('\n');
}

function compileColorExpression(treeR: Node, treeG: Node, treeB: Node): string {
  return `vec3(${toGLSL(treeR)}, ${toGLSL(treeG)}, ${toGLSL(treeB)})`;
}

export function compileToShader(
  treeR: Node,
  treeG: Node,
  treeB: Node,
  behaviors: Behavior[] = [],
  colorSpace: ColorSpaceId = 'srgb'
): string {
  const noiseDeps = new Set<string>();
  const colorExpr = compileColorExpression(treeR, treeG, treeB);
  const spatialCode = applyBehaviors(behaviors, 'spatial');
  const colorCode = applyBehaviors(behaviors, 'color');
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

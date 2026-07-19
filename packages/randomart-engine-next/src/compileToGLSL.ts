import type { ApplyCodeContext, Behavior } from './behaviors/registry.js';
import type { ColorSpaceId } from './glsl-color-spaces.js';
import { getColorSpaceGlslFunction, wrapWithColorSpaceConversion } from './glsl-color-spaces.js';
import { resolveGlslDeps } from './glsl-library.js';
import { getOperator } from './grammar/operators/registry.js';
import { seededShuffle } from './prng.js';
import type { Node } from './tree.js';
import { toGLSL } from './tree.js';

type BuildShaderPreambleProps = {
  noiseIds: string[];
  behaviors: Behavior[];
};

function buildShaderPreamble({ noiseIds, behaviors }: BuildShaderPreambleProps): string {
  const noiseFunctions = resolveGlslDeps(noiseIds);
  const seen = new Set<string>();
  const behaviorFunctions = behaviors
    .filter((behavior) => {
      if (seen.has(behavior.id)) return false;
      seen.add(behavior.id);
      return true;
    })
    .map((behavior) => behavior.glslFunction ?? '')
    .filter((fn) => fn.length > 0)
    .join('\n');
  return (noiseFunctions ? noiseFunctions + '\n\n' : '') + behaviorFunctions;
}

export type CollectNoiseDependenciesProps = {
  node: Node;
  deps: Set<string>;
};

// TODO: see usage in compileToGLSL line ~71
function collectNoiseDependencies({ node, deps }: CollectNoiseDependenciesProps): void {
  const operator = getOperator(node.type);
  if (operator.noiseDependencies) {
    for (const id of operator.noiseDependencies) {
      deps.add(id);
    }
  }

  // Recursively inspect keys mapped inside the unified args dictionary
  for (const name of operator.argNames) {
    const child = node.args[name];
    if (child && typeof child !== 'number') {
      collectNoiseDependencies({ node: child, deps });
    }
  }
}

export type ApplyBehaviorsProps = {
  behaviors: Behavior[];
  behaviorType: Behavior['kind'];
};

function applyBehaviors({ behaviors, behaviorType }: ApplyBehaviorsProps): string {
  const ctx: ApplyCodeContext = {
    time: 'u_time',
    speed: 'u_animSpeed',
    spatial: 'p',
    color: 'color'
  };
  return behaviors
    .filter((behavior) => behavior.kind === behaviorType)
    .map((behavior) => behavior.applyCode(ctx))
    .join('\n');
}

export type compileColorExpressionProps = {
  treeR: Node;
  treeG: Node;
  treeB: Node;
};

function compileColorExpression({ treeR, treeG, treeB }: compileColorExpressionProps): string {
  // Pass down the target coordinate variable variable name string ('p')
  return `vec3(${toGLSL(treeR, 'p')}, ${toGLSL(treeG, 'p')}, ${toGLSL(treeB, 'p')})`;
}

export type CompileToShaderProps = {
  seedText: string;
  treeR: Node;
  treeG: Node;
  treeB: Node;
  behaviors?: Behavior[] | undefined;
  colorSpace?: ColorSpaceId;
};

export function compileToShader({
  seedText,
  treeR,
  treeG,
  treeB,
  behaviors = [],
  colorSpace = 'srgb'
}: CompileToShaderProps): string {
  const deterministicBehaviors = seededShuffle(behaviors, `${seedText}_behaviors`);
  const noiseDeps = new Set<string>();
  const colorExpr = compileColorExpression({ treeR, treeG, treeB });
  const spatialCode = applyBehaviors({ behaviors, behaviorType: 'spatial' });
  const colorCode = applyBehaviors({ behaviors, behaviorType: 'color' });
  const colorSpaceGlsl = getColorSpaceGlslFunction(colorSpace);

  // TODO: make collectNoiseDependencies return a set of noise dependencies instead of mutating it
  collectNoiseDependencies({ node: treeR, deps: noiseDeps });
  collectNoiseDependencies({ node: treeG, deps: noiseDeps });
  collectNoiseDependencies({ node: treeB, deps: noiseDeps });

  for (const behavior of deterministicBehaviors) {
    for (const id of behavior.noiseDependencies ?? []) {
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

${buildShaderPreamble({ noiseIds: [...noiseDeps], behaviors })}
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

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
        .map((b) => b.glslFunction ?? '')
        .filter((fn) => fn.length > 0)
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

function compileColorExpr(
    treeR: ExpressionNode,
    treeG: ExpressionNode,
    treeB: ExpressionNode,
    deps: Set<string>
): string {
    return `vec3(${compileNode(treeR, deps)}, ${compileNode(treeG, deps)}, ${compileNode(treeB, deps)})`;
}

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

    for (const b of behaviors) {
        for (const id of b.noiseDependencies ?? []) {
            noiseDeps.add(id);
        }
    }

    // GLSL requires the version directive on the very first line, no leading whitespace
    return `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_animSpeed;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// WebGL2 renamed 'varying' to 'in'
in vec2 v_texCoord;

// WebGL2 requires an explicit output variable instead of the implicit gl_FragColor
out vec4 fragColor;

${buildPreamble([...noiseDeps], behaviors)}

void main() {
  vec2 p = v_texCoord * 2.0 - 1.0;
  p.y = -p.y; // Flip Y so up is positive

  float t_time = u_time;
  float t_speed = u_animSpeed;
  ${spatialCode}

  vec3 color = ${colorExpr};

  ${colorCode}

  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
}

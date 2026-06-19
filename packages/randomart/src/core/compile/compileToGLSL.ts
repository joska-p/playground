import { getRule } from '../grammar/registry';
import type { ExpressionNode } from '../types';

export const GLSL_PREAMBLE = `
float random2d(vec2 co) {
  float dot_ = dot(co, vec2(12.9898, 78.233));
  return fract(sin(dot_) * 43758.5453);
}
`;

function compileNode(node: ExpressionNode): string {
  const rule = getRule(node.ruleId);
  if (!rule) return '0.0';

  const compiledArgs = node.args.map(compileNode);

  if (rule.id === 'constant' && node.constantValue !== undefined) {
    return node.constantValue.toFixed(10);
  }

  return rule.toGLSL(compiledArgs);
}

export function compileToGLSL(
  treeR: ExpressionNode,
  treeG: ExpressionNode,
  treeB: ExpressionNode
): string {
  const shaderHeader = `precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

${GLSL_PREAMBLE}
`;

  if (treeR.ruleId === 'vec3') {
    const frag = compileNode(treeR);
    return `${shaderHeader}void main() {
  vec2 uv = v_texCoord;
  vec3 color = ${frag};
  gl_FragColor = vec4((color + 1.0) / 2.0, 1.0);
}
`;
  }

  const fragR = compileNode(treeR);
  const fragG = compileNode(treeG);
  const fragB = compileNode(treeB);

  return `${shaderHeader}void main() {
  vec2 uv = v_texCoord;
  float r = ${fragR};
  float g = ${fragG};
  float b = ${fragB};
  gl_FragColor = vec4((vec3(r, g, b) + 1.0) / 2.0, 1.0);
}
`;
}

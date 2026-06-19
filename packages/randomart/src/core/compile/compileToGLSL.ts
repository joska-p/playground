import { getRule } from '../grammar/registry';
import type { ExpressionNode } from '../types';

const GLSL_PREAMBLE = `
float random2d(vec2 co) {
  float dot_ = dot(co, vec2(12.9898, 78.233));
  return fract(sin(dot_) * 43758.5453);
}

vec3 hueRotate(vec3 color, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec3(
    (0.299 + 0.701*c + 0.168*s) * color.r + (0.587 - 0.587*c + 0.330*s) * color.g + (0.114 - 0.114*c - 0.331*s) * color.b,
    (0.299 - 0.299*c - 0.328*s) * color.r + (0.587 + 0.413*c + 0.035*s) * color.g + (0.114 - 0.114*c + 0.292*s) * color.b,
    (0.299 - 0.299*c + 1.250*s) * color.r + (0.587 - 0.587*c - 1.050*s) * color.g + (0.114 + 0.886*c - 0.203*s) * color.b
  );
}
`;

function compileNode(node: ExpressionNode): string {
  if (node.ruleId === 'vec3') {
    const compiledArgs = node.args.map(compileNode);
    return `vec3(${compiledArgs[0]}, ${compiledArgs[1]}, ${compiledArgs[2]})`;
  }

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
uniform float u_animSpeed;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

${GLSL_PREAMBLE}
`;

  if (treeR.ruleId === 'vec3') {
    const frag = compileNode(treeR);
    return `${shaderHeader}void main() {
    vec3 color = (${frag} + 1.0) / 2.0;
    color = hueRotate(color, u_time * u_animSpeed);
    gl_FragColor = vec4(color, 1.0);
    }
  `;
  }

  const fragR = compileNode(treeR);
  const fragG = compileNode(treeG);
  const fragB = compileNode(treeB);

  return `${shaderHeader}void main() {
  vec2 uv = v_texCoord * 2.0 - 1.0;
  float r = ${fragR};
  float g = ${fragG};
  float b = ${fragB};
  vec3 color = (vec3(r, g, b) + 1.0) / 2.0;
  color = hueRotate(color, u_time * u_animSpeed);
  gl_FragColor = vec4(color, 1.0);
}
`;
}

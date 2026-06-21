import { type AnimationBehavior } from '../animation/behaviors';
import { getRule } from '../grammar/registry';
import type { ExpressionNode } from '../types';

const GLSL_PREAMBLE = (behaviors: AnimationBehavior[]) => `
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

${behaviors.map((b) => b.glslFunction).join('\n')}
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
  treeB: ExpressionNode,
  behaviors: AnimationBehavior[]
): string {
  const shaderHeader = `precision highp float;

uniform float u_time;
uniform float u_animSpeed;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

${GLSL_PREAMBLE(behaviors)}
`;

  const spatialBehaviors = behaviors.filter((b) => b.type === 'spatial');
  const colorBehaviors = behaviors.filter((b) => b.type === 'color');

  const spatialCode = spatialBehaviors
    .map((b) => b.applyCode('u_time', 'u_animSpeed'))
    .join('\n');
  const colorCode = colorBehaviors
    .map((b) => b.applyCode('u_time', 'u_animSpeed'))
    .join('\n');

  if (treeR.ruleId === 'vec3') {
    const frag = compileNode(treeR).replaceAll('v_texCoord', 'uv');
    return `${shaderHeader}void main() {
    vec2 uv = v_texCoord * 2.0 - 1.0;
    ${spatialCode}
    vec3 color = (${frag} + 1.0) / 2.0;

    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luma), color, 0.65);

    ${colorCode}
    gl_FragColor = vec4(color, 1.0);
    }
  `;
  }

  const fragR = compileNode(treeR).replaceAll('v_texCoord', 'uv');
  const fragG = compileNode(treeG).replaceAll('v_texCoord', 'uv');
  const fragB = compileNode(treeB).replaceAll('v_texCoord', 'uv');

  return `${shaderHeader}void main() {
  vec2 uv = v_texCoord * 2.0 - 1.0;
  ${spatialCode}
  float r = ${fragR};
  float g = ${fragG};
  float b = ${fragB};
  vec3 color = (vec3(r, g, b) + 1.0) / 2.0;

  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(vec3(luma), color, 0.65);

  ${colorCode}
  gl_FragColor = vec4(color, 1.0);
}
`;
}

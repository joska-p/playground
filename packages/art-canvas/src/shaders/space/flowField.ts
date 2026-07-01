import type { ShaderModule } from '../types';
import code from './noise2d.glsl?raw';

export const flowField: ShaderModule = {
  name: 'flowField',
  category: 'space',
  weight: 1.5,
  code: `
    ${code}
    vec2 flowField(vec2 uv, float time, float strength) {
        float n1 = noise2d(uv * 2.0 + vec2(time * 0.1));
        float n2 = noise2d(uv * 2.0 + vec2(time * 0.15 + 20.0));
        return uv + vec2(n1, n2) * strength;
    }
  `,
  params: {
    time: { type: 'global', value: 'u_time' },
    strength: { type: 'range', min: 0.05, max: 0.2 }
  },
  getCall: ({ uv, time, strength }) => `uv = flowField(${uv}, ${time}, ${strength});`
};

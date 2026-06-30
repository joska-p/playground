import type { ShaderModule } from '../types';
import code from './noise2d.glsl?raw';

export const flowField: ShaderModule = {
  name: 'flowField',
  category: 'space',
  code: `
    ${code}
    vec2 flowField(vec2 uv, float time, float strength) {
        // Sample noise at two slightly different positions to create a directional offset vector
        float n1 = noise2d(uv * 2.0 + vec2(time * 0.1));
        float n2 = noise2d(uv * 2.0 + vec2(time * 0.15 + 20.0));
        return uv + vec2(n1, n2) * strength;
    }
  `,
  getCall: ({ uv, time, strength }) => `uv = flowField(${uv}, ${time}, ${strength});`
};

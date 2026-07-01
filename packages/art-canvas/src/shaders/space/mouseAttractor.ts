import type { ShaderModule } from '../types';

export const mouseAttractor: ShaderModule = {
  name: 'mouseAttractor',
  category: 'space',
  weight: 1.0, // Standard selection probability
  code: `
    vec2 mouseAttractor(vec2 uv, vec2 mouse, float strength) {
        // Gravitational pull towards the cursor position
        vec2 dir = mouse - uv;
        float dist = length(dir);
        return uv + normalize(dir) * (1.0 / (dist + 1.0)) * strength;
    }
  `,
  params: {
    mouse: { type: 'global', value: 'u_mouse' },
    strength: { type: 'range', min: 0.02, max: 0.12 }
  },
  getCall: ({ uv, mouse, strength }) => `uv = mouseAttractor(${uv}, ${mouse}, ${strength});`
};

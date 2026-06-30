import type { ShaderModule } from '../types';

export const mouseAttractor: ShaderModule = {
  name: 'mouseAttractor',
  category: 'space',
  code: `
    vec2 mouseAttractor(vec2 uv, vec2 mouse, float strength) {
        // Gravitational pull towards the cursor position
        vec2 dir = mouse - uv;
        float dist = length(dir);
        return uv + normalize(dir) * (1.0 / (dist + 1.0)) * strength;
    }
  `,
  getCall: ({ uv, mouse }) => `uv = mouseAttractor(${uv}, ${mouse || 'u_mouse'}, 0.05);`
};

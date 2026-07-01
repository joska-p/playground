import type { ShaderModule } from '../../types';
import code from '../../glsl/effects/cosinePalette.glsl?raw';

export const cosinePalette: ShaderModule = {
  name: 'cosinePalette',
  category: 'effects',
  code,
  getCall: ({ dist, offset, a, b, c, d }) =>
    `vec3 col = cosinePalette(${dist} + ${offset}, ${a}, ${b}, ${c}, ${d});`
};

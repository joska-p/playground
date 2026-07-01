import type { ShaderModule } from '../../../types';
import code from '../../glsl/effects/cosinePalette.glsl?raw';

export const cosinePalette: ShaderModule = {
  name: 'cosinePalette',
  category: 'effects',
  code,
  getCall: ({ dist, offset, a, b, c, d }) =>
    `vec3 col = cosinePalette(${dist ?? '0.0'} + ${offset ?? '0.0'}, ${a ?? '1.0'}, ${b ?? '1.0'}, ${c ?? '1.0'}, ${d ?? '0.0'});`
};

import type { ShaderModule } from '../types';
import code from './posterize.glsl?raw';

export const posterize: ShaderModule = {
  name: 'posterize',
  category: 'effects',
  code,
  getCall: ({ val, steps }) => `wave = posterize(${val}, ${steps});`
};

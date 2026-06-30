import type { ShaderModule } from '../types';
import code from './cosinePalette.glsl?raw';

export const cosinePalette: ShaderModule = {
  name: 'cosinePalette',
  category: 'effects',
  code
};

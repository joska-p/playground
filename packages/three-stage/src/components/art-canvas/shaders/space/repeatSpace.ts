import type { ShaderModule } from '../types';
import code from './repeatSpace.glsl?raw';

export const repeatSpace: ShaderModule = {
  name: 'repeatSpace',
  category: 'space',
  code
};

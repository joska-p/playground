import type { ShaderModule } from '../types';
import code from './rotate2d.glsl?raw';

export const rotate2d: ShaderModule = {
  name: 'rotate2d',
  category: 'space',
  code,
  getCall: ({ uv, angle }) => `uv = rotate2d(${uv}, ${angle});`
};

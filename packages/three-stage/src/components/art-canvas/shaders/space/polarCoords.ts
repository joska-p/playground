import type { ShaderModule } from '../types';
import code from './polarCoords.glsl?raw';

export const polarCoords: ShaderModule = {
  name: 'polarCoords',
  category: 'space',
  code,
  getCall: ({ uv }) => `uv = polarCoords(${uv});`
};

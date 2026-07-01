import type { ShaderModule } from '../types';
import code from './polarCoords.glsl?raw'; //

export const polarCoords: ShaderModule = {
  name: 'polarCoords',
  category: 'space',
  weight: 0.4, // Keep rare as it dramatically alters rendering structures
  code,
  getCall: ({ uv }) => `uv = polarCoords(${uv});`
};

import type { ShaderModule } from '../../../types';
import code from '../../glsl/space/polarCoords.glsl?raw';

export const polarCoords: ShaderModule = {
  name: 'polarCoords',
  category: 'space',
  weight: 0.4,
  code,
  getCall: ({ uv }) => `uv = polarCoords(${uv});`
};

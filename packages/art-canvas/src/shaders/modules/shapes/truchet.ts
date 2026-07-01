import type { ShaderModule } from '../../../types';
import code from '../../glsl/shapes/truchet.glsl?raw';

export const truchet: ShaderModule = {
  name: 'truchet',
  category: 'shapes',
  weight: 1.2,
  code,
  params: {
    scale: { type: 'range', min: 1.0, max: 6.0 },
  },
  getCall: ({ uv, scale }) => `float dist = sdTruchet(${uv}, ${scale});`,
};

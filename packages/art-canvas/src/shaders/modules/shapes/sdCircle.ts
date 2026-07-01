import type { ShaderModule } from '../../../types';
import code from '../../glsl/shapes/sdCircle.glsl?raw';

export const circleSdf: ShaderModule = {
  name: 'circleSdf',
  category: 'shapes',
  weight: 1.5,
  code,
  params: {
    radius: { type: 'range', min: 0.3, max: 1.5 },
  },
  getCall: ({ uv, radius }) => `float dist = sdCircle(${uv}, ${radius});`,
};

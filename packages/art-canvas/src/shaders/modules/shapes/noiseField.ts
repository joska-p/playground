import type { ShaderModule } from '../../../types';
import code from '../../glsl/shapes/noiseField.glsl?raw';

export const noiseField: ShaderModule = {
  name: 'noiseField',
  category: 'shapes',
  weight: 2.5,
  code,
  deps: ['noise2d', 'fbm'],
  params: {
    scale: { type: 'range', min: 1.0, max: 5.0 },
    speed: { type: 'range', min: 0.2, max: 1.5 }
  },
  getCall: ({ uv, scale, speed }) =>
    `float dist = noiseField(${uv}, ${scale}, u_time, ${speed});`
};

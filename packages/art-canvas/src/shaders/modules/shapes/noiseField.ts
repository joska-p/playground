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
  getCall: (args) =>
    `float dist = noiseField(${args.uv ?? 'uv'}, ${args.scale ?? '1.0'}, u_time, ${args.speed ?? '1.0'});`
};

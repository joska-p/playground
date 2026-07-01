import type { ShaderModule } from '../../../types';
import code from '../../glsl/space/flowField.glsl?raw';

export const flowField: ShaderModule = {
  name: 'flowField',
  category: 'space',
  weight: 1.5,
  code,
  deps: ['noise2d'],
  params: {
    time: { type: 'global', value: 'u_time' },
    strength: { type: 'range', min: 0.05, max: 0.2 }
  },
  getCall: ({ uv, time, strength }) =>
    `${uv ?? 'uv'} = flowField(${uv ?? 'uv'}, ${time ?? 'u_time'}, ${strength ?? '0.1'});`
};

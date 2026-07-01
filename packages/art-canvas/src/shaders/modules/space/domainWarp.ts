import type { ShaderModule } from '../../types';
import code from '../../glsl/space/domainWarp.glsl?raw';

export const domainWarp: ShaderModule = {
  name: 'domainWarp',
  category: 'space',
  weight: 2.0,
  code,
  params: {
    time: { type: 'global', value: 'u_time' },
    intensity: { type: 'range', min: 0.1, max: 0.5 }
  },
  getCall: ({ uv, time, intensity }) => `${uv} = domainWarp(${uv}, ${time}, ${intensity});`
};

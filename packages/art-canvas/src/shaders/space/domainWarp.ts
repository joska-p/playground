import type { ShaderModule } from '../types';
import code from './domainWarp.glsl?raw';

export const domainWarp: ShaderModule = {
  name: 'domainWarp',
  category: 'space',
  code,
  getCall: ({ uv, time, intensity }) => {
    return `${uv} = domainWarp(${uv}, ${time}, ${intensity});`;
  }
};

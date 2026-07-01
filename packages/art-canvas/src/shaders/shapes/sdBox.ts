import type { ShaderModule } from '../types';
import code from './sdBox.glsl?raw';

export const sdBox: ShaderModule = {
  name: 'sdBox',
  category: 'shapes',
  weight: 0.8,
  code,
  params: {
    width: { type: 'range', min: 0.15, max: 0.4 },
    height: { type: 'range', min: 0.15, max: 0.4 }
  },
  getCall: ({ uv, width, height }) => `float dist = sdBox(${uv}, vec2(${width}, ${height}));`
};

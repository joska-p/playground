import type { ShaderModule } from '../types';
import code from './sdBox.glsl?raw';

export const sdBox: ShaderModule = {
  name: 'sdBox',
  category: 'shapes',
  code,
  getCall: ({ uv, width, height }) => `float dist = sdBox(${uv}, vec2(${width}, ${height}));`
};

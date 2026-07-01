import type { ShaderModule } from '../types';
import code from './repeatSpace.glsl?raw';

export const repeatSpace: ShaderModule = {
  name: 'repeatSpace',
  category: 'space',
  weight: 0.7, // Lower weight to avoid breaking continuity too often
  code,
  params: {
    count: { type: 'range', min: 1.5, max: 4.5, precision: 1 }
  },
  getCall: ({ uv, count }) => `uv = repeatSpace(${uv}, ${count});`
};

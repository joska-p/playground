import type { ShaderModule } from '../../../types';
import code from '../../glsl/shapes/lineSdf.glsl?raw';

export const lineSdf: ShaderModule = {
  name: 'lineSdf',
  category: 'shapes',
  weight: 0.8,
  code,
  params: {
    x1: { type: 'range', min: -0.6, max: 0.0 },
    y1: { type: 'range', min: -0.6, max: 0.6 },
    x2: { type: 'range', min: 0.0, max: 0.6 },
    y2: { type: 'range', min: -0.6, max: 0.6 },
  },
  getCall: ({ uv, x1, y1, x2, y2 }) =>
    `float dist = sdLine(${uv}, vec2(${x1}, ${y1}), vec2(${x2}, ${y2}));`,
};

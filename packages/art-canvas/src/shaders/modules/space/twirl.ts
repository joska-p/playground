import type { ShaderModule } from '../../../types';
import code from '../../glsl/space/twirl.glsl?raw';

export const twirl: ShaderModule = {
  name: 'twirl',
  category: 'space',
  weight: 1.0,
  code,
  params: {
    strength: { type: 'range', min: 0.5, max: 4.0 },
  },
  getCall: ({ uv, strength }) =>
    `uv = twirl(${uv}, ${strength}, vec2(0.0, 0.0));`,
};

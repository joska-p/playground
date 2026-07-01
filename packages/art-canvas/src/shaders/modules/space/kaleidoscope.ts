import type { ShaderModule } from '../../../types';
import code from '../../glsl/space/kaleidoscope.glsl?raw';

export const kaleidoscope: ShaderModule = {
  name: 'kaleidoscope',
  category: 'space',
  weight: 0.8,
  code,
  params: {
    segments: { type: 'range', min: 3.0, max: 12.0, precision: 0 }
  },
  getCall: ({ uv, segments }) =>
    `${uv ?? 'uv'} = kaleidoscope(${uv ?? 'uv'}, ${segments ?? '6.0'});`
};

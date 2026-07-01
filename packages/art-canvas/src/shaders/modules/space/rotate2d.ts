import type { ShaderModule } from '../../../types';
import code from '../../glsl/space/rotate2d.glsl?raw';

export const rotate2d: ShaderModule = {
  name: 'rotate2d',
  category: 'space',
  weight: 1.2,
  code,
  params: {
    angle: { type: 'global', value: 'u_time * 0.15' }
  },
  getCall: ({ uv, angle }) => `${String(uv)} = rotate2d(${String(uv)}, ${String(angle)});`
};

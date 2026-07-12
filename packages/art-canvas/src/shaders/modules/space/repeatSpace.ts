import code from '../../glsl/space/repeatSpace.glsl?raw';
import type { ShaderModule } from '../../types';

export const repeatSpace: ShaderModule = {
  name: 'repeatSpace',
  category: 'space',
  weight: 0.1,
  code,
  params: {
    count: { type: 'range', min: 1.5, max: 4.5, precision: 1 }
  },
  getCall: ({ uv, count }) => `uv = repeatSpace(${String(uv)}, ${String(count)});`
};

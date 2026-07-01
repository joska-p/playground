import type { ShaderModule } from '../../types';
import noiseCode from '../../preamble/noise2d.glsl?raw';
import code from '../../glsl/space/flowField.glsl?raw';

export const flowField: ShaderModule = {
  name: 'flowField',
  category: 'space',
  weight: 1.5,
  code: `${noiseCode}\n${code}`,
  params: {
    time: { type: 'global', value: 'u_time' },
    strength: { type: 'range', min: 0.05, max: 0.2 }
  },
  getCall: ({ uv, time, strength }) => `uv = flowField(${uv}, ${time}, ${strength});`
};

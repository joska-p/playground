import type { Shader } from '../types.ts';
import fragmentShader from './ripple.frag?raw';
import vertexShader from './ripple.vert?raw';

const rippleShader: Shader = {
  id: 'ripple',
  name: 'Ripple',
  vert: vertexShader,
  frag: fragmentShader,
};

export { rippleShader };

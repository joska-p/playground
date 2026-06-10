import type { Shader } from '../types.ts';
import fragmentShader from './kaleidoscope.frag?raw';
import vertexShader from './kaleidoscope.vert?raw';

const kaleidoscopeShader: Shader = {
  id: 'kaleidoscope',
  name: 'Kaleidoscope',
  vert: vertexShader,
  frag: fragmentShader,
};

export { kaleidoscopeShader };

import type { Shader } from '../types';
import fragmentShader from './cell-mesh.frag?raw';
import vertexShader from './cell-mesh.vert?raw';

const glowShader: Shader = {
  id: 'glow',
  name: 'Glow',
  vert: vertexShader,
  frag: fragmentShader,
};

export { glowShader };

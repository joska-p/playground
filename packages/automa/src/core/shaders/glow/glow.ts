import vertexShader from './cell-mesh.vert?raw';
import fragmentShader from './cell-mesh.frag?raw';
import type { Shader } from '../types.ts';

const glowShader: Shader = {
  id: 'glow',
  name: 'Glow',
  vert: vertexShader,
  frag: fragmentShader,
};

export { glowShader };

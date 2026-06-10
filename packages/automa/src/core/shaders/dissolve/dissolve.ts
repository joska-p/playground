import type { Shader } from '../types';
import fragmentShader from './dissolve.frag?raw';
import vertexShader from './dissolve.vert?raw';

const dissolveShader: Shader = {
  id: 'dissolve',
  name: 'Dissolve',
  vert: vertexShader,
  frag: fragmentShader,
};

export { dissolveShader };

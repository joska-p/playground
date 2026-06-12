import type { Shader } from '../types';
import fragmentShader from './pixelate.frag?raw';
import vertexShader from './pixelate.vert?raw';

const pixelateShader: Shader = {
  id: 'pixelate',
  name: 'Pixelate',
  vert: vertexShader,
  frag: fragmentShader
};

export { pixelateShader };

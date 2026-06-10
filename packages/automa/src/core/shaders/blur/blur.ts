import type { Shader } from '../types.ts';
import fragmentShader from './blur.frag?raw';
import vertexShader from './blur.vert?raw';

const blurShader: Shader = {
  id: 'blur',
  name: 'Blur',
  vert: vertexShader,
  frag: fragmentShader,
};

export { blurShader };

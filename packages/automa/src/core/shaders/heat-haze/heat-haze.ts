import type { Shader } from '../types';
import fragmentShader from './heat-haze.frag?raw';
import vertexShader from './heat-haze.vert?raw';

const heatHazeShader: Shader = {
  id: 'heat-haze',
  name: 'Heat Haze',
  vert: vertexShader,
  frag: fragmentShader
};

export { heatHazeShader };

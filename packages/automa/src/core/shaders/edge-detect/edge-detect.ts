import type { Shader } from '../types.ts';
import fragmentShader from './edge-detect.frag?raw';
import vertexShader from './edge-detect.vert?raw';

const edgeDetectShader: Shader = {
  id: 'edge-detect',
  name: 'Edge Detect',
  vert: vertexShader,
  frag: fragmentShader,
};

export { edgeDetectShader };

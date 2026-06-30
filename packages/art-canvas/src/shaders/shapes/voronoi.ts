import type { ShaderModule } from '../types';
import code from './voronoi.glsl?raw';

export const voronoiModule: ShaderModule = {
  name: 'voronoi',
  category: 'shapes', // Treats it as a continuous field/shape generator
  code,
  getCall: ({ uv, scale, animSpeed }) => {
    // Declares float dist dynamically into the grammar pipeline loop
    return `float dist = voronoi(${uv} * ${scale || '4.0'}, u_time, ${animSpeed || '0.5'});`;
  }
};

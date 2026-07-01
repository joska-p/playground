import type { ShaderModule } from '../../../types';
import code from '../../glsl/shapes/voronoi.glsl?raw';

export const voronoiModule: ShaderModule = {
  name: 'voronoi',
  category: 'shapes',
  weight: 2.0,
  code,
  params: {
    scale: { type: 'range', min: 2.0, max: 7.0 },
    animSpeed: { type: 'range', min: 0.1, max: 1.2 }
  },
  getCall: ({ uv, scale, animSpeed }) =>
    `float dist = voronoi(${uv} * ${scale}, u_time, ${animSpeed});`
};

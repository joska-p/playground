import code from '../../glsl/shapes/voronoi.glsl?raw';
import type { ShaderModule } from '../../types';

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
    `float dist = voronoi(${uv ?? 'uv'} * ${scale ?? '1.0'}, u_time, ${animSpeed ?? '1.0'});`
};

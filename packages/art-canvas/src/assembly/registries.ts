import { noiseField } from '../shaders/modules/shapes/noiseField';
import { sdBox } from '../shaders/modules/shapes/sdBox';
import { voronoiModule } from '../shaders/modules/shapes/voronoi';
import { domainWarp } from '../shaders/modules/space/domainWarp';
import { flowField } from '../shaders/modules/space/flowField';
import { mouseAttractor } from '../shaders/modules/space/mouseAttractor';
import { polarCoords } from '../shaders/modules/space/polarCoords';
import { repeatSpace } from '../shaders/modules/space/repeatSpace';
import { rotate2d } from '../shaders/modules/space/rotate2d';
import { ClassicTemplate } from '../shaders/templates/classic';
import { DirectNoiseTemplate } from '../shaders/templates/DirectNoiseTemplate';
import noisePreamble from '../shaders/preamble/noise2d.glsl?raw';
import fbmPreamble from '../shaders/preamble/fbm.glsl?raw';
import type { ShaderModule, ShaderTemplate } from '../types';

export const PREAMBLE_REGISTRY: Record<string, string> = {
  noise2d: noisePreamble,
  fbm: fbmPreamble,
};

export const SPACE_REGISTRY: ShaderModule[] = [
  domainWarp,
  flowField,
  rotate2d,
  repeatSpace,
  polarCoords,
  mouseAttractor,
];

export const SHAPE_REGISTRY: ShaderModule[] = [voronoiModule, noiseField, sdBox];

export const TEMPLATE_REGISTRY: ShaderTemplate[] = [
  ClassicTemplate,
  DirectNoiseTemplate,
];

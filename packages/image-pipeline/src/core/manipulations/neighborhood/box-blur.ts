import { defineNeighbor } from '../../manipulation-factories';
import { applyKernel } from './helpers';

export const boxBlur = defineNeighbor<{ radius?: number }>({
  id: 'box-blur',
  radius: 1,
  execute: ({ options, source, destination, width, height }) => {
    const radius = options.radius ?? 1;
    const size = radius * 2 + 1;
    applyKernel(
      source,
      destination,
      width,
      height,
      new Array<number>(size * size).fill(1),
      size,
      size * size
    );
  },
  ui: {
    name: 'Box Blur',
    description: 'Applies a uniform box blur.',
    defaultArgs: { radius: 1 },
    argDefinitions: [
      { key: 'radius', label: 'Radius', min: 1, max: 10, step: 1 },
    ],
  },
});

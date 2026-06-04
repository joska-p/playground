import { defineWhole } from '../../manipulation-factories';

export const flipHorizontal = defineWhole({
  id: 'flip-horizontal',
  execute: ({ imageData }) => {
    const { width, height, data } = imageData;
    const out = new ImageData(width, height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const source = (y * width + x) * 4;
        const destinationIndex = (y * width + (width - 1 - x)) * 4;
        out.data[destinationIndex] = data[source] ?? 0;
        out.data[destinationIndex + 1] = data[source + 1] ?? 0;
        out.data[destinationIndex + 2] = data[source + 2] ?? 0;
        out.data[destinationIndex + 3] = data[source + 3] ?? 255;
      }
    }
    return out;
  },
  ui: {
    name: 'Flip Horizontal',
    description: 'Mirrors the image left-to-right.',
    defaultArgs: {},
    argDefinitions: [],
  },
});

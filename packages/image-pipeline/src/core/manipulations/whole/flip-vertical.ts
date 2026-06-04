import { defineWhole } from '../../manipulation-factories';

export const flipVertical = defineWhole({
  id: 'flip-vertical',
  execute: ({ imageData }) => {
    const { width, height, data } = imageData;
    const out = new ImageData(width, height);
    for (let y = 0; y < height; y++) {
      out.data.set(
        data.subarray(y * width * 4, (y + 1) * width * 4),
        (height - 1 - y) * width * 4
      );
    }
    return out;
  },
  ui: {
    name: 'Flip Vertical',
    description: 'Mirrors the image top-to-bottom.',
    defaultArgs: {},
    argDefinitions: [],
  },
});

import { definePixel } from '../../manipulation-factories';

export const brightness = definePixel<{ value?: number }>({
  id: 'brightness',
  execute: ({ options, red, green, blue, alpha }) => {
    const value = options.value ?? 1;
    return [red * value, green * value, blue * value, alpha];
  },
  ui: {
    name: 'Brightness',
    description: 'Adjusts brightness by a factor.',
    defaultArgs: { value: 1 },
    argDefinitions: [
      { key: 'value', label: 'Value', min: 0, max: 3, step: 0.1 },
    ],
  },
});

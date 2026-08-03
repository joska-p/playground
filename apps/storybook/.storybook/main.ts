import type { StorybookConfig } from '@storybook/react-vite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-themes')
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  core: {
    disableTelemetry: true
  },
  viteFinal: (config) => {
    config.build ??= {};
    config.build.rolldownOptions ??= {};
    config.build.rolldownOptions.output ??= {};
    config.build.rolldownOptions.output = {
      codeSplitting: {
        groups: [
          {
            name: 'vendor-react',
            test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 100
          },
          {
            name: 'vendor-three',
            test: /node_modules[\\/]three[\\/]/,
            priority: 100
          },
          {
            name: 'vendor-r3f',
            test: /node_modules[\\/]@react-three[\\/]/,
            priority: 50
          },
          {
            name: 'vendor-colorjs',
            test: /node_modules[\\/]colorjs\.io[\\/]/,
            priority: 50
          }
        ]
      }
    };
    return config;
  }
};
export default config;

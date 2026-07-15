import createConfig from '@repo/config-eslint';
import { defineConfig } from 'eslint/config';

const baseConfig = createConfig(import.meta.dirname);

export default defineConfig([
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off'
    }
  }
]);

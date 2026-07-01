import { defineConfig } from 'eslint/config';
import createConfig from '@repo/config-eslint';

const baseConfig = createConfig(import.meta.dirname);

export default defineConfig([
  ...baseConfig,
  {
    files: ['src/core/pipeline/stages/run-simulation.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off'
    }
  },
  {
    files: ['src/core/pipeline/types.d.ts'],
    rules: {
      '@typescript-eslint/no-redundant-type-constituents': 'off'
    }
  }
]);

import { defineConfig } from 'eslint/config';
import createConfig from '@repo/config-eslint';

const baseConfig = createConfig(import.meta.dirname);

export default defineConfig([
  ...baseConfig,
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-floating-promises': 'off'
    }
  }
]);

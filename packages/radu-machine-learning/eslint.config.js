import { defineConfig } from 'eslint/config';
import createConfig from '@repo/config-eslint';

const baseConfig = createConfig(import.meta.dirname);

export default defineConfig([
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off'
    }
  }
]);

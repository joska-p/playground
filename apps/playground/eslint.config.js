import createConfig from '@repo/config-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  ...createConfig(import.meta.dirname),
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro', 'src/content.config.ts'],
    rules: {
      'astro/no-set-html-directive': 'error',
      'import/no-default-export': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off'
    }
  }
];

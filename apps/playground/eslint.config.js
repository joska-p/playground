import createConfig from '@repo/config-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  ...createConfig(import.meta.dirname),
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    rules: {
      'astro/no-set-html-directive': 'error',
      'import/no-default-export': 'off'
    }
  },
  {
    files: ['**/*.astro/*.ts', '*.astro/*.ts'],
    languageOptions: {
      parserOptions: {
        project: null
      }
    }
  }
];

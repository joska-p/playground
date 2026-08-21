import createConfig from '@repo/config-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import * as astroParser from 'astro-eslint-parser';

export default [
    ...createConfig(import.meta.dirname),
    ...eslintPluginAstro.configs.recommended,
    {
        files: ['**/*.astro'],
        languageOptions: {
            parser: astroParser
        },
        rules: {
            'astro/no-set-html-directive': 'error',
            // Les composants .astro exportent par défaut par nature.
            'import/no-default-export': 'off'
        }
    },
    {
        files: ['src/content.config.ts'],
        rules: {
            'import/no-default-export': 'off'
        }
    }
];

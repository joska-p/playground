import createConfig from '@repo/config-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
    ...createConfig(import.meta.dirname),
    ...eslintPluginAstro.configs.recommended,
    {
        files: ['**/*.astro'],
        languageOptions: {
            parserOptions: {
                // Mapping explicite plutôt que de laisser
                // astro-eslint-parser auto-détecter le parser TS :
                // en monorepo (pnpm/turbo) cette détection est
                // instable selon où le package est hoisté.
                parser: {
                    ts: tseslint.parser,
                    js: 'espree'
                },
                // Même raison que côté config partagée : déclarer
                // l'extension pour que le resolver TS ne s'étouffe
                // pas sur les fichiers .astro.
                extraFileExtensions: ['.astro']
                // Volontairement PAS de `project`/`projectService` ici :
                // le linting typé sur le frontmatter est encore
                // expérimental côté astro-eslint-parser et casse
                // facilement. On garde donc le typed linting réservé
                // aux vrais .ts/.tsx, et on ne fait que du linting
                // syntaxique (mais TS-aware) sur le frontmatter/script.
            }
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
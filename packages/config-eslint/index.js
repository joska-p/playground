import js from '@eslint/js';
import importPluginX from 'eslint-plugin-import-x';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default function createConfig(dirname) {
  return defineConfig([
    globalIgnores(['dist', '.astro']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
        reactHooks.configs.flat.recommended,
        reactRefresh.configs.vite
      ],
      plugins: {
        import: importPluginX
      },
      languageOptions: {
        globals: globals.browser,
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: dirname
        }
      },
      rules: {
        'import/no-default-export': 'error',
        'import/no-cycle': ['error', { maxDepth: 2 }],

        // ensures ESLint defers to TypeScript’s type checking
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',

        // prefer const over let when variables are never reassigned after declared
        'prefer-const': 'error',

        // type over interface
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

        // enforce import type for type-only imports
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', fixStyle: 'separate-type-imports' }
        ],

        // enforce consistent type exports
        '@typescript-eslint/consistent-type-exports': 'error'
      }
    },
    {
      files: ['*.config.ts', '*.config.js', 'vite.config.ts', 'tailwind.config.ts', '**/*.d.ts'],
      rules: {
        'import/no-default-export': 'off'
      }
    }
  ]);
}

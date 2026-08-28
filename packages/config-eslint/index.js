import js from '@eslint/js';
import importPluginX from 'eslint-plugin-import-x';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import jsdoc from 'eslint-plugin-jsdoc';

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
                reactRefresh.configs.vite,
                // Désactive les règles JSDoc inutiles en TS
                jsdoc.configs['flat/recommended-typescript-error']
            ],
            plugins: {
                import: importPluginX,
                jsdoc
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
                // --- 1. STRUCTURE & IMPORTS (L'ADN de ton codebase) ---
                'import/no-default-export': 'error',
                'import/no-cycle': ['error', { maxDepth: 2 }],
                '@typescript-eslint/consistent-type-exports': 'error',
                '@typescript-eslint/consistent-type-imports': [
                    'error',
                    {
                        prefer: 'type-imports',
                        fixStyle: 'separate-type-imports'
                    }
                ],
                'import/order': [
                    'error',
                    {
                        groups: [
                            'builtin', // node:fs, node:path...
                            'external', // react, lodash...
                            'internal', // ~/components, ~/utils...
                            ['parent', 'sibling', 'index'], // ../, ./
                            'object',
                            'type' // imports de types à la fin
                        ],
                        //'newlines-between': 'always', // Force une ligne vide entre chaque groupe
                        alphabetize: { order: 'asc', caseInsensitive: true }
                    }
                ],

                // --- 2. TYPES & SYNTAXE ---
                'prefer-const': 'error',
                // Type over Interface
                '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

                // --- 3. LES PUITS SÉMANTIQUES (Audit & Patterns interdits) ---
                'no-restricted-syntax': [
                    'error',
                    // React 19 Compiler gère la mémoïsation
                    {
                        selector: "CallExpression[callee.name='useMemo']",
                        message:
                            'Audit Fail: React 19 Compiler gère la mémoïsation. Pas de useMemo.'
                    },
                    {
                        selector: "CallExpression[callee.name='useCallback']",
                        message:
                            'Audit Fail: React 19 Compiler gère la mémoïsation. Pas de useCallback.'
                    },
                    // Anti-patterns de types
                    {
                        selector: 'TSPropertySignature[optional=true] TSUnionType > TSNullKeyword',
                        message:
                            "Type noise: Avoid combining optional properties (?) with explicit '| null'. You may want to provide a default value."
                    },
                    {
                        selector:
                            'TSPropertySignature[optional=true] TSUnionType > TSUndefinedKeyword',
                        message:
                            "Type noise: Avoid combining optional properties (?) with explicit '| undefined'. You may want to provide a default value."
                    }
                ],

                // -- 4. Room
                'padding-line-between-statements': [
                    'error',
                    // Ligne vide TOUJOURS avant un return
                    { blankLine: 'always', prev: '*', next: 'return' },

                    // Ligne vide après les déclarations (const/let), SAUF si la ligne suivante est aussi une déclaration
                    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                    {
                        blankLine: 'any',
                        prev: ['const', 'let', 'var'],
                        next: ['const', 'let', 'var']
                    },

                    // Ligne vide avant et après les structures de contrôle (if, switch, try, for...)
                    {
                        blankLine: 'always',
                        prev: '*',
                        next: ['if', 'switch', 'try', 'for', 'while']
                    },
                    {
                        blankLine: 'always',
                        prev: ['if', 'switch', 'try', 'for', 'while'],
                        next: '*'
                    }
                ],

                // --- 4. LE NETTOYAGE (On coupe tout le bruit inutile) ---
                // Déféré à TypeScript pour éviter la surcharge d'audit
                '@typescript-eslint/no-unnecessary-condition': 'off',
                '@typescript-eslint/no-unnecessary-type-assertion': 'off',

                // --- 5. JSDoc (Maximum de silence, on laisse TS faire le boulot) ---
                'jsdoc/require-jsdoc': 'off',
                'jsdoc/require-description': 'off',
                'jsdoc/require-param': 'off',
                'jsdoc/require-returns': 'off',
                'jsdoc/require-param-description': 'off',
                'jsdoc/require-returns-description': 'off',
                'jsdoc/require-returns-type': 'off',
                'jsdoc/require-property-type': 'off',
                'jsdoc/check-param-names': 'off',
                'jsdoc/tag-lines': 'off',

                // Exceptions JSDoc que l'on garde actives
                'jsdoc/no-types': 'error'
            }
        },
        {
            files: [
                '*.config.ts',
                '*.config.js',
                'vite.config.ts',
                'tailwind.config.ts',
                '**/*.d.ts'
            ],
            rules: {
                'import/no-default-export': 'off'
            }
        }
    ]);
}

import createConfig from '@repo/config-eslint';
import { defineConfig } from 'eslint/config';

const baseConfig = createConfig(import.meta.dirname);

export default defineConfig([
    ...baseConfig,
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface']
        }
    }
]);

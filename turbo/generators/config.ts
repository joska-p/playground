import type { PlopTypes } from '@turbo/gen';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

interface ApiIndexPackage {
    package: string;
    packageDir: string;
    routeId: string;
    title: string;
    description: string | null;
    keywords: string;
    hasApp: boolean;
    appImport: string;
}

interface ApiIndex {
    version: number;
    packages: ApiIndexPackage[];
    entries: unknown[];
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
    plop.setGenerator('new-package', {
        description: 'Scaffold a new Vite + React package with a dummy app',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message:
                    'Package name (kebab-case, e.g. my-package → @repo/my-package at packages/my-package/):',
                validate: (input: string) => {
                    if (!/^[a-z][a-z0-9-]*$/.test(input)) {
                        return 'Must be kebab-case: lowercase letters, numbers, and hyphens only.';
                    }
                    return true;
                }
            }
        ],
        actions: [
            {
                type: 'addMany',
                destination: 'packages/{{name}}',
                base: 'templates/new-package',
                templateFiles: 'templates/new-package/**/*'
            }
        ]
    });

    plop.setGenerator('project-pages', {
        description: 'Generate one Astro page per package/project from index.json',
        prompts: [],
        actions: () => {
            const jsonPath = join(process.cwd(), 'apps/playground/src/content/api/index.json');
            if (!existsSync(jsonPath)) {
                throw new Error('run `pnpm build-docs` first');
            }
            const apiIndex = JSON.parse(readFileSync(jsonPath, 'utf-8')) as ApiIndex;

            return apiIndex.packages.map((pkg) => ({
                type: 'add',
                path: `apps/playground/src/pages/discoveries/${pkg.routeId}.astro`,
                templateFile: 'templates/project-pages/project-pages.astro.hbs',
                data: {
                    packageName: pkg.package,
                    packageDir: pkg.packageDir,
                    id: pkg.routeId,
                    title: pkg.title,
                    description: pkg.description || '',
                    keywords: pkg.keywords,
                    hasApp: pkg.hasApp,
                    appImport: pkg.appImport
                },
                force: true
            }));
        }
    });
}

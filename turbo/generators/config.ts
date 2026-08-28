import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import type { PlopTypes } from '@turbo/gen';

function findRepoRoot(start: string): string {
    let dir = path.resolve(start);

    while (dir !== path.parse(dir).root) {
        if (existsSync(path.join(dir, 'pnpm-workspace.yaml'))) return dir;

        dir = path.dirname(dir);
    }

    throw new Error('Could not find repo root (pnpm-workspace.yaml)');
}

const repoRoot = findRepoRoot(process.cwd());
const packagesDir = path.join(repoRoot, 'packages');
const genRoot = path.join(
    repoRoot,
    'codex',
    'ateliers',
    'typedoc-pipeline',
    '.generated',
    'api-docs'
);
const pagesDir = path.join(repoRoot, 'apps', 'playground', 'src', 'pages', 'discoveries');
const templatePath = path.join(
    repoRoot,
    'turbo',
    'generators',
    'templates',
    'project-pages',
    'discovery-page.astro.hbs'
);

function hasAppFile(pkgDir: string): boolean {
    return existsSync(path.join(packagesDir, pkgDir, 'src', 'App.tsx'));
}

function packageDirs(): string[] {
    const source = existsSync(genRoot) ? genRoot : packagesDir;

    return readdirSync(source, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
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
        description:
            'Generate one static discovery page per package (apps/playground/src/pages/discoveries/)',
        prompts: [],
        actions: [
            async (_answers, _config, api) => {
                const packageList = packageDirs();

                if (packageList.length === 0) {
                    return 'No packages found — run `pnpm generate-typedoc-json` first.';
                }

                let created = 0;
                let skipped = 0;
                const failures: string[] = [];
                const template = readFileSync(templatePath, 'utf8');

                for (const pkgDir of packageList) {
                    const pagePath = path.join(pagesDir, `${pkgDir}.astro`);

                    if (existsSync(pagePath)) {
                        skipped++;
                        continue;
                    }

                    const content = await api.renderString(template, {
                        pkgDir,
                        hasApp: hasAppFile(pkgDir)
                    });

                    try {
                        writeFileSync(pagePath, content.endsWith('\n') ? content : `${content}\n`);
                        created++;
                    } catch (err) {
                        failures.push(pkgDir);
                        console.error(`[project-pages] failed to write ${pagePath}:`, err);
                    }
                }

                const summary = [
                    `[project-pages] generated ${created} discovery page(s), skipped ${skipped} existing`
                ];

                if (failures.length > 0) {
                    summary.push(`failed: ${failures.join(', ')}`);
                }

                return summary.join(' — ');
            }
        ]
    });
}

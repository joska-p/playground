import type { PlopTypes } from '@turbo/gen';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import YAML from 'yaml';

interface PackageEntry {
    package: string;
    packageDir: string;
    title: string;
    description: string | null;
    keywords: string;
    hasApp: boolean;
    appImport: string;
}

function readFrontmatter(filePath: string): Record<string, unknown> {
    const raw = readFileSync(filePath, 'utf8');
    if (!raw.startsWith('---')) return {};
    const end = raw.indexOf('\n---', 3);
    if (end === -1) return {};
    try {
        const parsed = YAML.parse(raw.slice(3, end));
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
        return {};
    }
}

function getAppImport(pkgName: string, pkgJson: Record<string, unknown>) {
    const exports = pkgJson.exports as Record<string, unknown> | undefined;
    if (!exports) return { hasApp: false, appImport: '' };

    const tsxExports: { key: string; val: string }[] = [];
    for (const [key, val] of Object.entries(exports)) {
        if (typeof val === 'string' && val.startsWith('./src/') && val.endsWith('.tsx')) {
            tsxExports.push({ key, val });
        }
    }
    if (tsxExports.length === 0) {
        return { hasApp: false, appImport: '' };
    }

    let matched = tsxExports.find((e) => e.val.endsWith('/App.tsx') || e.val === './src/App.tsx');
    if (!matched) {
        matched = tsxExports.find(
            (e) => e.val.includes('/src/docs/') || e.val.startsWith('./src/docs/')
        );
    }
    if (!matched) {
        matched = tsxExports[0];
    }

    const subPath = matched.key.replace(/^\./, '');
    return { hasApp: true, appImport: `${pkgName}${subPath}` };
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
        description: 'Generate one Astro page per package/project from the api content collection',
        prompts: [],
        actions: () => {
            const genRoot = join(process.cwd(), 'apps/playground/.generated/api-docs');
            const pkgDirs = existsSync(genRoot)
                ? readdirSync(genRoot, { withFileTypes: true })
                      .filter((d) => d.isDirectory())
                      .map((d) => d.name)
                : [];
            if (pkgDirs.length === 0) {
                throw new Error('run `pnpm build-docs` first');
            }

            const packages: PackageEntry[] = [];
            for (const packageDir of pkgDirs) {
                const pkgName = `@repo/${packageDir}`;
                const readmePath = join(process.cwd(), 'packages', packageDir, 'README.md');
                if (!existsSync(readmePath)) continue;
                const meta = readFrontmatter(readmePath);

                const pkgJsonPath = join(process.cwd(), 'packages', packageDir, 'package.json');
                const pkgJson = existsSync(pkgJsonPath)
                    ? (JSON.parse(readFileSync(pkgJsonPath, 'utf8')) as Record<string, unknown>)
                    : {};
                const appInfo = getAppImport(pkgName, pkgJson);

                packages.push({
                    package: pkgName,
                    packageDir,
                    title: String(meta.title || pkgName),
                    description: meta.description ? String(meta.description) : null,
                    keywords: '',
                    hasApp: Boolean(meta.hasApp),
                    appImport: appInfo.appImport
                });
            }

            return packages.map((pkg) => ({
                type: 'add',
                path: `apps/playground/src/pages/discoveries/${pkg.packageDir}.astro`,
                templateFile: 'templates/project-pages/project-pages.astro.hbs',
                data: {
                    packageName: pkg.package,
                    packageDir: pkg.packageDir,
                    id: pkg.packageDir,
                    title: pkg.title,
                    description: pkg.description || '',
                    keywords: pkg.keywords,
                    hasApp: pkg.hasApp,
                    appImport: pkg.appImport
                }
            }));
        }
    });
}

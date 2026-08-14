import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { Loader } from 'astro/loaders';

function findRepoRoot(start: string): string {
    let dir = path.resolve(start);
    while (dir !== path.parse(dir).root) {
        if (existsSync(path.join(dir, 'typedoc.base.json'))) return dir;
        dir = path.dirname(dir);
    }
    throw new Error('Could not find repo root (typedoc.base.json)');
}

function deriveTitle(pkgDir: string): string {
    return pkgDir
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function checkHasApp(
    packagesDir: string,
    pkgDir: string,
    pkgJson: Record<string, unknown>
): boolean {
    const appPath = path.join(packagesDir, pkgDir, 'src/App.tsx');
    if (existsSync(appPath)) return true;

    const exports = pkgJson.exports as Record<string, unknown> | undefined;
    if (!exports) return false;

    for (const val of Object.values(exports)) {
        if (
            typeof val === 'string' &&
            val.endsWith('.tsx') &&
            (val.includes('/App') || val.includes('/docs/'))
        ) {
            return true;
        }
    }
    return false;
}

export function apiDocsLoader(): Loader {
    return {
        name: 'api-docs-loader',
        async load(context) {
            const { store, config, logger } = context;
            const appRoot = fileURLToPath(config.root);
            const repoRoot = findRepoRoot(appRoot);
            const genRoot = path.join(appRoot, '.generated', 'api-docs');
            const packagesDir = path.join(repoRoot, 'packages');

            if (!existsSync(genRoot)) {
                logger.warn(
                    `[api-docs] no generated docs at ${genRoot}; run \`pnpm build-docs\` first`
                );
                return;
            }

            const pkgDirs = readdirSync(genRoot, { withFileTypes: true })
                .filter((entry) => entry.isDirectory())
                .map((entry) => entry.name);

            for (const pkgDir of pkgDirs) {
                const pkgName = `@repo/${pkgDir}`;
                const outDir = path.join(genRoot, pkgDir);
                const jsonPath = path.join(outDir, 'docs.json');
                const readmePath = path.join(packagesDir, pkgDir, 'README.md');
                const pkgJsonPath = path.join(packagesDir, pkgDir, 'package.json');

                if (!existsSync(jsonPath)) continue;

                let typedocData: unknown;
                try {
                    typedocData = JSON.parse(readFileSync(jsonPath, 'utf8'));
                } catch (err) {
                    logger.error(`[api-docs] failed to parse ${jsonPath}: ${String(err)}`);
                    continue;
                }

                let description: string | undefined;
                let pkgJson: Record<string, unknown> = {};
                if (existsSync(pkgJsonPath)) {
                    try {
                        pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8')) as Record<
                            string,
                            unknown
                        >;
                        description =
                            typeof pkgJson.description === 'string'
                                ? pkgJson.description
                                : undefined;
                    } catch (err) {
                        logger.warn(
                            `[api-docs] failed to parse ${pkgJsonPath}, continuing without description: ${String(err)}`
                        );
                    }
                }

                const hasApp = checkHasApp(packagesDir, pkgDir, pkgJson);
                const title = deriveTitle(pkgDir);
                const id = pkgDir;

                const readmeExists = existsSync(readmePath);
                const readmeRaw = readmeExists ? readFileSync(readmePath, 'utf8') : '';

                if (readmeRaw.startsWith('---')) {
                    logger.warn(
                        `[api-docs] ${pkgDir}/README.md still has frontmatter — title/description/hasApp now come from package.json, remove the frontmatter block`
                    );
                }

                const fileURL = pathToFileURL(
                    readmeExists ? readmePath : path.join(packagesDir, pkgDir)
                );
                const rendered = await context.renderMarkdown(readmeRaw, { fileURL });

                const data = await context.parseData({
                    id,
                    data: {
                        package: pkgName,
                        title,
                        description,
                        hasApp,
                        typedoc: typedocData
                    }
                });

                store.set({
                    id,
                    data,
                    filePath: path.relative(
                        appRoot,
                        readmeExists ? readmePath : path.join(packagesDir, pkgDir)
                    ),
                    rendered
                });
            }
        }
    };
}

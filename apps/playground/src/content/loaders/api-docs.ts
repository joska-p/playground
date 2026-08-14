import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { Loader } from 'astro/loaders';

const META_KEYS = ['title', 'description', 'hasApp'] as const;

export function anchorId(modulePath: string): string {
    return modulePath.replace(/\.mdx?$/, '').replace(/[./]/g, '-');
}

function findRepoRoot(start: string): string {
    let dir = path.resolve(start);
    while (dir !== path.parse(dir).root) {
        if (existsSync(path.join(dir, 'typedoc.base.json'))) return dir;
        dir = path.dirname(dir);
    }
    throw new Error('Could not find repo root (typedoc.base.json)');
}

function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

class Slugger {
    private seen = new Map<string, number>();

    slug(str: string): string {
        const base = slugify(str);
        if (!base) return '';
        const count = this.seen.get(base) ?? 0;
        this.seen.set(base, count + 1);
        return count === 0 ? base : `${base}-${String(count)}`;
    }
}

function stripFrontmatter(raw: string): string {
    if (!raw.startsWith('---')) return raw;
    const end = raw.indexOf('\n---', 3);
    if (end === -1) return raw;
    return raw.slice(end + 5);
}

function extractReadmeMeta(
    readmePath: string
): Partial<Record<(typeof META_KEYS)[number], string | boolean>> {
    const raw = readFileSync(readmePath, 'utf8');
    if (!raw.startsWith('---')) return {};
    const end = raw.indexOf('\n---', 3);
    if (end === -1) return {};

    const result: Partial<Record<(typeof META_KEYS)[number], string | boolean>> = {};
    for (const line of raw.slice(3, end).split('\n')) {
        const match = /^(\w+):\s*(.*?)\s*$/.exec(line);
        if (!match) continue;
        const key = match[1] as (typeof META_KEYS)[number];
        if (!META_KEYS.includes(key)) continue;
        const value = match[2].replace(/^"|"$/g, '');
        result[key] = key === 'hasApp' ? value === 'true' : value;
    }
    return result;
}

function transformContentOutsideCodeFences(
    content: string,
    transformer: (text: string) => string
): string {
    const parts = content.split(/(```[\s\S]*?```)/g);
    for (let i = 0; i < parts.length; i += 2) {
        parts[i] = transformer(parts[i]);
    }
    return parts.join('');
}

function transformDocs(
    content: string,
    opts: { pkgDir: string; ns: string; knownPkgDirs: Set<string> }
): string {
    const { pkgDir, ns, knownPkgDirs } = opts;

    return transformContentOutsideCodeFences(content, (text) => {
        const slugger = new Slugger();

        // 1. Headings → {#<ns>-<slug>}
        const processedLines = text.split('\n').map((line) => {
            const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
            if (!match) return line;
            const headingText = match[2];
            if (headingText.includes('{#')) return line;
            const slug = slugger.slug(headingText);
            if (!slug) return line;
            return `${match[1]} ${headingText} {#${ns}-${slug}}`;
        });
        let newText = processedLines.join('\n');

        // 2. Intra-file fragment links `](#frag)` → `](#<ns>-<frag>)`
        newText = newText.replace(/\]\(#([^)]+)\)/g, (_m, frag: string) => {
            if (!frag.trim()) return _m;
            return `](#${ns}-${frag})`;
        });

        // 3. Cross-package links `](../@repo.x.y.md[#frag])`
        newText = newText.replace(
            /\]\((@repo\.[^)]+?\.md)(?:#([^)]*))?\)/g,
            (_m, targetFile: string, frag?: string) => {
                const parts = targetFile.replace(/\.md$/, '').split('.');
                const targetPkgDir = parts[1];
                if (!knownPkgDirs.has(targetPkgDir)) return _m;
                const targetNs = parts.length > 2 ? anchorId(parts.slice(2).join('.')) : 'overview';
                const fragPart = frag?.trim() ? `-${frag.trim()}` : '';
                return `](/discoveries/${targetPkgDir}/#${targetNs}${fragPart})`;
            }
        );

        // 4. Intra-package links `](../README.md[#frag])` / `](../<module>.md[#frag])`
        newText = newText.replace(
            /\]\(\.\.\/([^)]+?\.md)(?:#([^)]*))?\)/g,
            (_m, targetFile: string, frag?: string) => {
                const base = targetFile.replace(/\.md$/, '');
                const targetNs =
                    base === 'README' || base === 'packages' || base === 'modules'
                        ? 'overview'
                        : anchorId(base);
                const fragPart = frag?.trim() ? `-${frag.trim()}` : '';
                return `](/discoveries/${pkgDir}/#${targetNs}${fragPart})`;
            }
        );

        // 5. Relative package links `](../<pkgDir>/)`
        newText = newText.replace(/\]\(\.\.\/([^)]+?)\/?\)/g, (_m, targetPkgDir: string) => {
            if (knownPkgDirs.has(targetPkgDir)) return `](/discoveries/${targetPkgDir}/)`;
            return _m;
        });

        // 6. Stale reference links `](/docs/reference/packages/<pkgDir>)`
        newText = newText.replace(
            /\]\(\/docs\/reference\/packages\/([^)]+)\)/g,
            (_m, targetPkgDir: string) => {
                return `](/discoveries/${targetPkgDir}/)`;
            }
        );

        // 7. Strip `.md` from `/docs/...` links
        newText = newText.replace(/\]\(\/docs\/([^)]+)\.md([^)]*)\)/g, '](/docs/$1$2)');

        return newText;
    });
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
            const knownPkgDirs = new Set(pkgDirs);

            for (const pkgDir of pkgDirs) {
                const pkgName = `@repo/${pkgDir}`;
                const outDir = path.join(genRoot, pkgDir);
                const readmePath = path.join(packagesDir, pkgDir, 'README.md');
                const readmeMeta = existsSync(readmePath) ? extractReadmeMeta(readmePath) : {};

                for (const file of readdirSync(outDir)) {
                    if (!file.endsWith('.mdx')) continue;
                    const base = file.replace(/\.mdx$/, '');
                    if (base === 'globals' || base === 'modules' || base === 'packages') continue;

                    const isPackage = base === 'README';
                    const ns = isPackage ? 'overview' : anchorId(base);
                    const id = `${pkgDir}/${base}`;

                    const data = isPackage
                        ? {
                              package: pkgName,
                              kind: 'package',
                              title: readmeMeta.title as string,
                              description: readmeMeta.description as string | undefined,
                              hasApp: readmeMeta.hasApp as boolean
                          }
                        : {
                              package: pkgName,
                              kind: 'module',
                              module: base.replace(/\./g, '/'),
                              title: base.replace(/\./g, '/')
                          };

                    const raw = readFileSync(path.join(outDir, file), 'utf8');
                    const transformed = transformDocs(stripFrontmatter(raw), {
                        pkgDir,
                        ns,
                        knownPkgDirs
                    });

                    const fileURL = pathToFileURL(path.join(outDir, file));
                    const rendered = await context.renderMarkdown(transformed, { fileURL });
                    const parsed = await context.parseData({ id, data });

                    store.set({
                        id,
                        data: parsed,
                        filePath: path.relative(appRoot, path.join(outDir, file)),
                        rendered
                    });
                }
            }
        }
    };
}

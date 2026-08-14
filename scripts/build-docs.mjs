import { execFileSync } from 'node:child_process';
import {
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    renameSync,
    rmSync,
    writeFileSync
} from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

function findRepoRoot(start) {
    let dir = path.resolve(start);
    while (dir !== path.parse(dir).root) {
        if (existsSync(path.join(dir, 'typedoc.base.json'))) {
            return dir;
        }
        dir = path.dirname(dir);
    }
    throw new Error('Could not find repo root (typedoc.base.json)');
}

const ROOT = findRepoRoot(process.cwd());
const API_DIR = path.join(ROOT, 'apps/playground/src/content/api');
const PACKAGES_DIR = path.join(ROOT, 'packages');
const TMP_DIR = path.join(ROOT, 'node_modules/.cache/build-docs');

const skipTypedoc = process.argv.includes('--no-typedoc');

function splitReadme(dir) {
    const raw = readFileSync(path.join(PACKAGES_DIR, dir, 'README.md'), 'utf8');
    if (!raw.startsWith('---')) return { frontmatter: {}, content: raw };
    const end = raw.indexOf('\n---', 3);
    if (end === -1) return { frontmatter: {}, content: raw };
    let frontmatter = {};
    try {
        const parsed = YAML.parse(raw.slice(3, end));
        frontmatter = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
        // Ignore unparsable frontmatter
    }
    return { frontmatter, content: raw.slice(end + 5) };
}

// Gather package info
const packagesInfo = [];
const knownPkgDirs = new Set();

for (const entry of readdirSync(PACKAGES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const pkgJsonPath = path.join(PACKAGES_DIR, entry.name, 'package.json');
    if (!existsSync(pkgJsonPath)) continue;

    const pkgDir = entry.name;
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
    const pkgName = pkgJson.name || `@repo/${pkgDir}`;

    knownPkgDirs.add(pkgDir);
    packagesInfo.push({ pkgDir, pkgName });
}

const pkgDirForName = (pkgName) => pkgName.replace(/^@repo\//, '');

if (!skipTypedoc) {
    rmSync(API_DIR, { recursive: true, force: true });
    mkdirSync(API_DIR, { recursive: true });
}

// 1. TypeDoc for every package
if (!skipTypedoc) {
    for (const { pkgDir, pkgName } of packagesInfo) {
        const cfgPath = path.join(PACKAGES_DIR, pkgDir, 'typedoc.json');
        const out = path.join(TMP_DIR, pkgDir);

        rmSync(out, { recursive: true, force: true });
        mkdirSync(out, { recursive: true });

        execFileSync('npx', ['typedoc', '--options', cfgPath, '--out', out], {
            cwd: path.join(PACKAGES_DIR, pkgDir),
            stdio: 'inherit'
        });

        const dottedName = pkgName.replace(/\//g, '.');
        for (const file of readdirSync(out)) {
            if (!file.endsWith('.mdx')) continue;
            const base = file.replace(/\.mdx$/, '');
            if (base === 'README' || base === 'packages' || base === 'modules' || base === 'globals') {
                continue;
            }
            renameSync(path.join(out, file), path.join(API_DIR, `${dottedName}.${base}.mdx`));
        }

        const readmeFile = path.join(out, 'README.mdx');
        if (existsSync(readmeFile)) {
            renameSync(readmeFile, path.join(API_DIR, `${dottedName}.mdx`));
        }

        rmSync(out, { recursive: true, force: true });
    }
}

// 2. Fallback: copy READMEs (used with `--no-typedoc`)
if (skipTypedoc) {
    for (const { pkgDir, pkgName } of packagesInfo) {
        const readmePath = path.join(PACKAGES_DIR, pkgDir, 'README.md');
        if (!existsSync(readmePath)) continue;

        const { frontmatter, content } = splitReadme(pkgDir);
        const fm = { ...frontmatter, package: pkgName, kind: 'package' };
        const dottedName = pkgName.replace(/\//g, '.');
        writeFileSync(
            path.join(API_DIR, `${dottedName}.mdx`),
            `---\n${YAML.stringify(fm)}---\n\n${content}`
        );
    }
}

// 3. Link transform
function transformContentOutsideCodeFences(content, transformer) {
    const parts = content.split(/(```[\s\S]*?```)/g);
    for (let i = 0; i < parts.length; i += 2) {
        parts[i] = transformer(parts[i]);
    }
    return parts.join('');
}

function discoveryHref(pkgName, modulePath, frag) {
    const pkgDir = pkgDirForName(pkgName);
    if (!knownPkgDirs.has(pkgDir)) return null;
    const fragPart = frag && frag.trim() ? `#${frag.trim()}` : '';
    if (!modulePath) return `/discoveries/${pkgDir}/${fragPart}`;
    return `/discoveries/${pkgDir}/${modulePath}/${fragPart}`;
}

function transformMdx(content, pkgName) {
    return transformContentOutsideCodeFences(content, (text) => {
        // Cross-package typedoc links `](../@repo.x.y.md)` / `](../@repo.x.y.md#frag)`
        text = text.replace(/\]\((@repo\.[^)]+?\.md)(?:#([^)]*))?\)/g, (_m, targetFile, frag) => {
            const targetId = targetFile.replace(/\.md$/, '');
            const parts = targetId.split('.');
            const targetPkg = `@repo/${parts[1]}`;
            const modulePath = parts.slice(2).join('.');
            const href = discoveryHref(targetPkg, modulePath, frag);
            return href ? `](${href})` : _m;
        });

        // Intra-package typedoc links `](../README.md)` / `](../<module>.md#frag)`
        text = text.replace(/\]\(\.\.\/([^)]+?\.md)(?:#([^)]*))?\)/g, (_m, targetFile, frag) => {
            const base = targetFile.replace(/\.md$/, '');
            if (base === 'README' || base === 'packages' || base === 'modules') {
                const href = discoveryHref(pkgName, '', frag);
                return href ? `](${href})` : _m;
            }
            const href = discoveryHref(pkgName, base, frag);
            return href ? `](${href})` : _m;
        });

        // Relative package links `](../<pkgDir>/)`
        text = text.replace(/\]\(\.\.\/([^)]+?)\/?\)/g, (_m, pkgDir) => {
            if (knownPkgDirs.has(pkgDir)) {
                return `](/discoveries/${pkgDir}/)`;
            }
            return _m;
        });

        // Stale reference links `](/docs/reference/packages/<pkgDir>)`
        text = text.replace(/\]\(\/docs\/reference\/packages\/([^)]+)\)/g, (_m, pkgDir) => {
            return `](/discoveries/${pkgDir}/)`;
        });

        // Strip `.md` from `/docs/...` links
        text = text.replace(/\]\(\/docs\/([^)]+)\.md([^)]*)\)/g, '](/docs/$1$2)');

        return text;
    });
}

for (const file of readdirSync(API_DIR)) {
    if (!file.endsWith('.mdx')) continue;
    const dottedName = file.replace(/\.mdx$/, '');
    const parts = dottedName.split('.');
    if (parts[0] !== '@repo' || parts.length < 2) continue;
    const pkgName = `@repo/${parts[1]}`;
    const full = path.join(API_DIR, file);
    const content = readFileSync(full, 'utf8');
    writeFileSync(full, transformMdx(content, pkgName));
}

rmSync(path.join(API_DIR, '_media'), { recursive: true, force: true });

const fileCount = readdirSync(API_DIR).filter((f) => f.endsWith('.mdx')).length;
console.log(`[build-docs] processed ${fileCount} api files across ${packagesInfo.length} packages`);

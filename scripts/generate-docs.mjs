import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

function findRepoRoot(start) {
    let dir = path.resolve(start);
    while (dir !== path.parse(dir).root) {
        if (existsSync(path.join(dir, 'typedoc.docs.json'))) {
            return dir;
        }
        dir = path.dirname(dir);
    }
    throw new Error('Could not find repo root (typedoc.docs.json)');
}

const ROOT = findRepoRoot(process.cwd());
const API_DIR = path.join(ROOT, 'apps/playground/src/content/api');
const PROJECTS_PATH = path.join(ROOT, 'apps/playground/src/content/projects.yml');
const PACKAGES_DIR = path.join(ROOT, 'packages');

const skipTypedoc = process.argv.includes('--no-typedoc');

if (!skipTypedoc) {
    execFileSync('npx', ['typedoc', '--options', path.join(ROOT, 'typedoc.docs.json')], {
        cwd: ROOT,
        stdio: 'inherit'
    });

    rmSync(path.join(API_DIR, '_media'), { recursive: true, force: true });

    for (const name of ['README.md', 'packages.md']) {
        rmSync(path.join(API_DIR, name), { force: true });
    }
}

function parseFileName(name) {
    const base = name.replace(/\.md$/, '');
    const parts = base.split('.');
    if (parts[0] !== '@repo') {
        return null;
    }
    const pkg = `@repo/${parts[1]}`;
    const rest = parts.slice(2);
    const isInternal = rest.at(-1) === '<internal>';
    const moduleSegments = isInternal ? rest.slice(0, -1) : rest;
    return {
        pkg,
        packageDir: parts[1],
        module: moduleSegments.join('/'),
        moduleSegments,
        isInternal,
        kind: isInternal ? 'internal' : moduleSegments.length ? 'module' : 'package'
    };
}

function entryNamespace(id) {
    const parts = id.split('.');
    const isInternal = parts.at(-1) === '<internal>';
    const rest = isInternal ? parts.slice(2, -1) : parts.slice(2);
    if (rest.length === 0) {
        return isInternal ? 'overview-internal' : 'overview';
    }
    const baseNs = rest.join('-');
    return isInternal ? `${baseNs}-internal` : baseNs;
}

function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

class Slugger {
    constructor() {
        this.seen = new Map();
    }
    slug(str) {
        const base = slugify(str);
        if (!base) return '';
        const count = this.seen.get(base) || 0;
        this.seen.set(base, count + 1);
        if (count === 0) return base;
        return `${base}-${count}`;
    }
}

function collectMdFiles(dir) {
    const files = [];
    if (!existsSync(dir)) return files;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...collectMdFiles(full));
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            files.push(full);
        }
    }
    return files;
}

function extractDescription(content) {
    const match = content.match(/^>\s*(.+)$/m);
    return match?.[1] ?? undefined;
}

function transformContentOutsideCodeFences(content, transformer) {
    const parts = content.split(/(```[\s\S]*?```)/g);
    for (let i = 0; i < parts.length; i += 2) {
        parts[i] = transformer(parts[i]);
    }
    return parts.join('');
}

function getAppImport(pkgName, pkgJson) {
    if (!pkgJson.exports) return { hasApp: false, appImport: '' };

    const tsxExports = [];
    for (const [key, val] of Object.entries(pkgJson.exports)) {
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
    const appImport = `${pkgName}${subPath}`;
    return { hasApp: true, appImport };
}

// Load projects.yml
let projects = [];
if (existsSync(PROJECTS_PATH)) {
    const raw = readFileSync(PROJECTS_PATH, 'utf8');
    projects = YAML.parse(raw) || [];
}

const projectByPackageDir = new Map();
for (const proj of projects) {
    if (proj.packageDir) {
        projectByPackageDir.set(proj.packageDir, proj);
    }
}

// Scan packages/
const packagesInfo = [];
const packageDirToRouteId = new Map();

if (existsSync(PACKAGES_DIR)) {
    const entries = readdirSync(PACKAGES_DIR, { withFileTypes: true });
    for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const pkgDir = entry.name;
        const pkgJsonPath = path.join(PACKAGES_DIR, pkgDir, 'package.json');
        if (!existsSync(pkgJsonPath)) continue;

        const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
        const pkgName = pkgJson.name || `@repo/${pkgDir}`;
        const proj = projectByPackageDir.get(pkgDir);

        let routeId = pkgDir;
        let title = pkgName;
        let description = null;
        let keywords = '';

        if (proj) {
            routeId = proj.id;
            title = proj.title;
            description = proj.description || null;
            keywords = Array.isArray(proj.tags) ? proj.tags.join(', ') : '';
        }

        const appInfo = getAppImport(pkgName, pkgJson);
        packageDirToRouteId.set(pkgDir, routeId);

        packagesInfo.push({
            package: pkgName,
            packageDir: pkgDir,
            routeId,
            title,
            description,
            keywords,
            hasApp: appInfo.hasApp,
            appImport: appInfo.appImport
        });
    }
}

// Process markdown files
const entriesInfo = [];
let updatedCount = 0;

for (const file of collectMdFiles(API_DIR)) {
    const filename = path.basename(file);
    const meta = parseFileName(filename);
    if (!meta) continue;

    const id = filename.replace(/\.md$/, '');
    const ns = entryNamespace(id);
    let content = readFileSync(file, 'utf8');

    // Clean old injected frontmatter if re-running
    if (content.startsWith('---')) {
        const endFm = content.indexOf('---\n\n', 3);
        if (endFm !== -1) {
            content = content.slice(endFm + 5);
        } else {
            const endFmAlt = content.indexOf('---\n', 3);
            if (endFmAlt !== -1) {
                content = content.slice(endFmAlt + 4);
            }
        }
    }

    let title;
    if (meta.kind === 'package') {
        title = meta.pkg;
    } else if (meta.kind === 'internal') {
        title = meta.module ? `${meta.module} (internal)` : `${meta.pkg} (internal)`;
    } else {
        title = meta.module;
    }
    const description = meta.kind === 'package' ? extractDescription(content) : undefined;

    content = transformContentOutsideCodeFences(content, (text) => {
        const slugger = new Slugger();

        // 1. Headings
        const lines = text.split('\n');
        const processedLines = lines.map((line) => {
            const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*$/);
            if (!headingMatch) return line;

            const hashes = headingMatch[1];
            const headingText = headingMatch[2];

            if (headingText.includes('{#')) return line;

            const headingSlug = slugger.slug(headingText);
            if (!headingSlug) return line;

            return `${hashes} ${headingText} {#${ns}-${headingSlug}}`;
        });

        let newText = processedLines.join('\n');

        // 2. Links (Intra-file FIRST, then Cross-file)
        // Intra-file `](#frag)` → `](#<ns>-<frag>)`
        newText = newText.replace(/\]\(#([^)]+)\)/g, (_match, frag) => {
            if (!frag.trim()) return _match;
            return `](#${ns}-${frag})`;
        });

        // Cross-file `](@repo.x.y.md#frag)` → `](#<ns2>-<frag>)`; `](@repo.x.y.md)` → `](#<ns2>)`
        newText = newText.replace(
            /\]\((@repo\.[^)]+?\.md)(?:#([^)]*))?\)/g,
            (_match, targetFile, frag) => {
                const targetId = targetFile.replace(/\.md$/, '');
                const targetNs = entryNamespace(targetId);
                if (frag && frag.trim()) {
                    return `](#${targetNs}-${frag})`;
                }
                return `](#${targetNs})`;
            }
        );

        // 3. Stale README link fixes
        // `](/docs/reference/packages/<pkg>)` → `](/discoveries/<routeId>/)`
        newText = newText.replace(
            /\]\(\/docs\/reference\/packages\/([^)]+)\)/g,
            (_match, pkgDir) => {
                const routeId = packageDirToRouteId.get(pkgDir) || pkgDir;
                return `](/discoveries/${routeId}/)`;
            }
        );

        // Relative package links `](../<pkg>/)` → `](/discoveries/<routeId>/)`
        newText = newText.replace(/\]\(\.\.\/([^)]+?)\/?\)/g, (_match, pkgDir) => {
            const routeId = packageDirToRouteId.get(pkgDir);
            if (routeId) {
                return `](/discoveries/${routeId}/)`;
            }
            return _match;
        });

        // strip `.md` from `/docs/...` links
        newText = newText.replace(/\]\(\/docs\/([^)]+)\.md([^)]*)\)/g, '](/docs/$1$2)');

        return newText;
    });

    const frontmatter = {
        title,
        package: meta.pkg,
        kind: meta.kind
    };
    if (meta.module) frontmatter.module = meta.module;
    if (description) frontmatter.description = description;

    const fmString = `---\n${YAML.stringify(frontmatter)}---\n\n`;
    writeFileSync(file, fmString + content);

    entriesInfo.push({
        id,
        package: meta.pkg,
        kind: meta.kind,
        module: meta.module || null,
        title,
        description: description || null,
        namespace: ns
    });

    updatedCount++;
}

// Emit index.json
const indexData = {
    version: 1,
    packages: packagesInfo,
    entries: entriesInfo
};

const indexPath = path.join(API_DIR, 'index.json');
writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

console.log(`[generate-docs] processed ${updatedCount} api files and wrote index.json`);

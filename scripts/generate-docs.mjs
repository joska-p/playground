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

execFileSync('npx', ['typedoc', '--options', path.join(ROOT, 'typedoc.docs.json')], {
    cwd: ROOT,
    stdio: 'inherit'
});

// typedoc-plugin-markdown's copyMediaFiles copies the merged project.files map, which in
// packages mode includes whole package directories (node_modules, etc.). Nothing on the
// plugin side disables it, so drop the directory after generation.
rmSync(path.join(API_DIR, '_media'), { recursive: true, force: true });

// Root-level index pages describe the merged project, not a single package. The site
// builds its own navigation, so these would pollute the api content collection.
for (const name of ['README.md', 'packages.md']) {
    rmSync(path.join(API_DIR, name), { force: true });
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
        module: moduleSegments.join('/'),
        kind: isInternal ? 'internal' : moduleSegments.length ? 'module' : 'package'
    };
}

function collectMdFiles(dir) {
    const files = [];
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

function toFrontmatter(meta) {
    const frontmatter = {
        title: meta.title,
        package: meta.pkg,
        kind: meta.kind
    };
    if (meta.module) {
        frontmatter.module = meta.module;
    }
    if (meta.description) {
        frontmatter.description = meta.description;
    }
    return `---\n${YAML.stringify(frontmatter)}---\n\n`;
}

let updated = 0;
for (const file of collectMdFiles(API_DIR)) {
    const meta = parseFileName(path.basename(file));
    if (!meta) {
        continue;
    }
    const content = readFileSync(file, 'utf8');
    let title;
    if (meta.kind === 'package') {
        title = meta.pkg;
    } else if (meta.kind === 'internal') {
        title = meta.module ? `${meta.module} (internal)` : `${meta.pkg} (internal)`;
    } else {
        title = meta.module;
    }
    const description = meta.kind === 'package' ? extractDescription(content) : undefined;
    writeFileSync(file, toFrontmatter({ ...meta, title, description }) + content);
    updated += 1;
}

console.log(`[generate-docs] frontmatter injected into ${updated} api files`);

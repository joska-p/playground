import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { ReflectionKind } from 'typedoc';
import { MarkdownPageEvent } from 'typedoc-plugin-markdown';
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

const META_KEYS = ['title', 'description', 'hasApp'];

function extractFrontmatter(raw) {
    if (!raw.startsWith('---')) return {};
    const end = raw.indexOf('\n---', 3);
    if (end === -1) return {};
    const block = raw.slice(3, end);
    try {
        const parsed = YAML.parse(block);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            const result = {};
            for (const key of META_KEYS) {
                if (parsed[key] !== undefined) result[key] = parsed[key];
            }
            return result;
        }
    } catch {
        // Ignore unparsable frontmatter
    }
    return {};
}

export function load(app) {
    app.renderer.on(MarkdownPageEvent.BEGIN, (page) => {
        const pkgName = page.project.packageName;
        if (!pkgName || !pkgName.startsWith('@repo/')) return;

        const frontmatter = { ...(page.frontmatter || {}), package: pkgName };

        if (page.model?.kind === ReflectionKind.Project) {
            const root = findRepoRoot(process.cwd());
            const packageDir = pkgName.slice('@repo/'.length);
            const readmePath = path.join(root, 'packages', packageDir, 'README.md');
            const raw = existsSync(readmePath) ? readFileSync(readmePath, 'utf8') : '';
            Object.assign(frontmatter, { kind: 'package' }, extractFrontmatter(raw));
        } else {
            frontmatter.kind = 'module';
            frontmatter.module = page.model.name;
            frontmatter.title = page.model.name;
        }

        page.frontmatter = frontmatter;
    });
}

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';

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
const PACKAGES_DIR = path.join(ROOT, 'packages');
const OUT_DIR = path.join(ROOT, 'apps/playground/.generated/api-docs');

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

let built = 0;
for (const entry of readdirSync(PACKAGES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const pkgDir = entry.name;
    const cfgPath = path.join(PACKAGES_DIR, pkgDir, 'typedoc.json');
    if (!existsSync(cfgPath)) continue;

    const out = path.join(OUT_DIR, pkgDir);
    mkdirSync(out, { recursive: true });

    execFileSync('npx', ['typedoc', '--options', cfgPath, '--out', out], {
        cwd: path.join(PACKAGES_DIR, pkgDir),
        stdio: 'inherit'
    });

    built++;
}

console.log(`[build-docs] generated api docs for ${built} packages into ${OUT_DIR}`);

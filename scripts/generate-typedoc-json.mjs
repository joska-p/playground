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
let failed = 0;
const failedPackages = [];

for (const entry of readdirSync(PACKAGES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const pkgDir = entry.name;
    const cfgPath = path.join(PACKAGES_DIR, pkgDir, 'typedoc.json');
    if (!existsSync(cfgPath)) continue;

    const out = path.join(OUT_DIR, pkgDir);
    mkdirSync(out, { recursive: true });

    try {
        execFileSync(
            'npx',
            ['typedoc', '--options', cfgPath, '--json', path.join(out, 'docs.json')],
            {
                cwd: path.join(PACKAGES_DIR, pkgDir),
                stdio: 'inherit'
            }
        );
        built++;
    } catch (err) {
        failed++;
        failedPackages.push(pkgDir);
        // typedoc already printed its own error via stdio: 'inherit' above;
        // this just keeps one broken package from taking the whole build down.
        console.warn(
            `[generate-typedoc-json] "${pkgDir}" failed to build, skipping (see typedoc output above)`
        );
    }
}

const summary = [
    `[generate-typedoc-json] generated api docs for ${built} package(s) into ${OUT_DIR}`
];
if (failed > 0) {
    summary.push(`${failed} failed: ${failedPackages.join(', ')}`);
}
console.log(summary.join(' — '));

import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('apps/playground/dist');

const targets = [
    // [Source Path, Target Path inside apps/playground/dist]
    ['packages/glaze/dist/docs', 'docs/glaze'],
    ['apps/storybook/storybook-static', 'storybook']
    // How to add more docs in the future:
    // ['packages/math/dist-docs', 'docs/math'],
    // ['packages/ui/dist-docs', 'docs/ui'],
];

for (const [src, dest] of targets) {
    const fullSrc = path.resolve(src);
    const fullDest = path.join(DIST_DIR, dest);

    if (fs.existsSync(fullSrc)) {
        fs.mkdirSync(fullDest, { recursive: true });
        fs.cpSync(fullSrc, fullDest, { recursive: true });
        console.log(`✓ Copied ${src} -> apps/playground/dist/${dest}`);
    } else {
        console.warn(`⚠ Skip: Source "${src}" does not exist.`);
    }
}

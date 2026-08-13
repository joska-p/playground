import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('apps/playground/dist');

const targets = [
    // [Source Path, Target Path inside apps/playground/dist]
    ['apps/storybook/storybook-static', 'storybook']
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

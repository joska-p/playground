import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('apps/playground/dist');

const targets = [
    // [Source Path, Target Path inside apps/playground/dist]
    ['apps/storybook/storybook-static', 'storybook'],
    // Package docs are generated per-package by `build:docs` (TypeDoc → dist-docs)
    // and merged into the site at build time. Add each documented package here:
    ['packages/art-canvas/dist-docs', 'docs/api/art-canvas'],
    ['packages/automa/dist-docs', 'docs/api/automa'],
    ['packages/automa-engine/dist-docs', 'docs/api/automa-engine'],
    ['packages/fracture/dist-docs', 'docs/api/fracture'],
    ['packages/glaze/dist-docs', 'docs/api/glaze'],
    ['packages/l-system-engine/dist-docs', 'docs/api/l-system-engine'],
    ['packages/palette-engine/dist-docs', 'docs/api/palette-engine'],
    ['packages/pixel/dist-docs', 'docs/api/pixel'],
    ['packages/pixel-engine/dist-docs', 'docs/api/pixel-engine'],
    ['packages/pixel-manipulator/dist-docs', 'docs/api/pixel-manipulator'],
    ['packages/radu-machine-learning/dist-docs', 'docs/api/radu-machine-learning'],
    ['packages/randomart-engine/dist-docs', 'docs/api/randomart-engine'],
    ['packages/randomart-engine-next/dist-docs', 'docs/api/randomart-engine-next'],
    ['packages/sequence-renderer/dist-docs', 'docs/api/sequence-renderer'],
    ['packages/three-stage/dist-docs', 'docs/api/three-stage'],
    ['packages/ui/dist-docs', 'docs/api/ui']
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

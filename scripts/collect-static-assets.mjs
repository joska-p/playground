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
    ['packages/graph-viz/dist-docs', 'docs/api/graph-viz'],
    ['packages/image-to-particles/dist-docs', 'docs/api/image-to-particles'],
    ['packages/l-system/dist-docs', 'docs/api/l-system'],
    ['packages/l-system-engine/dist-docs', 'docs/api/l-system-engine'],
    ['packages/mosaic-maker/dist-docs', 'docs/api/mosaic-maker'],
    ['packages/oeis-signal/dist-docs', 'docs/api/oeis-signal'],
    ['packages/palette-engine/dist-docs', 'docs/api/palette-engine'],
    ['packages/palette-generator/dist-docs', 'docs/api/palette-generator'],
    ['packages/pixel/dist-docs', 'docs/api/pixel'],
    ['packages/pixel-engine/dist-docs', 'docs/api/pixel-engine'],
    ['packages/pixel-manipulator/dist-docs', 'docs/api/pixel-manipulator'],
    ['packages/radu-machine-learning/dist-docs', 'docs/api/radu-machine-learning'],
    ['packages/randomart/dist-docs', 'docs/api/randomart'],
    ['packages/randomart-engine/dist-docs', 'docs/api/randomart-engine'],
    ['packages/randomart-engine-next/dist-docs', 'docs/api/randomart-engine-next'],
    ['packages/randomart-next/dist-docs', 'docs/api/randomart-next'],
    ['packages/real-life/dist-docs', 'docs/api/real-life'],
    ['packages/sequence-engine/dist-docs', 'docs/api/sequence-engine'],
    ['packages/sequence-renderer/dist-docs', 'docs/api/sequence-renderer'],
    ['packages/three-stage/dist-docs', 'docs/api/three-stage'],
    ['packages/ui/dist-docs', 'docs/api/ui'],
    ['packages/worker-pool/dist-docs', 'docs/api/worker-pool']
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

#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PACKAGES_DIR = path.join(ROOT, 'packages');
const REF_DIR = path.join(
  ROOT,
  'apps/playground/src/content/docs/reference/packages'
);

const PACKAGE_NAMES = {
  automa: 'automa',
  'mosaic-maker': 'Mosaic Maker',
  'sequence-renderer': 'Sequence Renderer',
  'image-manipulator': 'Image Manipulator',
  'image-to-particles': 'Image to Particles',
  'palette-generator': 'Palette Generator',
  'graph-viz': 'Graph Visualization',
  'image-pipeline': 'Image Pipeline',
  'three-stage': 'Three Stage',
  'radu-machine-learning': 'Radu Machine Learning',
  ui: 'UI Components',
};

function kebabToTitle(name) {
  return name
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

async function hasPackageJson(dir) {
  try {
    await readFile(path.join(dir, 'package.json'), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

function escapeFrontmatter(value) {
  return value.replace(/"/g, '\\"').replace(/\n/g, ' ');
}

async function main() {
  await mkdir(REF_DIR, { recursive: true });

  const entries = await readdir(PACKAGES_DIR, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const pkgDir = path.join(PACKAGES_DIR, entry.name);

    if (!(await hasPackageJson(pkgDir))) {
      continue;
    }

    const readmePath = path.join(pkgDir, 'README.md');
    let content;
    try {
      content = await readFile(readmePath, 'utf-8');
    } catch {
      console.warn(`  ⚠  ${entry.name} — no README.md`);
      continue;
    }

    const displayName = PACKAGE_NAMES[entry.name] || kebabToTitle(entry.name);

    const lines = content.split('\n');
    const tagline =
      lines.find((l) => l.startsWith('> '))?.slice(2) ||
      `${displayName} package`;

    const doc = `---
title: "${escapeFrontmatter(displayName)}"
description: "${escapeFrontmatter(tagline)}"
category: "reference"
tags:
  - reference
  - ${entry.name}
order: 20
---

${content}
`;

    await writeFile(path.join(REF_DIR, `${entry.name}.md`), doc);
    console.log(`  ✓  ${entry.name} → reference/packages/${entry.name}.md`);
    count++;
  }

  console.log(`\nDone. ${count} package docs synced.`);

  const prune = process.argv.includes('--prune');
  if (prune) {
    console.log('\nPruning stale reference docs…');
    let pruned = 0;
    const refFiles = await readdir(REF_DIR);
    for (const file of refFiles) {
      if (!file.endsWith('.md')) continue;
      const pkgName = file.replace(/\.md$/, '');
      const pkgDir = path.join(PACKAGES_DIR, pkgName);
      const readmePath = path.join(pkgDir, 'README.md');
      try {
        await readFile(readmePath, 'utf-8');
      } catch {
        await unlink(path.join(REF_DIR, file));
        console.log(`  ✗  ${file} — source package removed`);
        pruned++;
      }
    }
    if (pruned === 0) console.log('  (none to prune)');
    console.log(`\nPruned ${pruned} stale doc(s).`);
  }
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});

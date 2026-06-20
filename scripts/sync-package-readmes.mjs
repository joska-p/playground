#!/usr/bin/env node
import { mkdir, readdir, readFile, unlink, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PACKAGES_DIR = path.join(ROOT, 'packages');
const ENGINES_DIR = path.join(ROOT, 'packages/engines');
const REF_DIR = path.join(
  ROOT,
  'apps/playground/src/content/docs/reference/packages'
);

const PACKAGE_NAMES = {
  automa: 'automa',
  'automa-engine': 'Automa Engine',
  'mosaic-maker': 'Mosaic Maker',
  'sequence-renderer': 'Sequence Renderer',
  'sequence-engine': 'Sequence Engine',
  'image-manipulator': 'Image Manipulator',
  'image-to-particles': 'Image to Particles',
  'palette-generator': 'Palette Generator',
  'graph-viz': 'Graph Visualization',
  'image-pipeline': 'Image Pipeline',
  'three-stage': 'Three Stage',
  'radu-machine-learning': 'Radu Machine Learning',
  ui: 'UI Components',
  'worker-pool': 'A pool of worker'
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

  const rootEntries = await readdir(PACKAGES_DIR, { withFileTypes: true });
  const engineEntries = await readdir(ENGINES_DIR, { withFileTypes: true });
  const allPackages = [
    ...rootEntries
      .filter((e) => e.isDirectory() && e.name !== 'engines')
      .map((e) => ({ dir: PACKAGES_DIR, name: e.name })),
    ...engineEntries
      .filter((e) => e.isDirectory())
      .map((e) => ({ dir: ENGINES_DIR, name: e.name }))
  ];

  let count = 0;

  for (const pkg of allPackages) {
    const pkgDir = path.join(pkg.dir, pkg.name);

    if (!(await hasPackageJson(pkgDir))) {
      continue;
    }

    const readmePath = path.join(pkgDir, 'README.md');
    let content;
    try {
      content = await readFile(readmePath, 'utf-8');
    } catch {
      console.warn(`  ⚠  ${pkg.name} — no README.md`);
      continue;
    }

    const displayName = PACKAGE_NAMES[pkg.name] || kebabToTitle(pkg.name);

    const lines = content.split('\n');

    // Gather the first contiguous blockquote as the tagline (package subtitle),
    // then strip it from content to avoid duplication — SectionHeader shows it.
    const taglineStart = lines.findIndex((l) => l.startsWith('> '));
    let taglineEnd = taglineStart;
    if (taglineStart !== -1) {
      while (taglineEnd < lines.length && lines[taglineEnd].startsWith('> ')) {
        taglineEnd++;
      }
    }

    const tagline =
      taglineStart !== -1
        ? lines
            .slice(taglineStart, taglineEnd)
            .map((l) => l.slice(2).trim())
            .join(' ')
        : `${displayName} package`;

    // Remove the tagline blockquote lines from the content
    const cleanContent =
      taglineStart !== -1
        ? [...lines.slice(0, taglineStart), ...lines.slice(taglineEnd)]
            .join('\n')
            .replace(/\n{3,}/g, '\n\n')
        : content;

    const doc = `---
title: "${escapeFrontmatter(displayName)}"
description: "${escapeFrontmatter(tagline)}"
category: "reference"
tags:
  - reference
  - ${pkg.name}
order: 20
---

${cleanContent}
`;

    await writeFile(path.join(REF_DIR, `${pkg.name}.md`), doc);
    console.log(`  ✓  ${pkg.name} → reference/packages/${pkg.name}.md`);
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

      const pkgDirRoot = path.join(PACKAGES_DIR, pkgName);
      const pkgDirEngine = path.join(ENGINES_DIR, pkgName);

      let exists = false;
      for (const dir of [pkgDirRoot, pkgDirEngine]) {
        try {
          await readFile(path.join(dir, 'README.md'), 'utf-8');
          exists = true;
          break;
        } catch {
          // ignore
        }
      }

      if (!exists) {
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

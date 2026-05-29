#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PACKAGES_DIR = path.join(ROOT, "packages");
const REF_DIR = path.join(ROOT, "apps/playground/src/content/docs/reference/packages");

const PACKAGE_NAMES = {
  "mosaic-maker": "Mosaic Maker",
  "sequence-renderer": "Sequence Renderer",
  "image-manipulator": "Image Manipulator",
  "image-to-particles": "Image to Particles",
  "palette-generator": "Palette Generator",
  "graph-viz": "Graph Visualization",
  ui: "UI Components",
};

async function main() {
  await mkdir(REF_DIR, { recursive: true });

  const entries = await readdir(PACKAGES_DIR, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const readmePath = path.join(PACKAGES_DIR, entry.name, "README.md");
    const content = await readFile(readmePath, "utf-8").catch(() => null);
    if (content === null) {
      console.warn(`  ⚠  ${entry.name} — no README.md`);
      continue;
    }

    const displayName = PACKAGE_NAMES[entry.name] || entry.name;

    const lines = content.split("\n");
    const tagline = lines.find((l) => l.startsWith("> "))?.slice(2) || `${displayName} package`;

    const doc = `---
title: "${displayName}"
description: "${tagline}"
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
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});

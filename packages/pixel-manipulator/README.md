---
title: "Pixel Manipulator"
description: "Interactive React workbench for browser image manipulation — build, run, and inspect pixel workflows."
hasApp: true
---


# @repo/pixel-manipulator

> A ready-made React workbench for browser image manipulation — upload an image,
> chain manipulation steps into a workflow, and inspect every stage of the result.

---

## Essence

Pixel Manipulator is the interactive shell of the pixel-manipulation stack. It
ships a self-contained React component that turns the manipulation engine into a
visual workbench: upload an image, assemble a chain of manipulation steps, tune
their arguments, run the pipeline, and compare each step's output side by side.

The pixel math lives elsewhere — `@repo/pixel` (and the engine underneath it)
executes the pipeline in a Web Worker pool and returns one `ImageData` snapshot
per step. This package owns everything around that: the upload flow, the
workflow builder, the preset library, the output grid, and the store that wires
them together. It is the UI half; the engine is the compute half.

## Quick Launch

The component ships as a single export and is mounted by the playground:

```bash
pnpm dev --filter @repo/playground
```

Or install it into your own React app:

```bash
pnpm add @repo/pixel-manipulator
```

```tsx
import { App as PixelManipulator } from '@repo/pixel-manipulator/pixel-manipulator';

function Demo() {
    return <PixelManipulator />;
}
```

## Usage Examples

The component is fully self-contained — the flow is: drop or pick an image,
assemble a workflow, execute it, and browse the results:

1. **Upload** an image via the file picker or drag-and-drop. It is decoded into
   `ImageData` and becomes the workflow's source.
2. **Build a workflow** — add manipulation steps from the engine's catalog, load
   one of the 8 pre-tuned presets, then reorder, remove, or tune each step's
   arguments with sliders.
3. **Execute** the workflow. The engine runs every step in a Web Worker pool and
   returns one snapshot per step.
4. **Inspect the outputs** — a grid of cards (source plus each step), a compare
   slider for before/after, a zoom lightbox, and per-result PNG download.

### Headless use

The workbench is optional. If you only need the pipeline, skip this package and
drive `@repo/pixel` directly with a step list and an `ImageData` source.

## Field Notes

- **The Catalyst:** Image manipulation UIs all need the same loop — pick an
  image, apply a chain of transforms, and show the user what changed. Rather
  than embedding that loop in a single demo page, it ships as a package any
  project can mount.

- **Quirks & Anomalies:** Workflow state lives in a zustand store and the
  components subscribe through selectors — the store is the single source of
  truth, not React props. The engine fuses consecutive per-pixel steps into a
  single pass, yet every step still yields its own snapshot, so the outputs
  always show the full progression; neighborhood and global steps act as fences
  in that fusion.

- **Future Horizons:** Streaming manipulation over video frames, a plugin
  registry for custom steps with declared metadata and parameter ranges, and
  GPU-accelerated execution via WebGPU compute — all without changing the
  upload-build-run-inspect loop.

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_

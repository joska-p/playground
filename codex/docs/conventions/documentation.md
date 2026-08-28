---
title: Documentation
description: Package docs are generated from code (TSDoc + TypeDoc) with the README as the concept layer.
---

# Documentation

Each package documents itself in two layers. The `README.md` carries the concepts: purpose, quick start, usage, gotchas. It is the local spec, stable across refactors. The API reference generates from the code.

```bash
pnpm generate-typedoc-json
```

Generated docs land in `codex/ateliers/typedoc-pipeline/.generated/api-docs/`, load into the `packages` content collection through a custom loader, and serve from `apps/playground` (Astro) at `/discoveries/<package>/`. Each page holds the README overview plus every exported symbol as an anchored section.

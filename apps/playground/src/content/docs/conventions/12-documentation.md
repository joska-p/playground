---
title: Documentation
description: Package docs are generated from code (TSDoc + TypeDoc) with the README as the concept layer.
tags:
    - conventions
    - reference
---

# Documentation

## Contents

- [Rule](#rule)

## Rule

- Each package's `README.md` documents **concepts** — purpose, quick start,
  usage, gotchas. Keep it simple; it is the local spec, not an API inventory.
- The **API reference is generated** from the code: add TSDoc comments to
  exported symbols, then run:
    ```bash
    pnpm build-docs
    ```
- Generated docs are output to `apps/playground/.generated/api-docs/`, loaded into the `api` content collection by a custom loader, and served by `apps/playground` (Astro) at `/discoveries/<package>/` — one page per package with the README overview and every exported symbol as an anchored section.

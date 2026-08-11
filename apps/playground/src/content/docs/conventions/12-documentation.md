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
    pnpm build:docs && pnpm collect-assets
    ```
- Generated docs are served at `/docs/api/<package>/` and never edited by hand.

---
title: Documentation
description: READMEs as the source of truth, synced to the Astro docs site.
tags:
  - conventions
  - reference
---

# Documentation

## Contents

- [Rule](#rule)

## Rule

- Each package's `README.md` is the source of truth for its docs.
- After updating a package README, sync to the Astro docs site:
  ```bash
  pnpm --filter @repo/playground sync-package-docs
  ```

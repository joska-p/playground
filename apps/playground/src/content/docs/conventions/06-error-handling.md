---
title: 'Error Handling'
description: 'Using the shared ErrorBoundary and never silently swallowing errors.'
category: 'conventions'
tags:
  - reference
---

# Error Handling

## Contents

- [Rule](#rule)

## Rule

- Use `@repo/ui/ErrorBoundary` — don't create one from scratch. Place at every route boundary minimum. Add a feature-level boundary for self-contained widgets. Do not wrap every component.
- Never silently swallow errors (`catch (e) {}`).

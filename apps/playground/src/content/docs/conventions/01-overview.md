---
title: Conventions — Overview
description: Cross-cutting coding rules used across the project — naming, structure, and patterns.
featured: true
tags:
  - conventions
  - reference
---

# Conventions

## Contents

- [Package `src/` Structure](/docs/conventions/02-package-structure/)
- [Data Fetching](/docs/conventions/03-data-fetching/)
- [State Initialization](/docs/conventions/04-state-initialization/)
- [Data Validation](/docs/conventions/05-data-validation/)
- [Error Handling](/docs/conventions/06-error-handling/)
- [Zustand Stores](/docs/conventions/07-zustand-stores/)
- [Zod Schemas](/docs/conventions/08-zod-schemas/)
- [UI Components — CSS Tokens](/docs/conventions/09-ui-css-tokens/)
- [UI Components — Responsive Layout](/docs/conventions/10-ui-responsive-layout/)
- [Dynamic Tailwind Colors](/docs/conventions/11-dynamic-tailwind-colors/)
- [Documentation](/docs/conventions/12-documentation/)
- [Imports & Exports](/docs/conventions/13-imports-exports/)
- [Factory & Creator Functions](/docs/conventions/14-factory-creator-functions/)
- [TypeScript Style](/docs/conventions/15-typescript-style/)
- [Performance](/docs/conventions/16-performance/)

Write code that reads like a sentence. Prefer clarity over brevity, but cut every unnecessary word.

Most of what's below is a hard rule — cross-cutting consistency here saves
more time than the flexibility would be worth. A few sections are
genuinely thresholds or judgment calls rather than bright lines; those are
called out explicitly as **guideline** instead of **rule**.

For the shape a package's internals tend to follow (Logic/Bridge/Screen,
definitions/registry), see [Architecture](/docs/explanation/architecture/)
and [Engine Patterns](/docs/explanation/engine-patterns/) — this document
doesn't repeat that.

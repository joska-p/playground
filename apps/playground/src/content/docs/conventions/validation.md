---
title: Validation
description: Data validation with Zod and schema conventions.
tags:
    - conventions
    - reference
---

# Validation

- **Do** use Zod to validate external data (API responses, user input).
- **Do** validate at the entry point — not scattered deep in components or store actions.
- **Do** co-locate schemas next to the code they validate, with a `.schema.ts` suffix.
- **Do** derive TypeScript types via `z.infer<typeof schema>`.
- **Don't** write parallel hand-maintained types alongside Zod schemas.

```ts
// ✅ Good — schema + derived type co-located
// nodes.schema.ts
export const nodeSchema = z.object({
    id: z.string(),
    x: z.number(),
    y: z.number(),
});

export type Node = z.infer<typeof nodeSchema>;

// ❌ Bad — hand-maintained type alongside schema
// nodes.ts
export type Node = { id: string; x: number; y: number }; // ← will drift from schema
export const nodeSchema = z.object({ ... });
```

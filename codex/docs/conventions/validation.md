---
title: Validation
description: Data validation with Zod and schema conventions.
tags:
    - conventions
    - reference
---

# Validation

Zod validates external data: API responses, user input, anything crossing the system boundary. Validation happens at the entry point, where data enters the application.

Schemas co-locate with the code they validate, suffixed `.schema.ts`. TypeScript types derive from the schema through `z.infer<typeof schema>`, so the schema stands as the single source of truth for both runtime checks and compile-time shapes:

```ts
// nodes.schema.ts
export const nodeSchema = z.object({
    id: z.string(),
    x: z.number(),
    y: z.number()
});

export type Node = z.infer<typeof nodeSchema>;
```

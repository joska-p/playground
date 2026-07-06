---
title: 'Zod Schemas'
description: 'Co-locating schemas and deriving types with z.infer.'
category: 'conventions'
tags:
  - reference
---

# Zod Schemas

## Contents

- [Rule](#rule)

## Rule

- Co-located next to the code they validate, `.schema.ts` suffix.
- Use `z.infer<typeof schema>` as the TypeScript type. Do not write parallel hand-maintained types.

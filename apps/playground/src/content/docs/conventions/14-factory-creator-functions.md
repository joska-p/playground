---
title: Factory & Creator Functions
description: Verb-first naming prefixes and filename casing conventions.
tags:
  - conventions
  - reference
---

# Factory & Creator Functions

## Contents

- [Rule](#rule)
- [Filename casing](#filename-casing)

## Rule

Use a consistent prefix that describes what the function does, not that it's a "factory":

| Prefix          | When to use                                    | Example                                  |
| --------------- | ---------------------------------------------- | ---------------------------------------- |
| `create*`       | Instantiate a new object/value from config     | `createRule`, `createGrid`, `createIcon` |
| `define*`       | Build a type-safe config/definition object     | `defineManip`, `defineGrammarRule`       |
| `parse*`        | Convert a string into structured data          | `parseRule`, `parseGraph`                |
| `build*`        | Assemble a result from multiple existing parts | `buildTree`, `buildOutput`               |
| `get*` / `use*` | Access existing data (no creation)             | `getCreature`, `useRows`                 |

Avoid `*Factory` or `factory*` naming — prefer the verb-first prefix above.

## Filename casing

Filename casing follows the exported identifier:

- **React Components** → PascalCase exact match: `Button.tsx` exports `Button`
- **Hooks** → camelCase exact match: `useSomething.ts` exports `useSomething`
- **Everything else** → kebab-case derived from the identifier: `create-rule.ts` exports `createRule`, `define-manip.ts` exports `defineManip`

# @repo/oeis-signal

> A Zustand + Zod demo component, scaffolded from the new-package generator.

This README is the package's local spec — the source of truth for its contract
and conventions. When the code changes, keep it in sync.

---

## Quick Start

```bash
pnpm --filter @repo/oeis-signal dev
```

## Exports

| Export | Path | Description |
| ------ | ---- | ----------- |
| `@repo/oeis-signal` | `./src/App.tsx` | Local dev wrapper rendering `Demo` |
| `@repo/oeis-signal/Demo` | `./src/components/Demo.tsx` | The public demo component |
| `@repo/oeis-signal/styles` | `./src/styles/global.css` | Tailwind v4 + `@repo/ui/gruvbox-theme` |

## Architecture

```
src/
├── App.tsx                # local dev wrapper (also the root export)
├── components/
│   └── Demo.tsx           # public component
├── demo.schema.ts         # Zod schema for form input
├── demoStore.ts           # Zustand store + getter/setter functions
├── main.tsx               # React DOM entry for the dev app
└── styles/
    └── global.css         # theme entry
```

## State Management

`demoStore.ts` owns the `DemoStore` privately. Components consume it through the
exported getter hooks (`useDemoCount`, `useDemoLastMessage`,
`useDemoSubmissions`) and setter functions (`addDemoSubmission`, `resetDemo`) —
never the store itself.

## Runtime Validation

`demo.schema.ts` validates form input with Zod. `Demo` parses before writing to
the store and surfaces the first issue as inline helper text.

## Conventions

This package follows [project conventions](/docs/conventions/01-overview.md):
named exports only, no barrel files, tabs for indentation.

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

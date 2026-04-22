# @repo/typescript-config

Shared TypeScript configurations.

## Installation

```bash
pnpm add -D @repo/typescript-config
```

## Usage

Reference these configs in your `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

Available configs:
- `base.json` — Base configuration for libraries
- `astro.json` — Astro-specific configuration
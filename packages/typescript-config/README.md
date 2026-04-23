# @repo/typescript-config

Shared TypeScript configurations.

---

## Installation

```bash
pnpm add -D @repo/typescript-config
```

---

## Usage

Reference in your `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

Available configs:

| Config       | Purpose            |
| ------------ | ------------------ |
| `base.json`  | Base configuration |
| `astro.json` | Astro-specific     |

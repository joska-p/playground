---
title: "Deployment"
description: "Deploy to GitHub Pages and other platforms."
type: "how-to"
order: 4
---

# Deployment

> How to deploy the Creative Playground.

---

## GitHub Pages (Default)

This project auto-deploys to GitHub Pages on every push to `develop`.

### CI/CD Pipeline

```
develop branch → GitHub Actions → GitHub Pages
```

The workflow (`.github/workflows/deploy.yml`) runs:

1. **Install** — Dependencies via Nix + pnpm
2. **Type-check** — `pnpm check-types`
3. **Lint** — `pnpm lint`
4. **Build** — Production build
5. **Storybook** — Merged into Astro dist
6. **Deploy** — GitHub Pages

### Manual Deploy

```bash
# Run locally to verify build
pnpm build

# Preview locally
pnpm preview
```

## Environment Variables

| Variable         | Description       | Required   |
| ---------------- | ----------------- | ---------- |
| `GITHUB_ACTIONS` | CI environment    | Automatic  |
| `VERCEL`         | Vercel deployment | For Vercel |

### Astro Config

In `astro.config.mjs`, use `process.env` (NOT `import.meta.env`):

```ts
const isVercel = Boolean(process.env.VERCEL);
const isCI = Boolean(process.env.GITHUB_ACTIONS);
```

> **Warning:** `import.meta.env` is not available in Astro config.

## Turborepo Cache

`turbo.json` includes environment variables:

```json
{
  "globalEnv": ["BASE_URL", "GITHUB_ACTIONS", "VERCEL"]
}
```

If you modify environment logic, ensure these variables are in `globalEnv` to prevent cache poisoning.

## Build Outputs

| App               | Output                             |
| ----------------- | ---------------------------------- |
| `apps/playground` | `apps/playground/dist/`            |
| `apps/storybook`  | `apps/storybook/storybook-static/` |

CI merges Storybook into Astro dist for combined deployment.

## Vercel (Alternative)

To deploy to Vercel:

```bash
# Install Vercel CLI
pnpm add -D vercel

# Deploy
vercel --prod
```

Or connect the repository in the Vercel dashboard.

> **Note:** Set environment variable `VERCEL=1` in Vercel project settings.

## Troubleshooting

| Issue             | Fix                                   |
| ----------------- | ------------------------------------- |
| Build fails       | Run `pnpm build` locally first        |
| Cache stale       | Delete `.turbo` and rebuild           |
| Type errors       | Run `pnpm check-types` locally        |
| Storybook missing | `pnpm --filter @repo/storybook build` |

## Pre-Commit Checklist

Before pushing to `develop`:

```bash
pnpm lint && pnpm format && pnpm check-types && pnpm build
```

All must pass for CI to succeed.

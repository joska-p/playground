# Architecture

> How the playground is organized—and why.

---

## 🏗️ Directory Structure

```
apps/
├── playground/       # Main Astro site
└── storybook/       # Component docs

packages/
├── ui/               # Shared UI components
├── mosaic-maker/      # Mosaic generation
├── sequence-renderer/ # Math sequence viz
├── palette-generator/ # Color tools
├── image-to-particles/ # Particle effects
├── tailwind-config/  # Design tokens
└── configs/        # TypeScript, ESLint
```

## 📂 Inside a Package

Every package follows the same structure:

```
src/
├── core/           # 🧠 Domain logic (math, rules)
├── components/     # 🫴 UI components
├── hooks/         # 🧬 React-specific logic
├── store/         # 💾 State management
├── renderers/      # 👁️ Drawing logic
├── services/      # 🌐 External communication
└── utils/        # 🔧 Helpers
```

### What Goes Where

| Folder | What It Contains | Examples |
|--------|----------------|----------|
| `core/` | Pure domain logic, no React | Math functions, rules |
| `components/` | UI components | Button, Card, Sidebar |
| `hooks/` | React lifecycle | useAnimation, useResize |
| `store/` | State (Zustand, etc.) | useMosaicStore |
| `renderers/` | Canvas, SVG, WebGL | CanvasRenderer |
| `services/` | API calls, storage | fetchPalettes |
| `utils/` | Generic helpers | date formatting |

## 🏷️ Naming Conventions

| Entity | Casing | Example |
|--------|--------|---------|
| Folders | `kebab-case` | `sequence-generator/` |
| Components | `PascalCase` | `DataVisualizer.tsx` |
| Utils/Hooks | `camelCase` | `useAnimation.ts` |
| Types | `PascalCase` | `UserSession.d.ts` |
| Constants | `UPPER_SNAKE` | `MAX_RETRY_COUNT` |

## 🧩 Component-Per-Folder

Every UI component lives in its own directory:

```
components/MyComponent/
├── MyComponent.tsx           # Main
├── MyComponent.stories.tsx # Storybook
├── index.ts             # Export
└── variants.ts         # CVA (optional)
```

## ⚙️ Engineering Standards

- **React 19+**: All packages use React 19
- **Named exports only**: No `export default`
- **Type safety**: No `any` (if possible)
- **Memoization**: Use `useMemo`/`useCallback` for expensive work

---

## 🔗 Package Dependencies

```
@repo/ui
  ↓
@repo/mosaic-maker     ← uses → ui
@repo/sequence-renderer
@repo/palette-generator
@repo/image-to-particles
  
apps/playground       ← uses → packages/*
apps/storybook      ← uses → ui
```

---

## 📚 Learn More

| Topic | Where |
|-------|-------|
| Mosaic Maker | [explanation/mosaic-engine](./mosaic-engine.md) |
| Sequence Renderer | [explanation/sequence-renderer](./sequence-renderer.md) |
| Design tokens | [reference/design-tokens](./reference/design-tokens.md) |
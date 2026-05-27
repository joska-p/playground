# Audit: `packages/ui/src` — Convention Violations

## ~~1. `packages/ui/src/index.ts`~~ ✅ Resolved

| Field | Value |
|-------|-------|
| Rule  | **No barrel files (`index.ts`)** |
| Fix   | Deleted the file and added per-component `exports` subpaths in `package.json` |

---

## ~~2. `packages/ui/package.json` — `exports` field~~ ✅ Resolved

| Field | Value |
|-------|-------|
| Rule  | **Package public API is declared in `package.json` exports. One subpath per public component — no root `index.tsx`** |
| Fix   | Replaced root `"."` entry with per-component subpaths (e.g. `"./Button": "./src/components/button/Button.tsx"`) and removed the barrel file |

---

## ~~3. `packages/ui/package.json` — `exports["."]` conditions~~ ✅ Resolved

| Field | Value |
|-------|-------|
| Rule  | **Do not use `require` / `import` / `types` conditions when all three point to the same source file — omit them entirely** |
| Fix   | Replaced the conditional object with plain string per-component subpath entries |

---

## ~~4. `packages/ui/src/components/widgets/sidebar/SidebarContext.tsx`~~ ✅ Resolved

| Field | Value |
|-------|-------|
| Rule  | **`.tsx` — files that contain JSX/TSX only** (File extensions table) |
| Fix   | Rename to `SidebarContext.ts` — this file contains no JSX (only `createContext` + type definitions) |

| Field | Value |
|-------|-------|
| Rule  | **Utility / core files: `camelCase.ts`** (Naming conventions table) |
| Fix   | Rename to `sidebarContext.ts` to follow the camelCase convention for non-component files |

---

## Files checked — no violations

| File | Notes |
|------|-------|
| `App.tsx` | PascalCase filename matches exported `App` ✓; named export ✓ |
| `main.tsx` | Entry point — no convention conflict ✓ |
| `components/button/Button.tsx` | PascalCase filename matches `Button` ✓ |
| `components/button/buttonVariants.ts` | camelCase utility ✓ |
| `components/card/Card.tsx` | PascalCase filename matches `Card` ✓ |
| `components/card/cardVariants.ts` | camelCase utility ✓ |
| `components/switch/Switch.tsx` | PascalCase filename matches `Switch` ✓ |
| `components/switch/switchVariants.ts` | camelCase utility ✓ |
| `components/slider/Slider.tsx` | PascalCase filename matches `Slider` ✓ |
| `components/slider/sliderVariants.ts` | camelCase utility ✓ |
| `components/select/Select.tsx` | PascalCase filename matches `Select` ✓ |
| `components/select/selectVariants.ts` | camelCase utility ✓ |
| `components/label/Label.tsx` | PascalCase filename matches `Label` ✓ |
| `components/label/labelVariants.ts` | camelCase utility ✓ |
| `components/input/Input.tsx` | PascalCase filename matches `Input` ✓ |
| `components/input/inputVariants.ts` | camelCase utility ✓ |
| `components/badge/Badge.tsx` | PascalCase filename matches `Badge` ✓ |
| `components/badge/badgeVariants.ts` | camelCase utility ✓ |
| `components/widgets/color-palette/ColorPalette.tsx` | PascalCase filename matches `ColorPalette` ✓ |
| `components/widgets/color-palette/colorPaletteVariants.ts` | camelCase utility ✓ |
| `components/widgets/sidebar/Sidebar.tsx` | PascalCase filename matches `Sidebar` ✓ |
| `components/widgets/sidebar/SidebarToggle.tsx` | PascalCase filename matches `SidebarToggle` ✓ |
| `components/widgets/sidebar/SidebarMain.tsx` | PascalCase filename matches `SidebarMain` ✓ |
| `components/widgets/sidebar/SidebarPanel.tsx` | PascalCase filename matches `SidebarPanel` ✓ |
| `components/widgets/sidebar/useSidebarContext.ts` | camelCase hook starting with `use` ✓; `.ts` extension ✓ |
| `components/widgets/sidebar/sidebarVariants.ts` | camelCase utility ✓ |
| `hooks/useResizeObserver.ts` | camelCase hook starting with `use` ✓; `.ts` extension ✓ |
| `utils/cn.ts` | camelCase utility ✓ |
| `styles/styles.css` | kebab-case ✓; no barrel file ✓ |
| `styles/gruvbox-theme.css` | kebab-case ✓ |
| `styles/vintage.css` | kebab-case ✓ |
| `styles/pale-asylum.css` | kebab-case ✓ |
| `styles/candy-coated.css` | kebab-case ✓ |
| `styles/blade-runner-theme.css` | kebab-case ✓ |

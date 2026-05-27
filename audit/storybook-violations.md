# Storybook Convention Violations

Audit of `apps/storybook/src/` against `CONVENTIONS.md`.

---

## 1. Default export used without inline comment

**Rule:** *"Named exports only. Never use `export default`."* (line 24)

**Exception:** *"if a default export is truly necessary for a tool integration (e.g. a Vite config, Tailwind config), document the reason with an inline comment."* (line 241)

All 9 story files use `export default meta;` (required by Storybook) but none include an inline comment explaining why.

| File | Line | What needs to change |
|---|---|---|
| `apps/storybook/src/stories/button/Button.stories.tsx` | 43 | Add inline comment above `export default meta;` explaining it is required by Storybook's tool integration |
| `apps/storybook/src/stories/card/Card.stories.tsx` | 29 | Same as above |
| `apps/storybook/src/stories/input/Input.stories.tsx` | 94 | Same as above |
| `apps/storybook/src/stories/label/Label.stories.tsx` | 37 | Same as above |
| `apps/storybook/src/stories/select/Select.stories.tsx` | 102 | Same as above |
| `apps/storybook/src/stories/slider/Slider.stories.tsx` | 63 | Same as above |
| `apps/storybook/src/stories/switch/Switch.stories.tsx` | 48 | Same as above |
| `apps/storybook/src/stories/widgets/ColorPalette.stories.tsx` | 45 | Same as above |
| `apps/storybook/src/stories/widgets/Sidebar.stories.tsx` | 39 | Same as above |

✅ **Resolved** — inline comment `// Required by Storybook CSF (Component Story Format) tooling` added above `export default meta;` in all 9 files.

---

## 2. Story filename casing wrong (should be PascalCase)

**Rule:** *"Story files follow the same naming rule as their subject: `[ComponentName].stories.tsx` for React components."* (line 201, Storybook section)

**Also:** *"React component files: `PascalCase.tsx`"* (line 42, naming table)

Story filenames must be PascalCase (matching the component they document), but all 9 story files use lowercase or kebab-case.

| Current filename | Should be |
|---|---|
| `stories/button/Button.stories.tsx` | `stories/button/Button.stories.tsx` ✅ |
| `stories/card/Card.stories.tsx` | `stories/card/Card.stories.tsx` ✅ |
| `stories/input/Input.stories.tsx` | `stories/input/Input.stories.tsx` ✅ |
| `stories/label/Label.stories.tsx` | `stories/label/Label.stories.tsx` ✅ |
| `stories/select/Select.stories.tsx` | `stories/select/Select.stories.tsx` ✅ |
| `stories/slider/Slider.stories.tsx` | `stories/slider/Slider.stories.tsx` ✅ |
| `stories/switch/Switch.stories.tsx` | `stories/switch/Switch.stories.tsx` ✅ |
| `stories/widgets/ColorPalette.stories.tsx` | `stories/widgets/ColorPalette.stories.tsx` ✅ |
| `stories/widgets/Sidebar.stories.tsx` | `stories/widgets/Sidebar.stories.tsx` ✅ |

✅ **Resolved** — all 9 files renamed to PascalCase matching their component name.

---

## 3. Barrel import from `"@repo/ui"` instead of subpath imports

**Rule:** *"No barrel files (`index.ts`). Import directly from the source file."* (line 26)

**Also:** *"Package public API is declared in `package.json` exports. One subpath per public component — no root `index.tsx`."* (line 31)

**Storybook section shows the correct pattern:** `import { Button } from "@repo/ui/Button";` (line 206-208)

All 9 story files import from the barrel `"@repo/ui"` instead of individual subpath entries.

| File | Line | Import now | Should be |
|---|---|---|---|
| `stories/button/Button.stories.tsx` | 1 | `import { Button } from "@repo/ui/Button";` | ✅ |
| `stories/card/Card.stories.tsx` | 1-9 | `import { Button } from "@repo/ui/Button";` / `import { Card, ... } from "@repo/ui/Card";` | ✅ |
| `stories/input/Input.stories.tsx` | 1 | `import { Input } from "@repo/ui/Input";` | ✅ |
| `stories/label/Label.stories.tsx` | 1 | `import { Label } from "@repo/ui/Label";` | ✅ |
| `stories/select/Select.stories.tsx` | 1 | `import { Select } from "@repo/ui/Select";` | ✅ |
| `stories/slider/Slider.stories.tsx` | 1 | `import { Slider } from "@repo/ui/Slider";` | ✅ |
| `stories/switch/Switch.stories.tsx` | 1 | `import { Switch } from "@repo/ui/Switch";` | ✅ |
| `stories/widgets/ColorPalette.stories.tsx` | 1 | `import { ColorPalette } from "@repo/ui/ColorPalette";` | ✅ |
| `stories/widgets/Sidebar.stories.tsx` | 1 | `import { Sidebar } from "@repo/ui/Sidebar";` | ✅ |

✅ **Resolved** — all 9 files now use subpath imports instead of barrel import.

---

## Summary

| Category | Files affected | Severity |
|---|---|---|
| Default export without comment | 9 / 9 | medium |
| Wrong filename casing | 9 / 9 | high |
| Barrel imports | 9 / 9 | high |

**No violations found in:** `apps/storybook/src/styles/styles.css`

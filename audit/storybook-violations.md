# Storybook Convention Violations

Audit of `apps/storybook/src/` against `CONVENTIONS.md`.

---

## 1. Default export used without inline comment

**Rule:** *"Named exports only. Never use `export default`."* (line 24)

**Exception:** *"if a default export is truly necessary for a tool integration (e.g. a Vite config, Tailwind config), document the reason with an inline comment."* (line 241)

All 9 story files use `export default meta;` (required by Storybook) but none include an inline comment explaining why.

| File | Line | What needs to change |
|---|---|---|
| `apps/storybook/src/stories/button/button.stories.tsx` | 43 | Add inline comment above `export default meta;` explaining it is required by Storybook's tool integration |
| `apps/storybook/src/stories/card/card.stories.tsx` | 29 | Same as above |
| `apps/storybook/src/stories/input/input.stories.tsx` | 94 | Same as above |
| `apps/storybook/src/stories/label/label.stories.tsx` | 37 | Same as above |
| `apps/storybook/src/stories/select/select.stories.tsx` | 102 | Same as above |
| `apps/storybook/src/stories/slider/slider.stories.tsx` | 63 | Same as above |
| `apps/storybook/src/stories/switch/switch.stories.tsx` | 48 | Same as above |
| `apps/storybook/src/stories/widgets/color-palette.stories.tsx` | 45 | Same as above |
| `apps/storybook/src/stories/widgets/sidebar.stories.tsx` | 39 | Same as above |

---

## 2. Story filename casing wrong (should be PascalCase)

**Rule:** *"Story files follow the same naming rule as their subject: `[ComponentName].stories.tsx` for React components."* (line 201, Storybook section)

**Also:** *"React component files: `PascalCase.tsx`"* (line 42, naming table)

Story filenames must be PascalCase (matching the component they document), but all 9 story files use lowercase or kebab-case.

| Current filename | Should be |
|---|---|
| `stories/button/button.stories.tsx` | `stories/button/Button.stories.tsx` |
| `stories/card/card.stories.tsx` | `stories/card/Card.stories.tsx` |
| `stories/input/input.stories.tsx` | `stories/input/Input.stories.tsx` |
| `stories/label/label.stories.tsx` | `stories/label/Label.stories.tsx` |
| `stories/select/select.stories.tsx` | `stories/select/Select.stories.tsx` |
| `stories/slider/slider.stories.tsx` | `stories/slider/Slider.stories.tsx` |
| `stories/switch/switch.stories.tsx` | `stories/switch/Switch.stories.tsx` |
| `stories/widgets/color-palette.stories.tsx` | `stories/widgets/ColorPalette.stories.tsx` |
| `stories/widgets/sidebar.stories.tsx` | `stories/widgets/Sidebar.stories.tsx` |

---

## 3. Barrel import from `"@repo/ui"` instead of subpath imports

**Rule:** *"No barrel files (`index.ts`). Import directly from the source file."* (line 26)

**Also:** *"Package public API is declared in `package.json` exports. One subpath per public component — no root `index.tsx`."* (line 31)

**Storybook section shows the correct pattern:** `import { Button } from "@repo/ui/Button";` (line 206-208)

All 9 story files import from the barrel `"@repo/ui"` instead of individual subpath entries.

| File | Line | Import now | Should be |
|---|---|---|---|
| `stories/button/button.stories.tsx` | 1 | `import { Button } from "@repo/ui";` | `import { Button } from "@repo/ui/Button";` |
| `stories/card/card.stories.tsx` | 1-9 | `import { Button, Card, CardContent, ... } from "@repo/ui";` | Import each from its own subpath (e.g. `@repo/ui/Card`, `@repo/ui/Button`, etc.) |
| `stories/input/input.stories.tsx` | 1 | `import { Input } from "@repo/ui";` | `import { Input } from "@repo/ui/Input";` |
| `stories/label/label.stories.tsx` | 1 | `import { Label } from "@repo/ui";` | `import { Label } from "@repo/ui/Label";` |
| `stories/select/select.stories.tsx` | 1 | `import { Select } from "@repo/ui";` | `import { Select } from "@repo/ui/Select";` |
| `stories/slider/slider.stories.tsx` | 1 | `import { Slider } from "@repo/ui";` | `import { Slider } from "@repo/ui/Slider";` |
| `stories/switch/switch.stories.tsx` | 1 | `import { Switch } from "@repo/ui";` | `import { Switch } from "@repo/ui/Switch";` |
| `stories/widgets/color-palette.stories.tsx` | 1 | `import { ColorPalette } from "@repo/ui";` | `import { ColorPalette } from "@repo/ui/ColorPalette";` |
| `stories/widgets/sidebar.stories.tsx` | 1 | `import { Sidebar } from "@repo/ui";` | `import { Sidebar } from "@repo/ui/Sidebar";` |

---

## Summary

| Category | Files affected | Severity |
|---|---|---|
| Default export without comment | 9 / 9 | medium |
| Wrong filename casing | 9 / 9 | high |
| Barrel imports | 9 / 9 | high |

**No violations found in:** `apps/storybook/src/styles/styles.css`

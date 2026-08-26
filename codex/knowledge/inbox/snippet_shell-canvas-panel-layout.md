## title: 'Shell layout for canvas + floating panel'

date: 2026-08-26
type: snippet
tags: [layout, shell, tlc, canvas]

**Context:** mosaic-maker had its canvas and panel as siblings in a `relative h-screen` div, causing the panel to hide behind the canvas. Shell layout solves this with proper grid docking.

**Corps:**

```tsx
import { Shell, ShellCanvas, ShellPanels } from '@repo/tlc/layout';

// Canvas fills available space, panels dock on side (desktop) or bottom (mobile)
<Shell>
    <ShellCanvas>
        <YourCanvas /> {/* use h-full w-full, NOT h-screen */}
    </ShellCanvas>
    <ShellPanels>
        <Panel title="Controls">...</Panel>
    </ShellPanels>
</Shell>;
```

Key: canvas child must use `h-full` not `h-screen` — Shell's grid cell provides the viewport constraint.

**Lien codebase:** `packages/mosaic-maker/src/App.tsx`

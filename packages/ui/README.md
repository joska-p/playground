# @repo/ui

> Shared atomic UI components for the Creative Playground. Built with **React 19**, **CVA**, and styled with the **Gruvbox** design system.

## Quick Start

```bash
pnpm add @repo/ui
```

```tsx
import { Button, Sidebar, Card } from "@repo/ui";

export function MyComponent() {
  return (
    <Card variant="primary">
      <Button variant="accent">Creative Action</Button>
    </Card>
  );
}
```

## Components

- **Actions:** Button
- **Forms:** Input, Slider, Switch, Select, Label
- **Layout:** Card, Sidebar, Breadcrumb
- **Widgets:** ColorPalette, Callout, DocCard

---

Full reference: [UI Components](/docs/reference/packages/ui/)

_Part of the [Creative Playground](https://playground-beryl-omega.vercel.app)_

# @repo/ui

> Shared UI components built with React 19. Styled with the Gruvbox design system.

---

## 🚀 Quick Start

```bash
pnpm add @repo/ui
```

```tsx
import { Button, Sidebar, Card } from "@repo/ui";

function MyPage() {
  return (
    <Sidebar>
      <Sidebar.Panel>
        <Card>
          <Button variant="primary">Click me</Button>
        </Card>
      </Sidebar.Panel>
    </Sidebar>
  );
}
```

## 🧩 What's Included

| Category | Components |
|----------|-----------|
| **Actions** | Button |
| **Forms** | Input, Slider, Switch, Select |
| **Layout** | Card, Sidebar |
| **Display** | ColorPalette, Label |
| **Utils** | `cn()` class merger |

## 🎨 Design Tokens

All components use the Gruvbox theme automatically:

```tsx
// Just use them—they're pre-styled!
<Button variant="primary" />    // Blue-ish
<Button variant="secondary" />  // Green-ish  
<Button variant="accent" />    // Red-ish
```

## 📖 Learn More

| Topic | Link |
|-------|------|
| Component API | [docs/reference/component-api.md](../../docs/reference/component-api.md) |
| Design Tokens | [docs/reference/design-tokens.md](../../docs/reference/design-tokens.md) |
| Creating Components | [docs/how-to/creating-components.md](../../docs/how-to/creating-components.md) |
| Storybook | [joska-p.github.io/playground/storybook](https://joska-p.github.io/playground/storybook) |

---

*Part of @repo/playground*
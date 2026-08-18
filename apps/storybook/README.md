# Storybook

> Component documentation for the Creative Playground.

---

## 🚀 Run It

```bash
cd apps/storybook && pnpm dev
```

Opens at [localhost:6006](http://localhost:6006)

## 🛠️ Commands

| Command      | What                   |
| ------------ | ---------------------- |
| `pnpm dev`   | Start Storybook (6006) |
| `pnpm build` | Static build           |

## 🧩 Where Stories Live

Stories are co-located with components:

```
packages/ui/src/components/Button/
├── Button.tsx
├── Button.stories.tsx  # 👈 Stories here
└── index.ts
```

## 🎨 Browse Components

| Category | Components                    |
| -------- | ----------------------------- |
| Actions  | Button                        |
| Forms    | Input, Slider, Switch, Select |
| Layout   | Card, Sidebar                 |
| Display  | ColorPalette, Label           |

---

## 📖 Learn More

| Topic              | Link                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| Component patterns | [docs/conventions/packages](https://joska-p.github.io/playground/docs/conventions/packages/)       |
| Design tokens      | [docs/conventions/ui](https://joska-p.github.io/playground/docs/conventions/ui/)                   |
| Live Storybook     | [https://joska-p.github.io/playground/storybook/](https://joska-p.github.io/playground/storybook/) |

---

_Part of @repo/playground_

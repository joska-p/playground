# Storybook

Component documentation and playground for UI components.

## Commands

From the workspace root:

| Command                         | Action                              |
| :------------------------------ | :---------------------------------- |
| `pnpm dev --filter=storybook`   | Start Storybook at `localhost:6006` |
| `pnpm build --filter=storybook` | Build static Storybook              |

## Adding Stories

Stories live alongside components following the component-per-folder pattern:

```
src/components/MyComponent/
├── MyComponent.tsx
├── MyComponent.stories.tsx
└── index.ts
```

See the [official Storybook docs](https://storybook.js.org/) for more on writing stories.

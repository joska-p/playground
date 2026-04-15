## Playground Monorepo

This monorepo contains a React-based design system and an Astro playground application. It is structured to provide a professional development workflow with automated testing, component documentation, and unified styling using Tailwind CSS 4.

---

### 📦 Project Structure

* **`apps/playground`**: An Astro application used to test and demonstrate components in a real-world environment.
* **`packages/design-system`**: The core UI library containing React components, Vitest unit tests, and Storybook stories.
* **`packages/config-eslint`**: Shared linting configurations to maintain code quality across the workspace.

---

### 🚀 Dashboards

The following resources are automatically updated via GitHub Actions on every push to the `main` branch:

* **[Component Library (Storybook)](https://joska-p.github.io/playground/storybook/)**
    Browse and interact with UI components in isolation.
* **[Test Coverage Report](https://joska-p.github.io/playground/coverage/)**
    Detailed health report of the Vitest suite for the design system.
* **[Live Demo](https://joska-p.github.io/playground/)**
    The latest version of the Astro playground application.

---

### 🛠️ Getting Started

#### Prerequisites
* Node.js (>= 22.12.0)
* pnpm (v9 or v10)

#### Installation
```bash
pnpm install
```

#### Development
To start the Astro playground and the design system in development mode:
```bash
pnpm dev
```

To run Storybook:
```bash
pnpm --filter @lab/design-system storybook
```

---

### 🧪 Quality Control

#### Testing
Tests are powered by Vitest and React Testing Library. Explicit imports are used for `describe`, `it`, and `expect` to ensure strict type safety.
```bash
pnpm test
```

#### Type Checking
A workspace-wide type check ensures cross-package compatibility:
```bash
pnpm type-check
```

#### Linting
```bash
pnpm lint
```

---

### 🎨 Styling Integration

This project uses **Tailwind CSS 4**. The design system exports its CSS entry point directly. To use the styles in a new application, import the styles package in your main layout or entry file:

```tsx
import "@lab/design-system/styles";
```

Theme variables and Tailwind directives are managed within `packages/design-system/src/styles.css`.

---

### 🏗️ Deployment

The project is deployed to GitHub Pages using GitHub Actions. The workflow handles:
1.  Building the Design System and Astro App.
2.  Generating the Storybook static site.
3.  Running tests and generating HTML coverage reports.
4.  Deploying all artifacts to a unified sub-directory structure.

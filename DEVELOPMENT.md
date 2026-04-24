# Development Manifesto: The Creative Lab

This document defines the architectural principles and engineering standards for this monorepo. It serves as the primary guide for both human contributors and AI agents.

---

## 🏛️ Philosophy: Stateless First

We prioritize server-side rendering (SSR) and minimal client-side state.

1.  **[Astro](https://astro.build/) Over [React](https://react.dev/)**: Use Astro components (`.astro`) for structural UI, navigation, and static content.
2.  **Stateless Shell**: Components like the `Navbar` should be stateless, using Vanilla JS for simple interactivity (toggles, theme switching) instead of React state.
3.  **Engines**: React is reserved for complex, high-interactivity "Engines" (e.g., Mosaic Maker, Sequence Renderer) where local state and re-rendering are necessary.
4.  **URL as State**: The URL (search params) is our primary "database" for UI state. Prefer syncing component state to the URL so that visualizations are shareable and bookmarkable.

---

## 🏗️ Architecture & Organization

### Monorepo Structure
-   **`apps/playground`**: The main [**Astro**](https://astro.build/) application. It provides the layout, routing, and integrates the engines.
-   **`apps/storybook`**: Isolated documentation and testing for UI components using [**Storybook**](https://storybook.js.org/).
-   **`packages/ui`**: Atomic components (Button, Card, Input) built with [**CVA**](https://cva.style/).
-   **`packages/[engine]`**: Isolated domain logic and high-level React components. **See package READMEs for engine-specific architecture and rules.**

### Component-Per-Folder Pattern
Every component lives in its own directory:
```
components/MyComponent/
├── MyComponent.tsx         # Main implementation
├── MyComponent.stories.tsx # Isolation testing
├── index.ts               # Clean exports
└── variants.ts            # Styling variants (CVA)
```

---

## 🤖 Agent Protocol (For AI Agents)

AI Agents **MUST** follow these rules to ensure consistency and safety:

1.  **Context Discovery**:
    -   Before suggesting architectural changes, read `graphify-out/GRAPH_REPORT.md`.
    -   Use `pnpm graphify` (powered by [**graphifyy**](https://github.com/joska-p/graphifyy)) after code changes to keep the knowledge graph current.
2.  **Surgical Execution**:
    -   Apply minimal, targeted changes. Do not perform unrelated refactoring.
    -   Adhere to naming conventions and file structures strictly.
3.  **Planning Protocol**:
    -   For features or bug fixes, provide a **Plan** (including testing strategy) before execution.
    -   Use `enter_plan_mode` for complex tasks involving multiple files or architectural decisions.
4.  **Verification**:
    -   A task is only complete when verified. Run relevant build/lint/test commands.
    -   Always check for and update related stories and documentation.

---

## ⚙️ Engineering Standards

-   [**TypeScript**](https://www.typescriptlang.org/): Strict typing is mandatory. No `any`.
-   **React 19**: Leverage [**React 19**](https://react.dev/) features (e.g., `use` hook, Actions) where appropriate.
-   **Vanilla First**: If a task can be done with standard Web APIs (DOM events, CSS, SearchParams), do it without a library.
-   **CI/CD**: The pipeline ([**GitHub Actions**](https://github.com/features/actions)) is the source of truth for deployment. Never bypass it.

---

## 📚 Documentation & Verification

-   **Tutorials**: Focus on "Learning-oriented" lessons ([**Diátaxis**](https://diataxis.fr/)).
-   **How-To**: Focus on "Problem-oriented" recipes.
-   **Reference**: Focus on "Information-oriented" dictionaries.
-   **Explanation**: Focus on "Understanding-oriented" discussions (like this manifesto).

*Verification of UI components happens in [**Storybook**](https://storybook.js.org/). If it's not in Storybook, it's not fully implemented.*

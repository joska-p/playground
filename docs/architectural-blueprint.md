This guide provides a universal architectural blueprint for modern **TypeScript/React** monorepos. It is designed to be "machine-readable" for AI tools and "human-clear" for developers to ensure total consistency across multiple packages and applications.

---

## 🏗️ 1. Core Directory Taxonomy
Every package or application within the `src/` directory must strictly follow this categorization to eliminate ambiguity.

### The Source Directory (`src/`)
* **`core/`**: **The Brain.** Contains pure TypeScript domain logic, mathematical rules, and state engines. **Zero dependencies on React or DOM APIs.**
* **`components/`**: **The Body.** Pure UI components. Follows the *Component-per-Folder* pattern.
* **`hooks/`**: **The Nerves.** React-specific lifecycle logic and state management glue.
* **`renderers/`**: **The Eyes.** Specialized logic for drawing or output (Canvas, SVG, WebGL, PDF).
* **`services/`**: **The Diplomats.** Logic for external communication (API clients, LocalStorage, WebWorkers).
* **`utils/`**: **The Tools.** Generic, stateless helper functions that could theoretically work in any project (e.g., date formatting, generic math).

---

## 🏷️ 2. Universal Naming Conventions

Consistency in casing allows for instant recognition of a file's purpose.

| Entity | Casing | Example |
| :--- | :--- | :--- |
| **Folders** | `kebab-case` | `sequence-generator/` |
| **React Components** | `PascalCase` | `DataVisualizer.tsx` |
| **Logic/Hooks/Utils** | `camelCase` | `useAnimation.ts`, `mathHelpers.ts` |
| **Styles (Modules)** | `PascalCase.module.css` | `DataVisualizer.module.css` |
| **Types/Interfaces** | `PascalCase` | `UserSession.d.ts` |
| **Constants** | `UPPER_SNAKE` | `MAX_RETRY_COUNT` |

---

## 🧩 3. The Component-Per-Folder Pattern
Every UI component must be self-contained in its own directory to prevent "file soup."

**Directory Blueprint:**
```text
components/
└── MyComponent/
    ├── MyComponent.tsx          # Main implementation
    ├── MyComponent.module.css   # Scoped styles
    ├── MyComponent.test.tsx     # Unit tests
    ├── MyComponent.stories.tsx  # Documentation/Storybook
    └── index.ts                 # Public "Front Door"
```

**The "Front Door" (`index.ts`) Rule:**
Use named barrel exports to keep import paths clean.
* **Correct:** `export * from './MyComponent';`
* **Result:** `import { MyComponent } from '@/components/MyComponent';`

---

## ⚖️ 4. The "Where Does It Go?" Logic
To resolve "identity crises" between folders, apply these tests:

### Is it a "Util" or "Core"?
* **The Utility Test:** If you can copy-paste this function into a completely different project (like a banking app vs. a game) and it still works, it is a **Util**.
* **The Domain Test:** If the function knows about specific project rules, business logic, or specialized math, it is **Core**.

### Is it "Lib" or "Service"?
* **The Library Test:** If the file exists solely to configure or wrap a 3rd-party package (e.g., D3, Supabase, Tailwind), it belongs in **Lib**.
* **The Service Test:** If the file manages a continuous connection or data stream (e.g., fetching user data), it belongs in **Service**.

---

## 🚀 5. Engineering Standards (React 19+)

* **Named Exports Only:** Avoid `export default`. Named exports enable better IDE refactoring and prevent naming collisions in large monorepos.
* **Logic Extraction:** Components should be "thin." All complex calculations or state transitions should live in `core/` (math) or `hooks/` (state).
* **Type Safety:** * Avoid `any` at all costs. 
    * Use `interface` for public APIs/Props.
    * Use `type` for unions or utility types.
* **Memoization Strategy:** Use `useMemo` and `useCallback` for expensive computations within hooks to maintain performance in data-heavy visualizations.

---

> **Note for AI CLI:** When generating new files or refactoring, strictly adhere to the directory taxonomy and naming conventions defined above. If a destination folder does not exist, create it following the `kebab-case` folder rule.

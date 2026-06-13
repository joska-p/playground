_"Refactor this React app @packages/graph-viz to follow modern best practices for clean architecture. Your goals are:_

1. **Separation of Concerns:**
   - Extract all business logic, state management, and side effects (e.g., API calls, calculations) from React components into standalone, pure functions or custom hooks.
   - Ensure components are **dumb** (presentational) and only handle UI rendering and user interactions.

2. **Testability:**
   - Move all logic into testable units (e.g., utility functions, custom hooks, or services).
   - Ensure each unit has a single responsibility and can be tested in isolation (unit tests).

3. **Best Practices:**
   - Use **TypeScript** (if applicable) for type safety.
   - Follow the **SOLID** principles, especially Single Responsibility and Dependency Inversion.
   - For state management, prefer **Zustand** for global state, and **useReducer** for complex local state.
   - Avoid prop drilling by using Context or state management libraries.

4. **Structure:**
   - Organize files by feature/domain (e.g., `features/auth/`, `features/dashboard/`) rather than by type (e.g., `components/`, `hooks/`).
   - Example structure:
     ```
     src/
       features/
         {feature-name}/
           components/   # Dumb components
           hooks/        # Custom hooks for logic
           services/     # API calls, business logic
           core/         # Core logic
           stores/       # State management stores (Zustand)
           utils/        # Pure utility functions
           types/        # TypeScript types/interfaces
           index.ts      # Public API of the feature
     ```

5. **Deliverables:**
   - Refactored code with logic extracted into testable units.

_Start by analyzing the current codebase, identify tightly coupled logic in components, and propose a step-by-step refactor plan. Ask for clarification if any part of the codebase is unclear."_

---
title: "Testing"
description: "Write and run tests for components and packages."
type: "how-to"
order: 3
---

# Testing

> Write tests to ensure your code works correctly.

---

## Test Setup

This project uses **Vitest** for testing. To set it up:

```bash
# Add Vitest to your package
cd packages/my-package
pnpm add -D vitest @testing-library/react @testing-library/dom jsdom
```

### Configure Vitest

Create `vitest.config.ts` in your package:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom";
```

## Writing Tests

### Component Tests

```tsx
// MyComponent.test.tsx
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent name="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

### Utility Tests

```ts
// utils.test.ts
import { describe, it, expect } from "vitest";
import { myUtility } from "./utils";

describe("myUtility", () => {
  it("returns expected result", () => {
    expect(myUtility("input")).toBe("expected");
  });
});
```

## Run Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test --coverage

# Run in watch mode
pnpm test --watch

# Run specific package
cd packages/my-package && pnpm test
```

## Best Practices

| Do                                | Don't                           |
| --------------------------------- | ------------------------------- |
| Test behavior, not implementation | Test internal state             |
| Use meaningful test names         | Use vague names like "test1"    |
| Test happy path AND edge cases    | Only test happy path            |
| Keep tests independent            | Make tests depend on each other |

## Checklist

Before committing:

- [ ] New component has tests
- [ ] Tests pass: `pnpm test`
- [ ] Tests cover edge cases
- [ ] No flaky tests (random failures)

## Storybook for Visual Testing

Use Storybook to verify visual output:

```bash
cd apps/storybook && pnpm dev
# Visit http://localhost:6006
```

Add stories for each component variant (see [Creating Components](./creating-components)).

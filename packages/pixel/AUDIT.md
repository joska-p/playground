# 🔍 Code Health Audit: `@repo/pixel`

> **Audited:** 2026-07-03
> **Package Path:** `packages/pixel`
> **Environment:** React 19 + React Compiler, TypeScript (strictest), ESLint (strict)
> **Scope:** Pure discovery and structural mapping. No code was modified.

---

## Summary

14 source files audited. 7 files flagged with code-smell entries. No `eslint-disable` comments found. No `useMemo`/`useCallback`/`useRef` usage found (React Compiler is leveraged correctly).

**Smell distribution:**

| Category | Count |
|---|---|
| Universal Function / Hyper-Generic Abstraction | 2 |
| Linter Workaround | 2 |
| React 19 / React Compiler Friction | 1 |
| Navigation Logic Duplication | 1 |
| Errored CSS custom property patterns | 1 |

---

## File-by-File Findings

### 📄 File: `src/components/views/InternalsView.tsx`

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction
- **Complexity Score:** High
- **Architectural Observation:** This single component renders six entirely different documentation pages (execution-engine, fusion-scheduler, tiling, resize-algorithm, worker-architecture, configuration) via a monolithic `if (id === "...")` chain. Each branch returns a full React element tree — with unique layouts, tables, ASCII-art flow diagrams, and styled panels — all coordinated by a single string `id` prop. The `SectionHeader` sub-component accepts `EndpointItem | undefined` and silently renders with optional chaining (`item?.label`), meaning it can render effectively empty content if `findItemForEndpoint` returns `undefined` (though this would require a malformed `id`). This function does too many jobs: documentation authoring, layout management, and routing. Splitting into dedicated components (e.g., `ExecutionEngineView`, `FusionSchedulerView`, `TilingView`) would decouple content from routing.
- **Impact on Strictness:** None — no type assertions or eslint workarounds. The code is strict-valid, just structurally monolithic.

---

### 📄 File: `src/components/data/pipeline-docs-data.ts`

- **Type of Smell:** Universal Function / Navigation Logic Duplication
- **Complexity Score:** Medium
- **Architectural Observation:** Two functions — `isActiveEndpoint()` (line 44) and `findItemForEndpoint()` (line 52) — independently re-implement the same 4-kind discriminator logic over `EndpointId`. Each manually checks `kind === 'overview'`, `kind === 'manip'`, `kind === 'pipeline'`, and `kind === 'internals'` with their respective ID comparisons. If a new endpoint kind were added, both functions (plus `handleSelect` in `SwaggerSidebar.tsx`) would need coordinated updates. A shared lookup table or a single dispatch function returning both the item and a match boolean would consolidate this knowledge. `findItemForEndpoint` is further burdened by having to skip pipeline items when searching for manip items (line 61: `item.type !== 'pipeline'`), adding implicit coupling to the data model.
- **Impact on Strictness:** None.

---

### 📄 File: `src/components/views/ManipView.tsx`

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction (minor)
- **Complexity Score:** Low
- **Architectural Observation:** The `codeLines` construction (lines 27–45) builds a code-sample string by iterating over `manip.params` and formatting each parameter inline. This is a template-in-render-body pattern: a `.map().join(', ')` pipeline inside a template literal that conditionally adds an `options` block. While functionally correct, the logic handles three states (no params, one param, many params) in a dense single-expression form. `TYPE_ACCENT` also contains dead entries (`pipeline`, `internals`, `overview`) that don't match `ManipInfo.type` (which is `'pixel' | 'neighborhood' | 'global'`), suggesting the record was copy-pasted from a broader context.
- **Impact on Strictness:** Uses one `as React.CSSProperties` cast (line 53) to pass CSS custom properties via the `style` attribute — a necessary pattern for typed CSS custom properties in React 19's type system.

---

### 📄 File: `src/components/views/PipelineView.tsx`

- **Type of Smell:** Hyper-Generic Abstraction (minor)
- **Complexity Score:** Low
- **Architectural Observation:** The `demos` and `codeSamples` lookup tables are typed as broad `Record<string, ...>` (lines 15, 36) instead of a mapped type over the `'resize' | 'chaining'` union. This means an invalid `id` would fail at runtime with `undefined` rather than at compile time. The lookup `demos[id]` at line 41 returns `React.JSX.Element | undefined` but is immediately used as a component, relying on the caller to have already narrowed `id`. A proper typed record (e.g., `Record<typeof id, ...>`) would catch errors statically. The `id`-based table pattern is shared between demos and code samples, suggesting a lightweight domain abstraction could replace two parallel stringly-typed lookups.
- **Impact on Strictness:** Uses one `as React.CSSProperties` cast (line 46).

---

### 📄 File: `src/components/demos/TryItOut.tsx`

- **Type of Smell:** React 19 / React Compiler Friction
- **Complexity Score:** Low
- **Architectural Observation:** The `useEffect` dependency array includes `manip` (a full `ManipInfo` object) alongside its individual properties `manip.id` and `manip.params` (line 44). Since `findManipById()` in `pipeline-docs-data.ts` constructs a new `ManipInfo` object on every call, the parent `EndpointView` passes a fresh reference on each render. This causes the effect to re-run even when `manip.id` and `manip.params` have not changed. The `manip` reference in the dependency array is redundant given `manip.id` and `manip.params` are already listed — removing it would fix the unnecessary re-runs. Additionally, the `options` object is rebuilt from scratch inside the effect body every time (lines 22–27); with React Compiler active this would be automatically stable, but the effect dependency structure itself is the primary issue.
- **Impact on Strictness:** None.

---

### 📄 File: `src/api/pixel.ts`

- **Type of Smell:** Linter Workaround / Type Guard Escape Hatch
- **Complexity Score:** Low
- **Architectural Observation:** The `isSerializedImageDataArray` type guard (line 31) uses `const obj = item as Record<string, unknown>` (line 42) to bypass TypeScript's restriction on property access on `unknown`. This is a well-understood, necessary pattern for building runtime type guards over serialized data, but it's still a type assertion that loosens strictness. The guard then performs thorough runtime validation (`'data' in obj`, `'width' in obj`, `'height' in obj`, plus `instanceof` and `typeof` checks), so the assertion is safely confined. However, the `bracket notation` (`obj['data']`, `obj['width']`, `obj['height']`) suggests the linter (or a previous config) may have flagged dot-notation on `Record<string, unknown>`, and bracket notation was used as a workaround.
- **Impact on Strictness:** 1 type assertion (`as Record<string, unknown>`) to bypass property-access restrictions on `unknown` type.

---

### 📄 File: `vitest.setup.ts`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** Line 18 uses `as unknown as typeof ImageData` to satisfy TypeScript that the polyfill class matches the native `ImageData` interface. The polyfill is a minimal implementation (handles only two constructor signatures — number or `Uint8ClampedArray`), and the double assertion is the standard escape hatch for satisfying global type expectations during polyfill registration. This is unavoidable in a test environment (happy-dom) that doesn't implement the full `ImageData` API, but it's a type-safety gap: if the real `ImageData` constructor signature changes, this polyfill won't produce a compile error.
- **Impact on Strictness:** 1 double type assertion (`as unknown as typeof ImageData`) to shim a missing browser global in test environment.

---

### 📄 File: `src/components/SwaggerSidebar.tsx`

- **Type of Smell:** Linter Workaround
- **Complexity Score:** Low
- **Architectural Observation:** Lines 55 and 101 use `item.id as 'resize' | 'chaining'` to narrow a generic `string` to a literal union type at the call site. These casts appear in `handleSelect` and the inline `isActive` computation, where `item.type === 'pipeline'` has already narrowed the type, but TypeScript's control-flow analysis isn't strong enough to narrow `item.id` from `string` to the `'resize' | 'chaining'` union. The type assertion is justified but bypasses compile-time checking — if a new pipeline type is added without updating the cast, it would silently pass through. Notably, this same cast pattern is duplicated in both `handleSelect` and the inline condition (lines 55 and 101).
- **Impact on Strictness:** 2 type assertions (`as 'resize' | 'chaining'`) to narrow string IDs after type-discriminator checks.

# UI Component Library Audit & Overhaul Plan

This document outlines the audit findings for the `@repo/ui` package and provides a comprehensive plan for refactoring and standardizing the component library while maintaining the signature Gruvbox aesthetic.

---

## 🔍 1. Current State Analysis

### 1.1 File Naming & Structure
- **Inconsistency**: Mixed case in file names (e.g., `Button.tsx` vs `buttonVariants.ts`).
- **Inconsistency**: Some components have `cva` definitions inside the main file (`Sidebar.tsx`), while others use separate `variants.ts` files.
- **Inconsistency**: Folder structure is mostly flat but contains subfolders for complex components (e.g., `widgets/sidebar`).

### 1.2 Component API & Props
- **Primitive vs. Field**: `Input` and `Select` are currently "Field" components (built-in labels, helper text). `Button` has a built-in spinner. This makes them less flexible as primitives.
- **Event Handling**: Standard events like `onChange` are used inconsistently. `Switch` uses `onCheckedChange` (Radix pattern), while `Slider` uses a custom `onChange` that returns a number.
- **Ref Handling**: Good adoption of React 19 `ref` as a prop, but not universal across all sub-components (e.g., `Card` sub-components).

### 1.3 Styling & Theming
- **Token Usage**: Inconsistent use of Tailwind tokens vs. hardcoded opacity values (e.g., `hover:bg-primary/90`).
- **Shadows & Borders**: Multiple components define their own shadow/border styles instead of using a shared utility or shared variants.

---

## 🛠️ 2. Proposed Standards

### 2.1 File Structure
- **Folder per component**: `packages/ui/src/components/[component-name]/`
- **Main component**: `[ComponentName].tsx` (PascalCase)
- **Variants**: `variants.ts` (always separate, camelCase)
- **Sub-components**: `[ComponentName][SubName].tsx` (if large) or within main file (if small).

### 2.2 Component API
- **Primitives first**: Primitives (e.g., `Input`, `Select`) should only render the element.
- **Field Wrappers**: Create a generic `Field` or `Label` component to handle labeling, helper text, and error states.
- **Value Handling**:
    - `Input`, `Select`: Standard HTML events.
    - `Slider`, `Switch`: Radix-like pattern (`onValueChange`, `onCheckedChange`).

### 2.3 Refactoring the "Gruvbox" Aesthetic
- Move shared "tactile" styles (border-bottom offsets, specific shadow types) into a shared `variants/ui-styles.ts` or similar to ensure all cards, buttons, and inputs feel part of the same physical "playground".

---

## 🚀 3. Action Plan

### Phase 1: Foundation (Current Sprint)
- [ ] Create `packages/ui/src/components/primitive` vs `packages/ui/src/components/field`.
- [ ] Standardize `packages/ui/src/utils/cn.ts` usage.
- [ ] Implement a global `Label` component that can be used as a wrapper.

### Phase 2: Primitive Overhaul
- [ ] **Button**: Move `isLoading` to a higher-level abstraction or keep it but move the spinner to a separate primitive.
- [ ] **Input/Select**: Strip out label/helperText logic into the `Field` wrapper.
- [ ] **Card**: Ensure all sub-components (`CardHeader`, etc.) support `ref` and have consistent padding.

### Phase 3: Widget & Complex Component Standardization
- [ ] **Sidebar**: Move `cva` to `variants.ts`. Standardize sub-component names.
- [ ] **Switch/Slider**: Align event naming with modern UI library standards (Radix/Shadcn style).

### Phase 4: Audit & Cleanup
- [ ] Remove all `.js` extension inconsistencies (standardize on `.js` for ESM).
- [ ] Run a project-wide lint and type check.

---

## 🎯 4. Expected Outcome
A highly predictable, type-safe UI library where:
1. Every component supports `ref` correctly.
2. Styling is centralized in `variants.ts`.
3. APIs are consistent across the entire library.
4. The Gruvbox theme is applied through reusable tokens and shared variant logic.

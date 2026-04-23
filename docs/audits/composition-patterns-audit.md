# React Composition Patterns Audit

> Audit date: 2026-04-23
> Framework: Vercel React Composition Patterns

## Summary

| Category | Score | Priority |
|----------|-------|---------|
| Component Architecture | 7/10 | HIGH |
| State Management | 8/10 | MEDIUM |
| Implementation Patterns | 8/10 | MEDIUM |
| React 19 APIs | 2/10 | MEDIUM | Uses deprecated forwardRef (REQUIRES FIX)

**Overall: 6.25/10** - Good foundation with identified improvements needed.

---

## 1. Component Architecture (HIGH)

### Findings

| Component | Rule | Status | Notes |
|-----------|------|--------|-------|
| `Sidebar` | `architecture-compound-components` | ✅ PASS | Proper compound pattern with Panel/Main/Toggle |
| `ColorPalette` | `architecture-compound-components` | ✅ PASS | Good compound structure with checked state |
| `Card` | `architecture-compound-components` | ✅ PASS | Simple compound with static sub-components |
| `Button` | `architecture-avoid-boolean-props` | ⚠️ ISSUE | `isLoading` boolean prop |
| `Input` | `architecture-avoid-boolean-props` | ⚠️ ISSUE | `isLoading` boolean prop |

### Issues

#### 1.1 Button isLoading (HIGH)

```tsx
// Current - boolean prop
interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}
```

**Problem**: `isLoading` is a boolean that changes rendering behavior. Should be a variant.

**Recommendation**: Add `loading` variant:

```tsx
// Recommended - variant pattern
const buttonVariants = cva("...", {
  variants: {
    variant: {
      loading: "opacity-50 cursor-wait",
      // ...
    },
  },
});
```

#### 1.2 Input isLoading (HIGH)

Same issue as Button. The `isLoading` prop could be consolidated with `variant="loading"`.

---

## 2. State Management (MEDIUM)

### Findings

| Component | Rule | Status | Notes |
|-----------|------|--------|-------|
| mosaic-store | `state-lift-state` | ✅ PASS | Zustand with proper state |
| sequence-store | `state-lift-state` | ✅ PASS | Clean Zustand store |
| Form components | `state-context-interface` | ⚠️ WATCH | Local useId instead of shared context |

### Issues

#### 2.1 Form Label Context (LOW)

Each form component (Input, Select, Slider, Switch) uses local `useId()` for its label association:

```tsx
// Current - local useId
const generatedId = useId();
const inputId = id ?? generatedId;
```

**Recommendation**: Create a shared `FormContext` for label IDs:

```tsx
// Optional improvement - shared context
const FormContext = createContext<{ generatedId: string }>(null);

function Form({ id, children }) {
  const generatedId = useId();
  return (
    <FormContext.Provider value={{ generatedId }}>
      {children}
    </FormContext.Provider>
  );
}
```

**Note**: This is a LOW priority improvement since the current pattern works correctly.

---

## 3. Implementation Patterns (MEDIUM)

### Findings

| Pattern | Component | Status | Notes |
|---------|-----------|--------|-------|
| CVA variants | All form components | ✅ PASS | Consistent use of class-variance-authority |
| Static sub-components | Card | ✅ PASS | CardHeader/CardContent work without context |
| Compound API | Sidebar | ✅ PASS | Panel/Main/Toggle compounds |

### Issues

#### 3.1 Label/HelperText Duplication (LOW)

Components like Input, Select, Slider, Switch all have the same `label` and `helperText` props with identical styling logic:

```tsx
// Repeated in multiple components
label && (
  <label htmlFor={id} className="text-xs text-foreground/80">
    {label}
  </label>
)
helperText && (
  <p className={cn("text-xs italic", variant === "destructive" ? "text-destructive" : "text-muted-foreground")}>
    {helperText}
  </p>
)
```

**Recommendation**: Extract a `FormField` wrapper component:

```tsx
// Optional improvement
function FormField({ label, helperText, variant, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label>{label}</Label>}
      {children}
      {helperText && <HelperText variant={variant}>{helperText}</HelperText>}
    </div>
  );
}
```

---

## 4. React 19 APIs (MEDIUM)

### Findings

✅ React 19 is in use in this codebase.

### Issues

#### 4.1 forwardRef Usage (MEDIUM - REQUIRES FIX)

All UI components use `forwardRef` which is deprecated in React 19:

```tsx
// Current - deprecated in React 19
function Button({ ref, ...props }: ButtonProps) {
  return <button ref={ref} ...>;
}
```

**Problem**: `forwardRef` is deprecated in React 19. Should use direct ref without wrapper.

**Recommendation**: Use React 19 `use()` for refs:

```tsx
// React 19 - recommended
import { useRef } from "react";

function Button(props) {
  return <button ...>;
}
```

---

## Recommendations Priority

| Priority | Action | Effort |
|----------|--------|--------|
| HIGH | Convert `isLoading` boolean to variant | Low |
| MEDIUM | Fix forwardRef to use React 19 API | Medium |
| MEDIUM | Create FormField wrapper | Medium |
| LOW | Create shared FormContext | Medium |

---

## Score Breakdown

```
Component Architecture:  7/10 ✓ Good compounds, needs boolean removal
State Management:    8/10 ✓ Zustand usage is correct
Implementation:     8/10 ✓ CVA used consistently
React 19 APIs:     2/10 ✗ Uses deprecated forwardRef (REQUIRES FIX)
-----------------------------------
Overall:           6.25/10
```

---

## Appendix: Components Audited

| File | Lines | Issues |
|------|-------|--------|
| `packages/ui/src/components/button/Button.tsx` | 56 | isLoading boolean |
| `packages/ui/src/components/input/Input.tsx` | 100 | isLoading boolean |
| `packages/ui/src/components/slider/Slider.tsx` | 120 | None |
| `packages/ui/src/components/switch/Switch.tsx` | 74 | None |
| `packages/ui/src/components/select/Select.tsx` | 65 | None |
| `packages/ui/src/components/label/Label.tsx` | 20 | None |
| `packages/ui/src/components/card/Card.tsx` | 39 | None |
| `packages/ui/src/components/widgets/sidebar/Sidebar.tsx` | 125 | None |
| `packages/ui/src/components/widgets/ColorPalette/ColorPalette.tsx` | 63 | None |

### State Stores

| File | Lines | Issues |
|------|-------|--------|
| `packages/mosaic-maker/src/store/useMosaicStore.tsx` | 131 | None |
| `packages/sequence-renderer/src/store/useSequenceStore.tsx` | 49 | None |
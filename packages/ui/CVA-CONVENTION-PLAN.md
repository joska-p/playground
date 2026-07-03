# CVA Convention Plan for `@repo/ui`

## Goal

Unify every component in `packages/ui` under a single, predictable variant pattern using `cva()` from `class-variance-authority`. Every file that renders JSX elements must follow the same shape.

---

## Convention Rules

1. **Every component uses CVA.** Import `cva` from `class-variance-authority`. Even zero-variation components wrap their base Tailwind string in `cva()`.

2. **Standard `variant` dimension** (when applicable):

   ```
   default | primary | secondary | accent | destructive | warning
   ```
   - `default` has **real Tailwind classes** — never empty string.
   - `primary`/`secondary`/`accent`/`destructive`/`warning` follow the project's CSS token palette.
   - Component-specific variants (`soft`, `solid`, `outline`, `dot`, `interactive`, etc.) are additive and optional.

3. **Required shape** in every component:

   ```tsx
   const fooVariants = cva('base classes', {
     variants: {
       variant: { ... },        // if there are visual variations
       size: { ... },           // if applicable (opt-in)
     },
     defaultVariants: {
       variant: 'default',      // or 'primary' if no 'default' tier exists
     }
   })

   function Foo({ variant, size, className, ...props }: FooProps) {
     return (
       <div className={cn(fooVariants({ variant, size }), className)} {...props} />
     )
   }
   ```

4. **`className` is always forwarded** to the root/container element via `cn(...)`.

5. **Types**: Props use `VariantProps<typeof fooVariants>` for variant dimensions + `ComponentProps<'element'>` for HTML attributes.

6. **File structure**: Component in `Foo.tsx`, variants in `fooVariants.ts` (kebab-case filename matching the exported identifier).

---

## Step-by-Step Execution Plan

### Phase 0: Convention doc (1 file)

- [ ] Write `apps/playground/src/content/docs/explanation/ui-component-variants.md`

### Phase 1: Fix existing CVA definitions (8 files)

| Step | File                                                 | Current problem                   | Fix                                                 |
| ---- | ---------------------------------------------------- | --------------------------------- | --------------------------------------------------- |
| 1a   | `cardVariants.ts`                                    | `default: ''`                     | Add `'bg-surface'` or similar base-level class      |
| 1b   | `accordionVariants.ts`                               | `default: ''` (2 variant sets)    | Same — add a subtle default style                   |
| 1c   | `carouselSlideVariants.ts`                           | `default: ''`                     | Same                                                |
| 1d   | `dialogVariants.ts`                                  | `default: ''`                     | Add `'bg-surface shadow-lg'`                        |
| 1e   | `popoverVariants.ts`                                 | `default: ''`                     | Add `'bg-surface shadow-lg'`                        |
| 1f   | `tabsVariants.ts`                                    | `default: ''`                     | Add `'bg-surface'`                                  |
| 1g   | `toastVariants.ts`                                   | **All 6 values empty**            | Give each real Tailwind classes                     |
| 1h   | `DefaultFallback.tsx` + `defaultFallbackVariants.ts` | Orphaned CVA — defined but unused | Import & use `defaultFallbackVariants` in component |

### Phase 2: Wire up under-utilized CVA (1 file)

| Step | File                | Current problem                                                         | Fix                                         |
| ---- | ------------------- | ----------------------------------------------------------------------- | ------------------------------------------- |
| 2a   | `CarouselSlide.tsx` | `carouselSlideVariants()` called with no args; size/variant not exposed | Add `size` and `variant` props, pass to CVA |

### Phase 3: Add CVA to zero-variant components (5 files)

| Step | File                      | Current                                       | Fix                                                                                               |
| ---- | ------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 3a   | `Label.tsx`               | Manual `cn('text-sm font-medium', className)` | Create `labelVariants.ts` with `cva('text-sm font-medium')`; use `cn(labelVariants(), className)` |
| 3b   | `HelperText.tsx`          | Manual `cn()` with `destructive` boolean      | Create `helperTextVariants.ts` with `variant: { default, destructive }` dimension                 |
| 3c   | `Icon.tsx` + `iconMap.ts` | No CVA, no base styling                       | Create `iconVariants.ts` with `cva('...')` if any base SVG sizing is needed                       |
| 3d   | `ErrorBoundary.tsx`       | Wrapper component, no styling                 | Minimal — if no visual elements, skip; otherwise `errorBoundaryVariants.ts`                       |
| 3e   | `ChangelogItem.tsx`       | Hardcoded classes, no `cn()` at all           | Create `changelogItemVariants.ts` + pattern-following component                                   |

### Phase 4: Add CVA to Stylistic components (12 files)

| Step | File                   | Current approach                      | Variants needed                                          |
| ---- | ---------------------- | ------------------------------------- | -------------------------------------------------------- |
| 4a   | `SectionHeading.tsx`   | Manual `cn()` + alignment conditional | `align: { left, center }` dimension                      |
| 4b   | `ColorSwatch.tsx`      | Manual `sizeMap` object               | `size: { sm, md, lg }` dimension                         |
| 4c   | `CategoryCard.tsx`     | Manual `cn()` + inline style          | Base CVA only (accent is dynamic via CSS var)            |
| 4d   | `DocCard.tsx`          | Manual `cn()` + inline style          | Base CVA only                                            |
| 4e   | `ProjectCard.tsx`      | Manual `cn()` + inline style          | Base CVA only                                            |
| 4f   | `MenuItem.tsx`         | Manual ternary for destructive        | `variant: { default, destructive }` dimension            |
| 4g   | `NotificationItem.tsx` | Manual `cn()` + prop-driven class     | Base CVA + consume `iconColor` as-is                     |
| 4h   | `Hero.tsx`             | Manual `cn()` + inline styles         | Base CVA only                                            |
| 4i   | `SectionHeader.tsx`    | Manual `cn()` + alignment conditional | `align: { left, center }` dimension                      |
| 4j   | `FloatingNav.tsx`      | Manual `cn()` + visibility state      | Base CVA only (visibility is runtime state, not variant) |
| 4k   | `ScrollReveal.tsx`     | Manual `cn()` with visibility         | Base CVA only (animation state is runtime)               |

### Phase 5: Add CVA to ControlPanel family (9 files)

| Step  | File                     | Notes                                                                                                                                                              |
| ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 5a    | `ControlPanel.tsx`       | Container — minimal CVA base                                                                                                                                       |
| 5b    | `PanelContent.tsx`       | Container — minimal CVA base                                                                                                                                       |
| 5c    | `ControlSection.tsx`     | Section wrapper — `variant: { default, primary }` for section headers                                                                                              |
| 5d-5i | 6 control sub-components | `Button.tsx`, `Color.tsx`, `ColorPalette.tsx`, `Number.tsx`, `Select.tsx`, `Slider.tsx`, `Text.tsx`, `Toggle.tsx` — each gets CVA if they have any wrapper styling |

### Phase 6: Sidebar family — CSS Modules → CVA (4 files) — highest risk

| Step | File                 | Challenge                                                                                                          |
| ---- | -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 6a   | `sidebar.module.css` | Remove or gut — all `@apply` and data-attribute selectors move to CVA                                              |
| 6b   | `Sidebar.tsx`        | Convert `data-variant`, `data-mobile-position`, `data-desktop-position`, `data-state` into CVA dimensions + `cn()` |
| 6c   | `SidebarMain.tsx`    | Add `sidebarMainVariants.ts`                                                                                       |
| 6d   | `SidebarPanel.tsx`   | Add `sidebarPanelVariants.ts`                                                                                      |
| 6e   | `SidebarToggle.tsx`  | Already delegates to `Button` — minimal CVA for wrapper                                                            |

### Phase 7: Parallel variant maps (Alert + Toast iconColorMap) — deferred decision

Open question: keep `iconColorMap` as a shared constant (extracted to `feedback/iconUtils.ts`), or fold into CVA via compound variants. Resolve after Phase 2.

---

## Verification

After each phase:

```bash
pnpm --filter @repo/ui check-types  # tsc --noEmit
pnpm --filter @repo/ui lint          # eslint .
```

Both must pass with zero errors before moving to the next phase.

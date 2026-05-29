# Tailwind Cleanup Report — @repo/image-to-particles

Generated: 2026-05-29
Directory: /workspaces/playground/packages/image-to-particles

---

## External Dependencies (black boxes)

| Component   | Imported from     | Used in                           |
| ----------- | ----------------- | --------------------------------- |
| `<Button>`  | `@repo/ui/Button` | ImageToParticles.tsx:150          |
| `<Input>`   | `@repo/ui/Input`  | ImageToParticles.tsx:149          |

Heritage analysis skipped for these — they may be worth a separate cleanup session.

---

## Usage Map Summary

The package is a single-page app with one layout shell (`App.tsx`) and one component (`ImageToParticles.tsx`). `App.tsx` renders a full-viewport wrapper with custom theme background/text color tokens, containing `ImageToParticles` as its sole child. `ImageToParticles` uses a `flex flex-col items-center gap-8` layout to stack an `<Input>`, a `<Button>`, and a `<canvas>` vertically. Both `<Input>` and `<Button>` are imported from `@repo/ui` (outside the package boundary). The `<canvas>` is a native element with only `bg-black`.

---

## Proposed Changes

### App.tsx

#### Wrappers to remove

None.

#### Classes to remove — intra-component

None.

#### Classes to remove — heritage

None.

#### Flags — do not touch, requires review

| ID  | Line | Class(es)            | Reason                                                                 |
| --- | ---- | -------------------- | ---------------------------------------------------------------------- |
| F1  | 5    | `bg-background`      | Custom theme token imported from `@repo/ui/gruvbox-theme` — verify it exists |
| F2  | 5    | `text-foreground`    | Custom theme token imported from `@repo/ui/gruvbox-theme` — verify it exists |

---

### ImageToParticles.tsx

#### Wrappers to remove

None.

#### Classes to remove — intra-component

None.

#### Classes to remove — heritage

None.

#### Flags — do not touch, requires review

| ID  | Line | Class(es)                          | Reason                                          |
| --- | ---- | ---------------------------------- | ----------------------------------------------- |
| F3  | 150  | `m-2.5 cursor-pointer px-4 py-2`   | `⚠️ EXTERNAL` — passed to `<Button>` from `@repo/ui/Button`, cannot trace internal root classes |

---

### Other files (no changes)

| File                         | Notes                                                   |
| ---------------------------- | ------------------------------------------------------- |
| `src/core/utils.ts`          | Pure functions, no JSX, no Tailwind classes             |
| `src/core/config.ts`         | Pure constants, no JSX, no Tailwind classes             |
| `src/hooks/useImageUpload.ts`| Pure hook, no JSX, no Tailwind classes                  |
| `src/main.tsx`               | Entry point, imports styles, no Tailwind classes        |
| `src/styles/styles.css`      | Tailwind v4 CSS imports only — `@import "tailwindcss"`, `@import "@repo/ui/gruvbox-theme"`, `@source "../../node_modules/@repo/ui/src/components"` |

---

## Summary Table

| File                        | Wrappers | Intra classes | Heritage classes | Flags |
| --------------------------- | -------- | ------------- | ---------------- | ----- |
| App.tsx                     | 0        | 0             | 0                | 2     |
| ImageToParticles.tsx        | 0        | 0             | 0                | 1     |
| **Total**                   | **0**    | **0**         | **0**            | **3** |

---

## Notes for Review

1. **Stray semicolon in App.tsx:5** — A literal `;` character appears after `<ImageToParticles />` inside the JSX, which will render as a visible text node `;` in the DOM. This is not a Tailwind issue, but it is a rendering bug worth fixing.

2. **Theme tokens from external package** — `bg-background` and `text-foreground` are custom tokens defined in `@repo/ui/gruvbox-theme` (outside the package boundary). A separate cleanup pass targeting that package would be needed to verify the token definitions and whether they are used consistently.

3. **No Tailwind lint plugin detected** — `eslint-plugin-tailwindcss` is not in `devDependencies`. The only Tailwind tooling is `prettier-plugin-tailwindcss` (class sorting only). Intra-file duplicates/conflicts are not caught by existing tooling.

4. **Button margin vs parent gap** — `m-2.5` on the `<Button>` at ImageToParticles.tsx:150 adds 10px margin on all sides. The parent uses `flex-col gap-8` (32px vertical gap). Under flexbox, `margin-top`/`margin-bottom` on children adds to the `gap`, resulting in ~42px vertical spacing (gap 32 + margin 10). This may be intentional (visual cushion around the button against the canvas edge) or redundant. Cannot resolve without seeing Button's internal styles.

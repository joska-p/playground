# Palette Engine — Code Health Audit

**Package:** `@repo/palette-engine`
**Source files audited:** 6 (all under `src/`)
**Audit date:** 2026-07-03

---

## Executive Summary

This package is small (~150 lines total), cleanly modular, and notably free of the most severe code smells. Every rule lives in its own file, types are separated from logic, and there is zero React coupling. The architecture is a good example of the "clean duplication" philosophy — each palette rule duplicates the clone-and-modify pattern rather than sharing an abstract helper. Below are the observations, ordered by significance.

---

## File-by-File Findings

### 📄 File: `src/colorSpaces.ts`

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction (minor)
- **Complexity Score:** Low
- **Architectural Observation:** The `Axis` type conflates two distinct concepts — a plot axis (which needs `label`, `min`, `max`) and a slider control (which additionally needs `step`). The `step` field is optional on the base `Axis` type but is _only ever_ populated on `zSlider` definitions (lines 21, 31, 41, 51). This means every `Axis` consumer must handle the `step` being potentially absent even though the distinction is structural, not data-driven. A cleaner approach would split this into `Axis` and `SliderAxis` or use a discriminated union. That said, the module is only 60 lines total and this smell has zero downstream impact.
- **Impact on Strictness:** None. No type assertions or eslint disables used.

### 📄 File: `src/rules/complementary.ts`

- **Type of Smell:** Universal Function / Hyper-Generic Abstraction (minor observation)
- **Complexity Score:** Low
- **Architectural Observation:** The lightness-variation generation for base and complement colors is cleanly duplicated four times (lines 16–26): `baseLight`, `baseDark`, `compLight`, `compDark`. Each follows the pattern `clone() → Math.min/max(lightness ± 0.2)`. This _intentionally_ avoids a shared helper, which aligns with the preferred philosophy. However, there is a minor inconsistency: `baseDark` reads `base.oklch['l']` (line 20) while `baseLight` reads `baseLight.oklch['l']` (line 17) and `compLight` reads `complement.oklch['l']` (line 23) — all equivalent at runtime since `base` is unmodified at that point, but the inconsistency signals code that was assembled by copy-paste and would be a source of subtle bugs if the order of operations shifted.
- **Impact on Strictness:** None.

### 📄 File: `src/rules/monochromatic.ts`

- **Type of Smell:** Linter Fighting / Type System Friction
- **Complexity Score:** Low
- **Architectural Observation:** The `!= null` guard on line 19 (`c.oklch['c'] != null`) is used to conditionally reduce chroma for extreme lightness values. This is a runtime safety net for TypeScript's strict type checking against the `colorjs.io` library, whose OKLCH type definitions likely mark channels (`l`, `c`, `h`) as potentially `undefined`. Every rule in this package deals with this friction — `analogous.ts` uses `?? 0` (line 17, 20), `complementary.ts` uses `?? 0` (lines 13, 17, 20, 23, 25), and `triadic.ts` uses `!= null` guards (lines 17, 22). This is not an eslint-disable or `as any` escape hatch — the code handles the uncertainty correctly — but the pattern's prevalence across all four rules suggests the `colorjs.io` types are a recurring source of defensive boilerplate.
- **Impact on Strictness:** Uses `!= null` and `?? 0` to work around imprecise external type definitions (colorjs.io OKLCH channels typed as optional). No eslint disables or type assertions.

### 📄 File: `src/rules/analogous.ts`

- **Type of Smell:** Linter Fighting / Type System Friction (same pattern as above)
- **Complexity Score:** Low
- **Architectural Observation:** Same `?? 0` defensive pattern (lines 17, 20) as the other rules. Notable: this rule produces 6 colors (3 angles × 2 variations — base + light), while `triadic.ts` produces 6 colors and `complementary.ts` produces 6 colors. The explosion factor (variation multiplier) is hardcoded within each rule rather than extracted, but given the small scale this is appropriately clean duplication.
- **Impact on Strictness:** None beyond the shared `?? 0` pattern described above.

### 📄 File: `src/rules/triadic.ts`

- **Type of Smell:** Linter Fighting / Type System Friction
- **Complexity Score:** Low
- **Architectural Observation:** This rule uses `!= null` guards for both `h` (line 17) and `l` (line 22) channel access, which is the most defensive of all four rules. The `variation` brightness flip (`> 0.5 ? - 0.2 : + 0.2`) on line 23–24 is the only place in the codebase where a conditional branching decision depends on the current color's channel value at runtime, rather than applying a fixed offset. This is a mild "hidden branch" — the palette output changes qualitatively based on the input color's lightness, which is less predictable for a downstream consumer than the fixed-offset approach used by `complementary.ts`.
- **Impact on Strictness:** None beyond the `!= null` pattern. No eslint disables.

### 📄 File: `src/types.ts`

**No code smells found.** Clean, minimal, single-responsibility types (13 lines). The `Palette` and `Rule` types are the only exports.

### 📄 File: `src/generatePalette.ts`

**No code smells found.** A one-function module (10 lines) that simply delegates to `rule.apply()`. Correct use of type-only imports.

---

## Cross-Cutting Observations

### React 19 / React Compiler Friction

**Not applicable.** This package contains zero React code — no components, no hooks, no JSX. It is a pure TypeScript library. The only React consumer (`packages/palette-generator`) lives outside the audit boundary.

### ESLint / TypeScript Config

Both `eslint.config.js` and `tsconfig.json` are trivial passthroughs to shared workspace configs (`@repo/config-eslint`, `@repo/config-typescript`). No local overrides, no relaxed rules, no `/* eslint-disable */` comments anywhere in the source.

### Testing Coverage

**None.** Zero test files exist in this package. All four rules and the `generatePalette` entry point are untested. For math-heavy color transformation code, this is a notable risk — a subtle mistake in the OKLCH channel arithmetic (e.g., hue normalization, lightness clamping) would go undetected.

---

## Summary Matrix

| File                         | Universal Function | Linter Fighting  | React Friction | Score      |
| ---------------------------- | ------------------ | ---------------- | -------------- | ---------- |
| `src/types.ts`               | —                  | —                | N/A            | Clean      |
| `src/generatePalette.ts`     | —                  | —                | N/A            | Clean      |
| `src/colorSpaces.ts`         | Minor              | —                | N/A            | Near-clean |
| `src/rules/analogous.ts`     | —                  | Mild (`??`)      | N/A            | Near-clean |
| `src/rules/complementary.ts` | Minor (clean dup)  | Mild (`??`)      | N/A            | Near-clean |
| `src/rules/monochromatic.ts` | —                  | Mild (`!= null`) | N/A            | Near-clean |
| `src/rules/triadic.ts`       | —                  | Mild (`!= null`) | N/A            | Near-clean |

**Overall assessment:** Clean, well-structured, small package. The primary architectural concern is the ripple of defensive `?? 0` / `!= null` patterns caused by upstream `colorjs.io` type definitions. No refactoring urgency.

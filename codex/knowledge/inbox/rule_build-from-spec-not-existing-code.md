## title: 'Build from spec, not from existing code'

date: 2026-08-26
type: rule
tags: [design-system, tlc, architecture]

**Context:** When creating TLC components that replace @repo/ui components, the user explicitly requested not copying existing implementations. The principle: reference the spec (`drafts/specsv1.md`) and the consuming code's needs, not the old component source.

**Corps:**
When building a replacement component in @repo/tlc:

1. Read the spec for the component's contract (if it exists)
2. Read how the consuming code actually uses the component (props, layout context)
3. Design from TLC patterns (cva variants, cn(), native HTML, semantic tokens)
4. Never open the @repo/ui source to copy — it leads to importing unnecessary complexity

**Lien codebase:** `packages/tlc/src/controls/color-palette.tsx` (built from mosaic-maker usage, not @repo/ui source)

# TLC Migration Inventory — Component Priority Map

**Context:** When migrating apps from @repo/ui to @repo/tlc, we need to know which missing components block the most consumers.

**Description:** Import frequency analysis across 17 packages still on @repo/ui. High-impact missing components: Input (10), ControlGrid (21 — though often replaceable with Tailwind grid), ControlRow (15 — partially covered by Field+value). Medium: Badge (7), Card (6), Textarea (4), Sidebar (4), Checkbox (3), Icon (3), Accordion (6). Low: SectionHeading, Hero, ColorSwatch, DefaultFallback, ControlConditional.

**Lien codebase:** `packages/tlc/src/controls/index.ts`, `_TEMP/handoff/2026-08-26_tlc-migration-inventory.md`

### Action Kanban

```bash
./scripts/kanban.sh idea "TLC Missing Components Inventory" -b "Import frequency analysis across 17 packages. High: Input, ControlGrid, ControlRow. Medium: Badge, Card, Textarea, Sidebar, Checkbox, Icon, Accordion."
```

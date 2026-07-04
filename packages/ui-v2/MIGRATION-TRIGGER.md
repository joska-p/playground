# Migration trigger — paste this in a new session

```
Migrate component #11 from the old packages/ui to packages/ui-v2.
! DON'T DELETE the old one

Read packages/ui-v2/MIGRATE-COMPONENT.md for full context (directory structure, redesign rules, import map, existing components list).

Rules:
1. This is a redesign, not a copy-paste. Rewrite to match v2 design language.
2. Follow all guidelines in MIGRATE-COMPONENT.md.
3. After migration, run: pnpm --filter @repo/ui-v2 check-types && pnpm --filter @repo/ui-v2 lint
```

# bg-muted : token fantôme jamais défini

**Contexte :** Même audit que muted-foreground. `bg-muted` utilisé dans ~34 endroits mais jamais déclaré.

**Corps :** `--muted` et `--color-muted` n'existent pas dans le theme. Toutes les classes `bg-muted`, `bg-muted/10`, `bg-muted/30`, `bg-muted/40`, `bg-muted/5`, `bg-muted/60` résolvent à rien. Les backgrounds attendus ne s'affichent pas.

Le token de remplacement est `bg-surface` — c'est le background "recessed/base" du design system. `bg-muted` est un autre résidu shadcn/ui.

Cas particulier : `bg-muted-foreground/50` et `bg-muted-foreground/60` (2 usages dans NavCategory.astro et ApiReferenceNav.astro) utilisaient un token _foreground_ comme background — doublement incorrect. Remplacé par `bg-foreground-dim/{50,60}`.

**Lien codebase :** `apps/playground/src/components/ui/docs/` (TokenTable, TypographyTable, RadiusTable, NavCategory, ApiReference, ApiReferenceNav), `apps/playground/src/pages/404.astro`

### Action Issue GitHub

```bash
gh issue create --title "Bug: bg-muted token undefined — ~34 broken background classes" --body "bg-muted resolves to nothing in docs components and 404 page. Replace with bg-surface. Also bg-muted-foreground used as background is semantically wrong — use bg-foreground-dim instead."
```

# muted-foreground : token fantôme jamais défini

**Contexte :** Audit des tokens arbitraires dans apps/playground + packages/ui. Découvert que `text-muted-foreground` et `bg-muted` résolvent à rien.

**Corps :** `--muted-foreground` n'est jamais déclaré comme variable CSS custom property, et `--color-muted-foreground` n'existe pas dans le `@theme inline`. Pourtant, ~100+ usages de `text-muted-foreground` existent dans le codebase (principalement dans packages/pixel, mandelbrot, graph-viz, randomart, automa, et les composants docs). Toutes ces classes résolvent silencieusement à inherit/transparent — le texte prend la couleur du parent au lieu de la couleur voulue.

Le vrai token est `--foreground-dim` (défini, 51+ usages fonctionnels). `--foreground-muted` existe aussi dans le theme mais n'est utilisé nulle part.

Le problème vient d'une migration incomplète depuis la convention shadcn/ui (`muted-foreground`) vers la convention du projet (`foreground-dim`).

**Lien codebase :** `packages/ui/src/styles/gruvbox-theme.css:127-128`, `packages/ui/src/components/cards/shared/CardDescription.tsx:10`

### Action Issue GitHub

```bash
gh issue create --title "Bug: muted-foreground token undefined — ~100+ broken text classes" --body "text-muted-foreground resolves to nothing. The canonical token is foreground-dim. All usages in packages/pixel, mandelbrot, graph-viz, randomart, automa, and docs components need migration."
```

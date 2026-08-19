---
title: 'foreground-dim est le token canonique pour le texte dé-emphasisé'
date: 2026-08-19
type: rule
tags: [design-tokens, tailwind, naming]
---

## Contexte

Le codebase avait deux conventions en concurrence : `muted-foreground` (shadcn/ui) et `foreground-dim` (projet). La première est un token fantôme — jamais défini, ~100+ usages silencieusement cassés.

## Corps

`foreground-dim` est le seul token valide pour tout ce qui est texte secondaire, placeholder, label de section, icône de chevron, etc.

**Tokens interdits (jamais définis) :**
- `muted-foreground` → utiliser `foreground-dim`
- `bg-muted-foreground` → utiliser `bg-foreground-dim` (rare, et conceptuellement douteux d'utiliser un foreground comme background)
- `--muted-foreground` dans CSS → utiliser `var(--foreground-dim)`

**Token orphelin (défini mais jamais utilisé) :**
- `foreground-muted` — existe dans le theme mais zéro consommation. Considérer la suppression ou un rôle distinct.

**Règle :** Tout nouveau composant qui a besoin de texte "de second plan" utilise `text-foreground-dim`. Pas de créer de nouveau token pour ça.

## Lien codebase :** `packages/ui/src/styles/gruvbox-theme.css:127-128`, `packages/ui/src/lib/colorVariant.ts`

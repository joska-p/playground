---
title: 'surface vs surface-raised : hiérarchie d\'élévation distincte'
date: 2026-08-19
type: rule
tags: [design-tokens, tailwind, architecture]
---

## Contexte

Question posée : faut-il conserver les deux tokens `surface` et `surface-raised` ou les fusionner ?

## Corps

Les deux tokens ont des rôles sémantiquement distincts et propres :

| Token            | Rôle                                                     | Exemples                              |
| ---------------- | -------------------------------------------------------- | ------------------------------------- |
| `surface`        | Base/recessed — champs de formulaire, panneaux flottants | Input, Textarea, Select, ControlPanel |
| `surface-raised` | Éléments interactifs/prominents — boutons, badges, cards | Button default, Badge, Card, Sidebar  |

Delta de lightness OKLCH : 6.7% (dark mode), 2.8% (light mode). Suit les conventions Material Design d'élévation.

**Règle :** Ne pas fusionner. `bg-surface` pour les containers "enfoncés". `bg-surface-raised` pour les éléments qui "flottent" au-dessus.

## Lien codebase :** `packages/ui/src/styles/gruvbox-theme.css:124-125,156-157`

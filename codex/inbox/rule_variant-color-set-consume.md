---
title: 'Le pattern --variant-color set/consume est intentionnel et ne peut pas être remplacé'
date: 2026-08-19
type: rule
tags: [design-tokens, tailwind, css-variables, architecture]
---

## Contexte

Question posée : est-ce que le pattern `[--variant-color:var(--primary)]` + `text-(--variant-color)` pourrait être remplacé par des tokens Tailwind statiques ?

## Corps

Non. Le pattern set/consume est nécessaire pour trois raisons :

1. **Valeur par instance, pas globale.** Un token theme est une valeur fixe. `--variant-color` change selon la variante choisie (primary, accent, destructive...) — c'est un "slot" CSS qui cascade.

2. **Opacités variées.** Le même `--variant-color` est consommé à 5% (bg subtle), 10% (badge bg), 20% (border), 25% (badge border), 95% (hover border). Avec un token statique, il faudrait 5 tokens dédiés.

3. **Consommation hors Tailwind.** SVG utilise `stroke="var(--variant-color)"` et `fill="var(--variant-color)"` en JSX brut — pas de classes Tailwind possibles.

**Règle :** Ne pas créer de `@utility text-variant` ni de token `--color-variant`. Le pattern actuel est la bonne abstraction. Chaque composant CVA définit sa propre map `[--variant-color:var(--{variant})]` inline.

**Note :** `COLOR_VARIABLE_CLASSES` dans `colorVariant.ts` était du dead code (jamais importé) — supprimé dans cette session.

## Lien codebase :** `packages/ui/src/lib/colorVariant.ts`, `packages/ui/src/components/cards/sci-fi-card/variants.ts`, `packages/ui/src/components/cards/shared/CardLink.tsx`

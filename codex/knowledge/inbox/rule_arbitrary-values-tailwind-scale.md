---
title: 'Remplacer les valeurs arbitraires par le scale Tailwind quand possible'
date: 2026-08-19
type: rule
tags: [tailwind, conventions, design-tokens]
---

## Contexte

Inventaire des tokens arbitraires a révélé des patterns répétitifs : `ring-[3px]` (16×), `text-[13px]` (2×), `text-[14px]` (1×), etc.

## Corps

**Règle :** Pour chaque valeur arbitraire bracket, chercher la valeur Tailwind scale la plus proche.

**Convention d'arrondi :**

- Texte : arrondir vers le haut (privilegier la lisibilité)
- Espacement/layout : arrondir vers le bas

**Mapping appliqué :**

| Avant         | Après     | Raison                                          |
| ------------- | --------- | ----------------------------------------------- |
| `ring-[3px]`  | `ring-3`  | Scale Tailwind existe (taille de ring standard) |
| `text-[13px]` | `text-xs` | 12px, arrondi vers le bas                       |
| `text-[14px]` | `text-sm` | 14px, match exact                               |
| `text-[12px]` | `text-xs` | 12px, match exact                               |
| `text-[9px]`  | `text-xs` | 12px, arrondi vers le haut                      |

**Exceptions (garder les brackets) :**

- `clamp()` pour le layout responsive — c'est intrinsèque, pas du token
- `grid-cols-[repeat(auto-fit,...)]` — layout intrinsèque
- `max-h-[NNvh]`, `w-[NNch]` — dimensions viewport/caractère, contexte spécifique
- `shadow-[...]` — patterns dynamiques avec `var()`, pas du token
- `active:scale-[.97]` — micro-interaction unique

## Lien codebase :** `packages/ui/src/components/data-entry/input/variants.ts`, `textarea/variants.ts`, `switch/Switch.tsx`

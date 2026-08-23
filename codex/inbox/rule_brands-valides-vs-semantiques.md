---
title: 'Deux catégories de Branded Types : validés vs sémantiques'
date: 2026-08-23
type: rule
tags: [typescript, types, branded-types, design, glaze]
---

**Contexte :** Tâches #1–#2 du refactor `glaze` : fallait décider où mettre la validation quand on brande, et quand un cast `as` est honnête.

**Corps :**
Il existe deux familles de marques, avec des règles différentes :

1. **Marques à invariant mathématique** (`ZoomFactor`, `DurationSeconds`) : le brand promet une propriété vérifiable (strictement positif, fini). Le cast `as` y est **interdit** hors factory — seule `createZoomFactor(n)` valide puis brande.
2. **Marques de repère sémantique** (`ScreenPoint` vs `WorldPoint`) : toute paire `{x, y}` finie est un point écran ET un point monde ; la marque encode _le rôle_, pas une propriété. Deux conséquences :
    - Les conversions entrantes (`toScreenPoint(p)`) valident seulement la finitude et marquent l'intention au point de franchissement de frontière.
    - Sur les chemins de **retour en arithmétique pure** (méthodes qui calculent depuis des entrées déjà validées), le cast `as WorldPoint` est honnête : l'arithmétique ne peut pas fabriquer un invalide dans un domaine où tout fini est valide.

Le piège : appliquer la règle 1 partout (usine à validations inutiles) ou la règle 2 partout (brands décoratifs qui ne protègent rien).

**Lien codebase :** `packages/glaze/src/core/types.ts` vs `packages/glaze/src/core/Camera.ts`

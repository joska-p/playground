---
title: "readonly sur un champ objet = théâtre d'immutabilité"
date: 2026-08-23
type: rule
tags: [typescript, immutability, gotcha]
---

**Contexte :** `InputStore` exposait `readonly pointer: Point2D` — mais ce `readonly` empêche seulement la réassignation du champ, pas `store.pointer.x = 42` par n'importe quel consommateur. Combiné au passage de cette même référence aux subscribers, l'état interne était corruptible de l'extérieur.

**Corps :**
Trois options honnêtes, par ordre de préférence :

1. Champ privé + accesseur retournant une copie fraîche `{ ...state }`.
2. Publier `Readonly<Point2D>` (bloque l'écriture de propriété au compile-time côté consommateur).
3. Si une vue live est nécessaire pour la perf : la nommer honnêtement (`livePointerView`) ET geler l'objet.

Gotcha : `readonly` sur le champ ≠ immutabilité de l'objet. Le modificateur ne protège que contre `store.pointer = {...}`, jamais contre la mutation profonde.

**Lien codebase :** `packages/glaze/src/core/InputStore.ts` (lignes 29-32)

---

## title: 'Snapshot semantics: one per notification pass, shared, post-mutation'

date: 2026-08-25
type: rule
tags: [architecture, testing, immutability]

**Contexte :** En testant les snapshots figés de InputStore, on a découvert que les hypothèses initiales sur le comportement étaient fausses.

**Corps :**
Quand un dispatcher notifie plusieurs abonnés avec un snapshot figé :

1. **Un seul snapshot par pass** — `#snapshotPointer()` est appelé une seule fois, puis le même objet figé est passé à tous les abonnés dans la boucle de notification. Ce n'est PAS un snapshot par abonné.
2. **Post-mutation** — le snapshot est pris APRÈS `#updatePointer()`, donc il reflète l'état mis à jour, pas l'état d'avant l'événement.
3. **Immuable** — `Object.freeze()` empêche toute mutation rétroactive, mais tous les abonnés partagent la même référence.

**Implication pour les tests :** Deux abonnés au même événement reçoivent lemême objet (`a[0] === b[0]`). Pour tester la distinction, il faut comparer des snapshots de notifications différentes.

**Lien codebase :** `packages/glaze/src/core/InputStore.ts:210-215` (#notifyPointer), `packages/glaze/src/core/InputStore.test.ts` (tests snapshots)

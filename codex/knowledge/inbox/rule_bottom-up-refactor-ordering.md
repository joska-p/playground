---
title: "Refactoring en couches : feuilles d'abord, adaptateurs en dernier"
date: 2026-08-23
type: rule
tags: [architecture, refactoring, methodology]
---

**Contexte :** l'ordre de refactoring de `glaze/core` (25 findings sur 3 passes) devait être séquencé sans casser la compilation ni créer de dépendances circulaires de migration.

**Corps :**
Ordonner bottom-up selon le graphe de dépendances, une couche = un état compilable vert :

1. **Vocabulaire partagé** (branded types, factories validantes) — zéro risque, tout le monde en dépend.
2. **Modules d'état purs** (`Camera`, `Clock`) — testables sans mock.
3. **Couche commandes/transformations** (`(state, input) => state`).
4. **Adaptateurs environnement** (clock/scheduler/DOM injectés, defaults préservant le comportement).
5. **Composition/wiring final** — change en dernier car sa surface bouge à chaque étape.

Gotcha : commencer par les couches hautes oblige à mocker ce qui n'existe pas encore et multiplie les reworks. Le vocabulaire typé atterrit en premier précisément parce que toutes les autres couches veulent sa terminologie.

**Lien codebase :** `GLAZE_REFACTOR_INVENTORY.md` (« Recommended Order of Refactoring for core/ »)

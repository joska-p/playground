---
title: 'Moteur impératif dans le store zustand : champ stable + callback injecté'
date: 2026-08-21
type: rule
tags: [zustand, react, architecture]
---

**Contexte :** SimulationEngine embarquait son propre mini-store (listeners + `useSyncExternalStore` + singleton module) en parallèle de `automaStore` : deux sources de vérité, et des contrôles qui appelaient `getSimulationEngine()` au rendu (throw garanti avant init de la surface).

**Corps :**
Règle : un moteur impératif (WebGL, worker…) se stocke comme champ à identité stable dans le store du domaine (`engine: SimulationEngine | null`). Le moteur reste **agnostique au store** : il remonte ses mutations via un callback injecté au constructeur (`onGenerationChange`), ce qui évite le cycle d'imports store→engine→store. Les composants consomment par actions (no-op safe si `null`) et selectors ; l'état réactif (`generation`, `running`…) vit uniquement dans zustand.

Gotchas : supprimer tout appareil de souscription maison quand zustand existe déjà ; `null` avant init est un état gérable (actions qui no-op), pas une exception.

**Lien codebase :** `packages/automa/src/stores/automa/{store,actions,selectors}.ts`, `packages/automa/src/engine/gpu/SimulationEngine.ts`, `codex/docs/conventions/state.md`

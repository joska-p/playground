---
title: 'Absorber une abstraction quand le wrapper devient son unique consommateur'
date: 2026-08-23
type: rule
tags: [architecture, refactoring, abstraction, glaze]
---

**Contexte :** Refactor des surfaces glaze : la spec demandait un `FrameDispatcher` qui *wrapper* `createFrameLoop`. Une fois écrit, les deux classes exposaient des API quasi jumelles (`subscribe`, auto start/stop, `isRunning`, `dispose`). Question de l'utilisateur : « FrameLoop et FrameDispatcher sont la même chose, non ? » Vérification grep : en code réel, `FrameLoop` n'avait qu'un seul consommateur — les surfaces elles-mêmes. Fusion effectuée : `FrameDispatcher` absorbe le rAF (`#rafId`, time/delta, re-arm-before-dispatch), `FrameLoop` supprimé.

**Corps :**
Quand on extrait une duplication vers une nouvelle abstraction qui *wrappe* une abstraction existante, vérifier après coup combien de consommateurs reste-t-il à l'abstraction wrappée :

- **≥ 2 consommateurs réels** → garder les deux couches (le scheduler générique sert ailleurs).
- **1 seul consommateur** (celui qu'on vient d'écrire) → absorber : déplacer les internes dans le wrapper et supprimer l'original. Deux classes jumelles pour un client unique, c'est une couche d'indirection gratuite, une API publique en double, et une doc à maintenir ×2.

Gotcha : compter les consommateurs dans le *code*, pas dans les notes (`rg -l "ClassName" --type ts` en excluant `docs/`, `*.md`, backlog). Les audits et inventaires mentionnent souvent des usages qui n'existent plus. Ne pas confondre « même chose » (faux ici : scheduler pur ≠ fan-out avec cycle de vie) et « redondant pour ce codebase » (vrai).

**Lien codebase :** `packages/glaze/src/core/FrameDispatcher.ts` (ex-`FrameLoop.ts` fusionné), `packages/glaze/src/cpu/CpuSurface.ts`, `packages/glaze/src/gpu/GpuSurface.ts`

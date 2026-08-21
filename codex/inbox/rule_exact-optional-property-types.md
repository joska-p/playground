---
title: 'exactOptionalPropertyTypes : union explicite plutôt que propriété optionelle'
date: 2026-08-21
type: rule
tags: [typescript]
---

**Contexte :** `@repo/config-typescript` étend `@tsconfig/strictest`, qui active `exactOptionalPropertyTypes`. L'affectation d'une valeur `T | undefined` dans un champ déclaré `x?: T` échoue en TS2322.

**Corps :**
Règle : quand un champ doit pouvoir recevoir explicitement `undefined` (ex. callback injecté absent), le déclarer en union explicite `((arg: T) => void) | undefined` et non `?:`.

Gotcha double : l'erreur apparaît sur la **ligne d'affectation**, pas sur la déclaration — on cherche alors un problème inexistant du côté du constructeur.

**Lien codebase :** `packages/config-typescript/base.json`, `packages/automa/src/engine/gpu/SimulationEngine.ts` (`#onGenerationChange`)

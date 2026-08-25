---

## title: 'attach() override pattern: constructor options are defaults, not contracts'

date: 2026-08-25
type: rule
tags: [architecture, dependency-injection, testing]

**Contexte :** En testant l'injection de `bounds` dans InputStore, on s'attendait à ce que `bounds: () => rect` injecté au constructor soit utilisé par `attach()`. Or `attach()` écrase toujours le provider avec `target.getBoundingClientRect()`.

**Corps :**
Quand un adaptateur d'environnement offre une injection de dépendance au constructor ET un `attach(target)` qui lie un élément DOM, le `attach()` a toujours priorité sur les options du constructor pour les dépendances liées à l'élément. Les options du constructor ne servent que de valeurs par défaut avant le premier `attach()` — ou pour les cas où `attach()` n'est jamais appelé. En test, il faut mocker `getBoundingClientRect` via `vi.spyOn(element, 'getBoundingClientRect')` plutôt que de passer l'option `bounds`.

**Piège :** Écrire un test qui injecte `bounds: () => rect` puis appelle `attach(target)` en s'attendront à ce que `rect` soit utilisé — le test passera silencieusement si le rect de jsdom (tout à zéro) donne le même résultat que le rect injecté.

## **Lien codebase :** `packages/glaze/src/core/InputStore.ts:112-114` (constructor), `:163-166` (attach)

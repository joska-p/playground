# Pattern — séquence comme signal paresseux + budget dur (oeis-signal)

Au lieu de matérialiser une séquence en tableau, `oeis-signal` la traite comme un **signal
pull-based** : `next()` tire le terme suivant, `take(count)` matérialise jusqu'à `count` termes
(clampé sur le budget restant), `produced` compte ce qui a déjà été tiré.

Le **Budget** (`maxTerms`) est une limite dure : un module à état (ou une séquence infinie) ne
peut pas exploser la mémoire ou le temps. C'est le garde-fou qui permet de composer des signaux
infinis (naturals, Collatz…) dans une app interactive sans risque.

L'architecture :

- **Module** = boîte noire (`id`/`name`/`description` + `createSignal(budget)`) → on peut brancher
  des modules tiers sans connaître leur implémentation.
- Les modules vivent dans un **registry** typé par `satisfies Record<string, Module>` → `ModuleId`
  est une union des clés, `getModule(id)` et `getAllModules()` pour l'UI.
- `core` + `modules` sont sans DOM (testables en Node), `viz` a son propre tsconfig avec DOM/canvas.
- Les transforms (middle) sont prévues mais seul `identity` (no-op) existe — la pipeline a toujours
  une étape par défaut.

Leçon générale : pour des séquences potentiellement infinies consommées par une UI, un pull avec
budget dur est plus sûr qu'un push (observer) ou qu'une matérialisation complète.

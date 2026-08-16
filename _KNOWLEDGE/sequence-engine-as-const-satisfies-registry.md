# Pattern — `as const satisfies` pour un registry de règles (sequence-engine)

Chaque règle est une valeur littérale typée par `satisfies SequenceRule` + `as const` :

```ts
export const recamanRule = {
    id: 'recaman',
    name: "Recaman's Rule",
    description: '...',
    maxSteps: 1000,
    getNext: ({ index, current, seen }) => { ... }
} as const satisfies SequenceRule;
```

Avantages :

- `as const` garde les littéraux (`id: 'recaman'` reste `'recaman'`, pas `string`) → le registry
  peut dériver une union d'ids : `type RuleId = (typeof initialRules)[number]['id']`.
- `satisfies` vérifie quand même la structure contre le type (pas de `as` mensonger).

Le registry est un **module-global mutable** : `allRules` (copie de la liste initiale) est exporté,
et `registerRule(rule)` permet à des packages tiers d'ajouter des règles au runtime. C'est un
pattern plugin minimal — pas d'injection de dépendance, tout le monde pousse dans la même liste.

Autre contrat : `maxSteps` = « 0 pour illimité ». Le moteur (`generateSequence`) clampe le nombre
d'étapes demandé sur `maxSteps` (sauf si 0). C'est le moteur qui clamp, pas la règle.

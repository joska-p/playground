# Pattern — « brand » runtime pour reconnaître une règle spécialisée (l-system-engine)

`stochasticRule` retourne une `Rule` « normales » mais y accroche discrètement ses productions via
une clé de marquage :

```ts
export const STOCHASTIC_PRODUCTIONS_KEY = '__stochasticProductions';
type StochasticRule = {
    readonly [STOCHASTIC_PRODUCTIONS_KEY]: readonly StochasticProduction[];
} & Rule;
```

C'est un _runtime brand_ : le moteur ne connaît que `Rule` (match/apply), il ignore la clé. Seul
`validate()` teste `STOCHASTIC_PRODUCTIONS_KEY in rule` pour détecter les règles stochastiques et
vérifier que la somme des poids ≈ 1.0 (±0.001). La validation est donc _déferrée_ : les factories
ne lancent jamais d'erreur à la construction, `validate()` est le seul endroit qui peut échouer.

Leçons :

- « Poids = 1.0 » est une contrainte qu'on ne peut pas faire respecter par les types → la porter
  dans la runtime (brand + validateur dédié) plutôt que de thrower tôt.
- Un brand string exotique (`__stochasticProductions`) évite les collisions avec de vrais champs.
- La sélection pondérée utilise la technique des poids cumulés (`r < cumulative`), avec un garde
  de dernier recours pour l'arrondi flottant (retourner la dernière production si `r` tombe au-delà).

Autre contrat intéressant du package : les règles contextuelles (`contextSensitiveRule`) ignorent
les crochets `[` `]` quand elles cherchent le voisin gauche/droite (standard de Prusinkiewicz) —
réglable via `ignoreBrackets: false`.

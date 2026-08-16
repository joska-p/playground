# Pattern — registry objet + `satisfies Record` + `keyof` (randomart-engine-next)

Les registres `OPERATORS` et `RULES` sont des objets littéraux validés contre leur type de valeur,
pas des `Map` :

```ts
export const RULES = {
    classic: classicRule,
    paper: paperRule,
    flow: flowRule,
    fat: fatRule
} satisfies Record<string, Rule>;

export type RuleId = keyof typeof RULES; // 'classic' | 'paper' | 'flow' | 'fat'
```

- `satisfies Record<string, Rule>` garde les clés en littéraux → `keyof typeof` dérive l'union d'ids
  sans `as const` par valeur (variante du pattern sequence-engine, orientée clé plutôt que tableau).
- Ids valides au niveau type ; `hasRule(id)` fait `id in RULES`.

Détails :

- `RuleKind = 'classic'` est une union à un seul membre — « prête à grandir ». Le commentaire le dit
  explicitement, sinon on croit à une faute de frappe.
- Les groupes pour les pickers (`listRuleGroups`, `getOperatorKinds`) passent par des constantes
  `KIND_ORDER` / `KIND_LABELS` : l'ordre d'affichage et le libellé sont séparés du registre lui-même,
  pour que l'ordre des clés n'impose pas l'ordre des pickers.

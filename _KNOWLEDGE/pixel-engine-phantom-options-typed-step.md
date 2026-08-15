# Pattern — phantom `options` pour dériver un `Step` typé

Dans `packages/pixel-engine/src/types.ts`, `ManipulationDefinition<Options>` porte une propriété
`options?: Options` qui n'est **jamais lue à l'exécution** (le runner lit les options du step,
pas de la définition : `step-dispatcher.ts` fait `step.options ?? {}`).

Elle sert uniquement de marqueur de type : `manifest.ts` construit `ManipulationLookup`
(id → `Manipulation['options']`) puis `Step` comme union typée id/options. Résultat : appeler
`definition.execute(...)` ou construire un step garde le typage des options sans coût runtime.

Leçon : un champ "fantôme" qui ne fait que transporter un type peut justifier une ligne de TSDoc,
parce que quelqu'un pourrait vouloir le supprimer en croyant que c'est du mort (il se lit "jamais
utilisé"). C'est le seul commentaire gardé sur les types de ce fichier.

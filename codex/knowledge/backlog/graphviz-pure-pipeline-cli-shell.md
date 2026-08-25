# Pattern — CLI shell vs pipeline pur (graph-viz)

`prepare.ts` fait tout l'I/O (lire `graph.json`, écrire `processed-graph.json`, un checksum
sha256 pour skipper le pipeline si l'entrée n'a pas changé). `pipeline.ts` est une fonction pure
`parseGraph → runSimulation → normalizeCoords → buildOutput` qui renvoie `{ result, stats }`,
sans aucun effet de bord.

Pourquoi c'est bien :

- La pipeline est exécutable par le CLI au build ET par des tests sans file system.
- Le cache par checksum évite de re-simuler 300 ticks à chaque build si rien n'a changé.
- Les `stats` (string[]) remontent des quatre stages et sont imprimées par le shell — la pipeline
  reste muette, c'est le CLI qui affiche.

Leçon : quand une transformation est lourde mais déterministe, découper I/O vs calcul comme ça et
compresser le résultat avec un sentinelle de hash est un pattern cheap et efficace.

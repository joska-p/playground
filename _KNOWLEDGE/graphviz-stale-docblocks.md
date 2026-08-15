# Leçon — docblocks périmés dans graph-viz (deux saveurs)

En nettoyant `packages/graph-viz`, deux commentaires mentaient sur le code :

1. **Comportement décrit mais jamais implémenté.** `visibleCommunities` portait le JSDoc
   "(empty = show all)" — en réalité, un set vide cache TOUT (`writeInstanceData` teste
   `visibleCommunities.has(node.community)`, qui renvoie false). Le commentaire décrivait une
   intention/aspiration, pas le comportement réel. Piège classique : on documente ce qu'on
   _veut_ que le champ fasse, pas ce que le code fait.

2. **Provenance devenue fausse.** Le chemin d'entrée `prepare.ts` était commenté
   "repo-root-level graphify-out/graph.json", mais `resolve(__dirname, '../../data/graph.json')`
   pointe vers `src/data/graph.json`, et le dossier `graphify-out/` n'existe même pas dans le repo.
   Le commentaire racontait le workflow d'origine (l'outil `graphify`), pas le code.

Règle : ne jamais documenter un comportement absent du code, ni coller un chemin/worflow exact à un
const — la vérité est dans `resolve(...)` / le code. Si la provenance est vraiment utile, la garder
vague (l'outil graphify) et l'écrire là où elle ne peut pas pourrir (README, pas le code).

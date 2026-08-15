# randomart-engine — stepRule retiré de la grammaire

Dans `packages/randomart-engine/src/grammar/registry.ts`, trois règles étaient listées en
commentaire mort en fin de fichier :

- `stepRule` : retiré car il produit exactement le même résultat que `>` (comparaison à seuil).
- `recamanPatternRule` / `nestedOscillationRule` : retirés sans raison documentée.

La leçon n'est pas l'absence des règles, c'est la **forme** : un commentaire de fin de fichier qui
relie un retrait de règle à sa justification devient vite invisible (personne ne lit le bas d'un
fichier de registry). Si une règle est supprimée parce qu'un doublon existe, soit on le dit dans le
commit, soit on le note ici — pas en commentaire mort dans le code.

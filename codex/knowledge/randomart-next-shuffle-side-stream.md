# randomart-engine-next — flux RNG séparés (structure / canaux / shuffle)

Trois décisions de design dans `src/prng.ts` + `tree.ts` :

1. **Deux flux RNG** : un flux « structure » (décisions de forme de l'arbre, partagé R/G/B) et des
   flux « canaux » (variation par couleur). Seeded indépendamment (suffixes `_struct_`, `_red`…),
   donc la forme est reproductible mais varie selon le seed. En mode `correlated`, un seul flux est
   partagé par les trois canaux. Le seed de structure embarque `maxDepth`
   (`${seed}_struct_${maxDepth}`) pour que changer la profondeur max change aussi la forme.

2. **Le shuffle n'épuise pas le flux principal** : `seededShuffle` utilise son propre mini-LCG
   (suffixe de seed par profondeur), au lieu de `next()` sur le `SeededRandom`. Sinon mélanger la
   liste des opérateurs consommerait des tirages et décalerait tout le reste de la génération.

3. **`next()`/`nextInt(n)`/`nextByte()`/`nextRange(min,max)`** : toutes dérivées d'un seul tirage
   uniforme — pas de méthodes séparées, le contrat est lisible dans les noms (d'où la suppression
   des TSDoc « describe what » sur ces méthodes).

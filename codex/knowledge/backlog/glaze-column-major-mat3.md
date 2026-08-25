# Glaze — matrices `Mat3` : ordre WebGL, ne pas transposer

Les matrices de `src/gpu/batch/geometry.ts` (`Mat3`) sont rangées dans l'ordre (column-major)
que WebGL attend : on les passe telles quelles à `gl.uniformMatrix3fv`, sans transposer.

Piège classique : on lit la matrice et on a envie de la "corriger" ou de la transposer pour la
rendre lisible — résultat cassé. Le commentaire du type le dit : "takes it as-is".

Leçon : pour un type dont l'ordre d'éléments est contre-intuitif mais imposé par une API, le
commentaire doit dire "ne modifie pas", pas expliquer la formule de disposition.

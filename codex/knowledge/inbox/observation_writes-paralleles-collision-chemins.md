# Batchs d'outils parallèles : les writes destructifs se lient au mauvais chemin

**Corps :** Les appels agents qui mélangent `Write` (fichiers entiers) et `Edit` dans un même bloc parallèle ont provoqué trois collisions contenu↔chemin dans cette seule session : du contenu destiné à un fichier de test a écrasé un autre test (`gestures.test.ts` deux fois, puis `geometry.test.ts`), détecté seulement par vérification a posteriori. Les reads batchés sont sûrs ; les writes ne le sont pas — surtout quand plusieurs invokes portent des contenus longs et des chemins proches.

Protocole qui aurait tout évité : (1) reads et greps en parallèle autant qu'on veut, mais **un seul write par bloc** ; (2) après chaque write, vérification immédiate (`head`, `wc -l`, `git status --short`) avant l'opération suivante ; (3) en cas de collision, `git checkout -- <path>` restaure l'original — possible uniquement tant que rien n'est commité, ce qui est aussi un argument pour des commits granulaires pendant les refactors.

**Exemple session :** Trois écrasements récupérés via `git checkout --` ; aucun dégât final, mais ~4 allers-retours perdus. Le pattern a systématiquement frappé sur les paires `CpuSurface.test.ts`/`gestures.test.ts` et `CameraControls.test.ts`/`geometry.test.ts`.

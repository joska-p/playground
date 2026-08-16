# Mandelbrot — df32 (double-single) : simuler du double précision dans le shader

Le delta δ de perturbation est petit. En simple précision (float32), soustraire/ajouter des
nombres proches provoque une **cancellation catastrophique** : les bits de poids faibles (là où
vit le détail du deep-zoom) sont perdus, ce qui fait apparaître des glitches visibles.

Trick : porter δ dans un `vec2` hi/lo (une paire hi/lo floats = ~48 bits utiles). C'est du
"double-single" (df32) — plus léger que le vrai double que WebGL2 ne supporte pas en tout point.

Détails d'implémentation :

- `twoProduct` décompose `a*b` en hi+err via le splitting par `4097.0` (= 2^12 + 1) — l'algo de
  Dekker/Knuth. Le résultat est `vec2(p, err)` où `p` est le produit arrondi et `err` l'erreur.
- `dsAdd` / `dsMul` combinent ces erreurs pour resserrer le résultat.
- Tout ça tourne sur des `vec2` (re, im) via un struct `cdf` (complexe df32) pour l'itération.

À retenir : dès qu'on doit additionner/soustraire des valeurs de magnitudes très différentes en
GLSL (comme Z + δ), c'est le piège classique de la simple précision → penser hi/lo.

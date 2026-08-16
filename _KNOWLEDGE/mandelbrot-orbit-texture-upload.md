# Mandelbrot — upload de l'orbite : texture à largeur fixe + réutilisation du buffer

La texture d'orbite a une largeur fixe `REF_TEX_WIDTH = 2048` (faite pour le shader). L'orbite
est un tableau interleaved [x0, y0, x1, y1, ...] qui peut contenir jusqu'à `maxIter` points
(typiquement ~10⁴–10⁵, donc quelques dizaines de lignes de 2048 texels).

Stratégie d'upload dans `createOrbitTexture().upload(data, count)` :

- padding du buffer à `width * height * 2` floats (chaque ligne entièrement remplie, RG = 2
  floats par texel) ;
- si la texture existe déjà avec la **même hauteur**, on réutilise le buffer via
  `texSubImage2D` (pas d'allocation) ;
- si l'orbite est plus longue que la hauteur actuelle, on **réalloue** (`texImage2D`) et on
  détruit l'ancienne.

En général on pan/zoome un peu → la longueur d'orbite bouge peu → on réutilise le buffer. On ne
réalloue que quand l'orbite s'allonge beaucoup (zoom profond).

Gotcha : l'orbite est ré-uploadée à chaque pan/zoom qui déclenche un recompute ; c'est le
composant qui garde la dernière orbite (`lastOrbitRef`) pour pouvoir re-uploader après un
`webglcontextrestored` (les textures créées par l'app meurent avec le context loss).

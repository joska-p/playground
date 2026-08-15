# Pattern — tuilage + halo pour borner la mémoire

`runNeighborhoodTiled` (packages/pixel-engine/src/neighborhood-tiling.ts) applique une manipulation
de voisinage par tuiles de 512 px au lieu de toute l'image : la convolution n'a besoin que d'un
morceau à la fois, donc le pic mémoire ne dépend plus de la taille de l'image.

Deux pièges à retenir :
- **halo** = rayon de la manipulation (`radius`). Chaque tuile est prélevée avec une bordure de
  `radius` px autour d'elle, sinon les bords de tuile ressembleraient à des bords d'image
  (artefacts de bordure en damier). `extractTile`/`blitTile` font le décalage
  (`tileX - Math.max(0, tileX - halo)`) pour replacer la tuile sans son halo.
- **bords d'image** : le halo est clampé aux limites de l'image (`Math.max(0, tileX - halo)` /
  `Math.min(imageData.width, ...)`), donc les tuiles du bord sont plus petites.

Choisir TILE_SIZE : un multiple typique de 512 est un compromis entre nombre d'appels et mémoire
par tuile.

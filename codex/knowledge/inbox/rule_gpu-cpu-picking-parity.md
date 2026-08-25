---
title: 'Parité picking/rendu : une seule source de vérité pour le placement grille↔monde'
date: 2026-08-21
type: rule
tags: [webgl, glsl, architecture, coordonnees]
---

**Contexte :** automa affichait sa grille via un letterbox GLSL maison (hack `panNorm` avec `- u_camera.z`) pendant que le picking CPU refaisait un contain-fit différent dans `coordinates.ts`. Les deux coïncidaient à zoom=1 seulement ; au zoom, le curseur et la cellule peinte divergeaient. Le commentaire "drift vertically" dans le shader patchait le symptôme, pas la cause.

**Corps :**
Règle stricte : toute géométrie partagée entre un shader d'affichage et du code CPU de picking vit dans un module TS pur (`computeGridRect` → `{scale, originX, originY}` en unités monde), passée au shader via uniforms. Le shader ne réimplémente jamais le fit.

Le flip Y se fait exactement **une fois**, à la frontière `vUv` (Y-up GL) vers l'espace DOM (Y-down) : `vec2(vUv.x, 1.0 - vUv.y) * (u_resolution / u_dpr)`. Ensuite tout — shader comme CPU — vit dans la même convention Y-down et les formules sont identiques au `floor()` près.

Gotcha : un hack de compensation dans le shader (terme dimensionnellement bizarre absorbant un zoom) ne tient qu'à un zoom donné et masque un désaccord structurel. Si picking et rendu divergent, chercher l'endroit où deux maths équivalentes à zoom=1 cessent de l'équivalent ailleurs.

**Lien codebase :** `packages/automa/src/lib/gridPlacement.ts`, `packages/automa/src/engine/gpu/shaders/cell-mesh.frag`, `packages/automa/src/lib/coordinates.ts`

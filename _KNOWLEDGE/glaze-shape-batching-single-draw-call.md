# Glaze — batching de formes GPU : un seul draw call

`ShapeBatcher` (approche pixelate2d portée dans glaze) : toutes les formes sont tessellées sur le
CPU (position + RGBA par sommet) dans **un seul vertex buffer dynamique**, puis dessinées en
**un seul `drawArrays`** par flush, via un programme partagé avec un seul uniform `u_projection`.

Au lieu de : un render pass fullscreen par forme. Avantage : le nombre de draw calls ne dépend plus
du nombre de formes (limite WebGL courante), le CPU absorbe la tessellation.

Détails liés : `#ensureCapacity` double le buffer quand il déborde (grow exponentiel) ; la
projection du batch est re-flushée quand elle change (`#setBatchProjection` + `sameMat3`).

# Glaze — piège d'unités sur les surfaces (CpuSurface / GpuSurface)

- `surface.time` et `surface.deltaTime` sont en **secondes**, alors que `requestAnimationFrame`
  fournit des **millisecondes** (le callback rAF de `FrameLoop` convertit).
- `surface.width` / `surface.height` sont en **CSS px**, pas en device pixels. Pour le
  backing buffer : `round(cssWidth * dpr)`.
- Les programmes shaders (`renderProgram`) reçoivent les uniforms `width`/`height` en CSS px
  aussi, `dpr` est passé séparément.

Leçon : quand on expose un temps ou une taille, les unités sont le premier truc à documenter —
le nom du champ ne le dit pas.

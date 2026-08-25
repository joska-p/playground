# Glaze — rasterisation de texte GPU : LRU + supersample

`TextRasterizer` dessine le texte sur un canvas 2D **offscreen**, puis l'uploade en texture :

- Cache LRU de 128 entrées clé `(text|font)`. À l'éviction, on supprime **aussi la texture GL**
  (`gl.deleteTexture`) — la mémoire GPU vit et meurt avec le cache.
- Rasterisation à 2× (`TEXT_SCALE`) la taille demandée, pour des bords nets une fois la texture
  mise à l'échelle par le shader.
- `clear()` (appelé au `webglcontextrestored`) libère toutes les textures — les ressources GL
  doivent être recréées après un context loss.

Leçon : dès qu'on cache des ressources GL, l'éviction doit libérer côté GPU, pas seulement le
référence en JS.

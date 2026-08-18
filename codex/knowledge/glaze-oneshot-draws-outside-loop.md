# Glaze — dessin one-shot hors frame loop (CpuSurface)

`CpuSurface` permet de dessiner sans `setDraw()` : appeler `surface.rect()` / `surface.clear()`
directement, sans loop. Deux pièges :

1. **Le canvas doit être dimensionné avant le premier draw.** Le constructor appelle `#resize()`
   une fois up front, sinon le premier resize (fait au début de chaque frame du loop) effacerait
   le buffer — d'où le commentaire "one-shot draws made outside the frame loop survive".
2. **`applyCamera()` ne tourne qu'au début de chaque frame.** Pour un one-shot hors loop, il faut
   l'appeler manuellement, sinon on dessine en coordonnées écran brutes.

Pattern : une surface qui supporte le dessin one-shot doit initialiser son état (taille, transform)
sans dépendre du loop.

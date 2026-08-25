# Glaze — pipeline de coordonnées : où se fait le flip du y

Trajet des coordonnées :

- world (y vers le bas, comme CSS)
- → screen en CSS px (y vers le bas) via `cameraMatrix` : `screen = world * zoom + camera.xy`
- → la boîte -1..1 que GL dessine (y vers le haut) via `viewportMatrix`

Le flip du y se fait dans `viewportMatrix`, pas dans `cameraMatrix`. C'est pourquoi `cameraMatrix`
s'écrit naturellement (zoom, x, y) sans rien inverser, et que `viewportMatrix` a un `-2 / height`.

Leçon : quand des coordonnées changent de sens d'axe entre deux étapes, noter où exactement
l'inversion se produit (sinon on la ré-applique à chaque étape et ça se casse).

# Glaze — handlers React : replace vs additive (asymétrie voulue)

Dans `src/react/interactions.ts`, les handlers custom n'ont pas tous le même rapport aux gestes
built-in :

- `onStart` / `onMove` / `onZoom` **remplacent** le geste built-in correspondant (pan, pan, zoom).
  Si on veut quand même du pan, il faut piloter `event.cameraControls` soi-même.
- `onEnd` / `onContextMenu` sont **toujours** livrés **en plus** des built-ins. Pourquoi : un
  handler custom doit pouvoir relâcher l'état capturé (pointer capture, drag actif) même s'il ne
  gère rien — le nettoyage doit être garanti.

Leçon générale : pour les handlers "nettoyage", la livraison garantie prime ; pour les handlers
"conducteurs" (qui dirigent le geste), le takeover prime. Le pattern `pan`/`zoom` tri-state
(`false` / objet de config / omis) suit la même logique de remplacement.

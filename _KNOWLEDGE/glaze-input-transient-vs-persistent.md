# Glaze — état d'input : transitoire vs persistant

`InputStore` sépare l'état d'entrée en deux catégories :

- **Transitoire** (vidé à chaque frame par `endFrame()`) : `wasKeyPressed(code)` et `wheelDelta`
  (accumulé). Les surfaces appellent `input.endFrame()` à la fin de chaque frame.
- **Persistant** : `isKeyDown(code)`, `mouseDown`, `mouseButtons`, `pointer`, `pointerDelta`.

Conséquence : lire `wasKeyPressed` deux frames de suite ne donne "vrai" qu'une seule fois. C'est
le contrat de "one-shot" que les consommateurs attendent d'un "pressed" (vs "down").

# Design — double-buffering (BufferManager)

Le pipeline pixel-engine passe par `BufferManager` : deux `Uint8ClampedArray` de même taille,
`pointer` (0|1) désigne le buffer courant. Un transform lit `current` et écrit dans `other`, puis
`swap()` inverse la pointe — on ne recrée jamais un buffer pour un simple étage pixel (coûteux).

Points à retenir :

- `snapshot()` renvoie une **copie** `PixelData`, pas une référence au buffer interne : les étapes
  globales reçoivent un objet autonome, et les snapshots intermédiaires de `runPipeline` ne sont
  pas invalidés par les `swap()` suivants.
- `replaceWith()` réalloue les deux buffers et change la taille (c'est le seul chemin qui redimensionne,
  utilisé par les étapes globales et le resize). Il remplace `current` ET `other`, donc tout
  `FusionScheduler` non flushé avant un `replaceWith` perdrait ses étapes pixel en attente.
- Inutile de documenter chaque getter (`current`/`other`/`width`...) : les noms se suffisent.

# Piège — valider les messages qui reviennent d'un worker

`packages/pixel/src/api/pixel.ts` : `deserialize` vérifie le payload renvoyé par le worker avec
`isSerializedImageDataArray` avant de le convertir en `ImageData[]`. Ce n'est pas du paranoïaque :
les données qui traversent `postMessage` passent par le structured-clone et ne sont PAS garantes du
type à l'arrivée — un chemin d'erreur dans le worker pourrait renvoyer autre chose qu'un tableau
d'objets `{data, width, height}`. La garde transforme un crash obscur ("cannot read width of ...")
en erreur lisible ("Invalid serialized ImageData format").

À retenir aussi :
- `serialize` clone l'`ImageData` dans un `PixelData` et **transfère** `clampedCopy.buffer` (zéro-copie,
  le buffer est détaché côté main thread). C'est pourquoi on ne transfère pas `sourceImageData.data`
  directement — il faut une copie pour ne pas voler la mémoire de l'ImageData du caller.
- Le pool est dimensionné sur `navigator.hardwareConcurrency` sans cap : utile sur machines à
  beaucoup de cœurs, dangereux à ~16+ pour des gros buffers (rivalise avec la mémoire). À borner si
  on voit des OOM.

# Pattern — dépendances échangeables via getters, sans re-subscription

`InputRouter` (glaze `src/core/gestures.ts`) lit `cameraControls`, `surface` et `gestures` **au
moment de l'événement**, pas au constructeur :

- `#options` garde les valeurs de départ (dont `getSurface()`),
- `#interaction` construit `cameraControls` et `surface` comme des **getters** évalués à l'accès.

Conséquence : on peut échanger la caméra ou la surface en cours de route sans recréer la
souscription aux événements.

Leçon : quand une dépendance peut changer de vie, la lire par getter (lazy, à l'usage) plutôt que
de la capturer une fois. Attention au coût (getter appelé à chaque accès) — ici négligeable.

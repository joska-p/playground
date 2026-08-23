# Assertions partielles laissent passer un état empoisonné

**Corps :** Pendant le refactor `glaze`, un test de gesture ne testait que `camera.zoom` après un wheel event. L'event, dispatché sans coordonnées, produisait un point NaN qui coulait dans `camera.x/y` via `zoomAt` — invisible car non asserté. Le refactor vers des frontières validantes (throw sur point non-fini) a transformé cette corruption silencieuse en échec immédiat et a exposé le défaut du *test*, pas seulement du code.

Deux leçons : (1) sur un objet d'état mutable, asserter l'état entier (`toEqual({ x, y, zoom })`) plutôt qu'un champ, sinon les champs non-assertés deviennent un dépotoir à NaN ; (2) quand une validation de frontière fait échouer des tests verts depuis longtemps, c'est souvent le signal d'un chemin garbage-in qui existait depuis toujours — corriger la cause (coordonnées explicites dans le test), pas assouplir la validation.

**Exemple session :** `gestures.test.ts > clamps zoom to the configured bounds` : wheel sans `clientX/clientY` sous happy-dom → `toScreenPoint` jetait `Glaze: screen point x must be a finite number, received NaN`. Fix : coordonnées explicites comme le test voisin, garde-fou conservé.

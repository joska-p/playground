---

# FrameToken : preuve compile-time du contrat « endFrame() une fois par frame »

**Contexte :** l'audit Pass 3 a identifié le contrat temporel le plus fragile de `core/` : `InputStore.endFrame()` porte la mention « call once per frame » dans un JSDoc uniquement. Oubli = touche pressée à jamais (`wasKeyPressed` cassé) et `wheelDelta` croissant sans borne ; double appel = input consommé deux fois. Rien ne relie cet appel à une frame réelle.

**Description :** faire émettre par `FrameLoop` un token opaque à chaque tick, consommé obligatoirement par `endFrame(token: FrameToken)` — le protocole FrameLoop↔InputStore devient typé au lieu d'être conventionnel :

```ts
type FrameToken = { readonly __frame: unique symbol };
// FrameLoop.#tick fabrique un token frais, le passe aux callbacks
input.endFrame(token); // compile seulement si on a reçu le token de ce tick
```

Variante minimale sans couplage : renommer en `consumeFrameState()` qui *retourne* `{ pressedKeys, wheelDelta }` en vidant — la consommation devient explicite et observable.

**Lien codebase :** `packages/glaze/src/core/InputStore.ts` (`endFrame` :65-69), `packages/glaze/src/core/FrameLoop.ts`, `GLAZE_REFACTOR_INVENTORY.md` (Section 3, Finding 2)

### Action Kanban

```bash
./scripts/kanban.sh idea "FrameToken pour endFrame()" -b "Le contrat 'once per frame' de InputStore.endFrame est porté par un commentaire. Émettre un token opaque par tick dans FrameLoop et l'exiger en paramètre, ou passer à une API consume-style retournant l'état vidé."
```

---

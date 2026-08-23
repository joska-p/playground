# Aliasing : InputStore passe sa référence mutable aux subscribers

**Contexte :** à chaque event pointer/wheel, les handlers enregistrés via `InputStore.subscribe` reçoivent le même objet que la boucle interne continue de muter.

**Corps :** `InputStore.#updatePointer` mute `this.pointer.x/y` en place (InputStore.ts:102-106), puis notifie avec cette référence live (`handlers[handlerName]?.(event, this.pointer)`, ligne 113 ; idem `wheelPosition` ligne 154). Un subscriber qui stocke `point` — ex. un gesture mémorisant son point d'ancrage au drag — voit l'objet muter sous ses pieds au prochain event. Bugs d'aliasing « l'origine du drag a bougé », dépendants de l'ordre des events, invisibles au typage (`Point2D` promet une valeur, le runtime livre une cible mouvante).

Fix : publier des snapshots figés à la frontière de notification — `{ ...this.pointer }` (éventuellement `Object.freeze`) — tout en gardant la mutation privée pour la perf.

**Lien codebase :** `packages/glaze/src/core/InputStore.ts` (`#notifyPointer`, `#onWheel`), `packages/glaze/src/core/gestures.ts`

### Action Issue GitHub

```bash
gh issue create --title "InputStore: subscribers receive live mutable pointer reference" --body "Les handlers reçoivent this.pointer/wheelPosition par référence alors que #updatePointer les mute en place. Un subscriber qui capture le point (ancre de drag) voit l'objet changer. Fix: émettre { ...pointer } figé dans #notifyPointer/#onWheel."
```

---

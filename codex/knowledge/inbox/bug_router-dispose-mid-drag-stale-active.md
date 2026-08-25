# Dispose du router en plein drag : PanGesture.active reste true (pan fantôme)

**Contexte :** démontage d'un composant pendant un drag actif (unmount, navigation) — `InputRouter.dispose()` ne prévient personne.

**Corps :** si le router est disposé entre `onStart` et `onEnd`, plus aucun event n'atteint les gestures (désabonné), donc `PanGesture.active` reste `true` à jamais (`gestures.ts:36/46/59`). Si la même instance de gesture est réutilisée sous un nouveau router, `onMove` ne vérifie que `this.active` (ligne 53) → pan au simple survol, sans bouton pressé. Teardown suppose implicitement qu'il n'arrive jamais en pleine interaction, sans preuve.

Fix : `dispose()` itère les gestures et appelle un nouveau hook optionnel `gesture.onCancel?.()` que les built-ins implémentent par `active = false`. Alternative : déplacer l'état d'activation dans le router lui-même (il meurt avec), cf. refactor capture-policy déjà planifié.

**Lien codebase :** `packages/glaze/src/core/gestures.ts` (`InputRouter.dispose` :122-124, `PanGesture.active`)

### Action Issue GitHub

```bash
gh issue create --title "InputRouter.dispose leaves gestures with stale active state" --body "Dispose pendant un drag laisse PanGesture.active=true ; réutiliser l'instance provoque un pan fantôme au hover. Fix: hook onCancel appelé par dispose(), ou état d'activation possédé par le router."
```

---

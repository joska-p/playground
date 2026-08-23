# wheelDelta accumule deltaY brut sans normaliser deltaMode → zoom incohérent cross-browser

**Contexte :** le zoom molette (`ZoomGesture`) se comporte ~100× plus fort sur certains navigateurs/configurations.

**Corps :** `InputStore.#onWheel` accumule `this.wheelDelta += event.deltaY` (`InputStore.ts:151`) sans tenir compte de `event.deltaMode`, qui vaut `DOM_DELTA_PIXEL` (Chrome), `DOM_DELTA_LINE` (Firefox par défaut) ou `DOM_DELTA_PAGE`. `ZoomGesture.onZoom` applique ensuite `Math.exp(-deltaY * 0.002)` en supposant implicitement des pixels : en mode lignes, un cran de molette (~3 « lines ») produit un delta interprété comme minuscule, ou inversement l'échelle explose selon la direction d'erreur — bref une sensibilité de zoom dépendante de l'OS/navigateur.

Fix : normaliser une seule fois au point d'ingestion (`#onWheel`) via le multiplicateur `deltaMode` vers un type marqué `WheelPixelDelta`, et typer `wheelDelta: WheelPixelDelta`.

**Lien codebase :** `packages/glaze/src/core/InputStore.ts` (`#onWheel`), `packages/glaze/src/core/gestures.ts` (`ZoomGesture.onZoom`)

### Action Issue GitHub

```bash
gh issue create --title "WheelEvent.deltaY accumulated without deltaMode normalization" --body "InputStore accumule event.deltaY brut alors que son unité dépend de deltaMode (pixel/line/page). ZoomGesture suppose des pixels -> sensibilité zoom variable cross-browser. Fix: normaliser vers WheelPixelDelta dans #onWheel."
```

---

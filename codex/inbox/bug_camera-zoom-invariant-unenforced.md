# Invariant zoom non garanti : division par zéro dans toutes les transforms Camera

**Contexte :** deux portes d'entrée permettent d'introduire un `zoom <= 0` ou NaN dans un `Camera`, alors que `screenToWorld`/`worldToScreen` divisent par cette valeur.

**Corps :**
1. Constructeur permissif : `new Camera(0, 0, 0)` compile (`Camera.ts:24-28`) → `(screen.x - this.x) / this.zoom` produit `Infinity`/`NaN`, empoisonnant chaque coordonnée en aval.
2. Contournement du clamp : `CameraControls.update()` fait `Object.assign(camera, partial)` (`CameraControls.ts:67-69`) sans passer par `clampZoom` — c'est l'unique chemin de mutation qui échappe à l'invariant `zoom ∈ [minZoom, maxZoom]` que le reste du module maintient.
3. Aggravant : le clamp lui-même est NaN-transparent (`Math.max(min, Math.min(max, NaN)) === NaN`), donc même `zoomBy(NaN)`, pourtant clampé, infecte le zoom.

Fix : constructeur privé + factory `createCamera(x, y, zoom: ZoomFactor)` (brand strictement positif fini), patch typé `{ x?: number; y?: number; zoom?: ZoomFactor }` pour `update()`, et validation non-finie avant clamp.

**Lien codebase :** `packages/glaze/src/core/Camera.ts`, `packages/glaze/src/core/CameraControls.ts`

### Action Issue GitHub

```bash
gh issue create --title "Camera: zoom invariant (strictly positive) not enforced" --body "new Camera(0,0,0) et CameraControls.update({zoom:-3}) via Object.assign introduisent zoom<=0/NaN ; screenToWorld divise par zoom -> Infinity. Fix: createCamera factory avec brand ZoomFactor + patch interface typé."
```

---

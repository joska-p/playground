---

# Peinture de cellules par lot dans StateBuffer

**Contexte :** repéré pendant le refactor d'automa — dette de perf laissée hors périmètre. `placeCreature` appelle `paintCell` pour chaque cellule vivante du pattern, et chaque appel fait un pass fullscreen ping-pong complet (un glider ≈ 5 passes 300×400 par clic).

**Description :** ajouter une API batch côté `StateBuffer` (ex. `paintCells(entries: {x, y, value}[])`) : un seul programme/pass qui lit les coordonnées depuis un uniform array ou une petite texture de commandes, puis un seul swap. Côté automa, `placeCreature` et les strokes de peinture (drag = N cellules/frame) passeraient sur cette API unique.

**Lien codebase :** `packages/glaze/src/gpu/StateBuffer.ts`, `packages/automa/src/engine/gpu/SimulationEngine.ts` (`placeCreature`, `#gpuPaint`)

### Action Kanban

```bash
./scripts/kanban.sh idea "Peinture de cellules par lot dans StateBuffer" -b "placeCreature/paintCell font un pass ping-pong plein buffer par cellule ; ajouter StateBuffer.paintCells() pour un seul pass par stroke ou pattern."
```

---

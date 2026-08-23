# La doc vivante qui cite des numéros de ligne pourrit en un seul refactor

**Contexte :** `LifecycleReport.tsx` (page docs embarquée dans glaze) ancre son récit d'architecture à des numéros de ligne précis (`CpuSurface.ts:70`, `GpuSurface.ts:346`, « Line numbers below refer to the current source »). Un seul refactoring de session a rendu la majorité des ancres fausses — et une référence à une API supprimée (`setDraw`) y survivait.

**Description :**
Interdire les numéros de ligne dans les documents vivants ; ancrer sur des noms de symboles stables (`CpuSurface#onFrame`, `FrameDispatcher#subscribe`) ou des chemins de fichiers seuls. Pistes :

- Remplacer progressivement chaque `<Code>CpuSurface.ts:269</Code>` par le symbole qualifié — un renommage casse alors la *recherche*, pas la *vérité*.
- Option outillage : un check lint/CI qui extrait les patterns `\.ts:\d+` des sources de docs et échoue si le fichier a bougé depuis le dernier commit touchant ce symbole.
- Si un numéro est vraiment indispensable (capture d'écran mentale), le coupler au symbole : `#onFrame (CpuSurface.ts)`.

**Lien codebase :** `packages/glaze/src/docs/LifecycleReport.tsx` (CAST, PIPE, sections 02→08)

### Action Kanban

```bash
./scripts/kanban.sh idea "Docs vivantes : bannir les numéros de ligne" -b "LifecycleReport ancre son récit sur .ts:NNN qui pourrissent à chaque refactor. Remplacer par des symboles qualifiés, optionnellement un check CI sur les patterns .ts:N."
```

---

# Clock : config en union discriminée + stratégies d'écoulement extraites

> **✅ Implémentée** (tâche #3 du plan bottom-up, voir `drafts/glaze/handoff.md`) — union
> discriminée `FreeClockOptions | TimedClockOptions` + helpers purs exportés dans
> `packages/glaze/src/core/Clock.ts`, couverte par `Clock.test.ts`.

**Contexte :** deux problèmes liés trouvés sur `Clock` : (1) `ClockOptions` accepte des combinaisons silencieusement sans effet (`{ pingPong: true }` sans duration est stocké puis jamais consulté ; `loop` dérive cachée de la présence de duration) ; (2) `update()` est un monolithe de ~58 lignes mélangeant 4 stratégies temporelles avec mutation inline de `#direction`.

**Description :**
1. Union discriminée alignée sur le comportement runtime :
```ts
type ClockOptions =
    | { mode?: 'free' }
    | { mode: 'timed'; duration: DurationSeconds; loop?: boolean; pingPong?: boolean };
```
2. Extraire les helpers purs (testables aux bornes : deltas géants, hits exacts de duration) :
```ts
advanceFree(time, delta): Seconds;
advancePingPong(time, delta, duration, dir: 1 | -1): { time; dir };
advanceLooping(time, delta, duration): Seconds;
advanceOnce(time, delta, duration): { time; finished: boolean };
```
`update()` réduit au dispatch sur le mode + application du résultat. Les 3 gardes runtime `duration <= 0` disparaissent avec le brand `DurationSeconds`.

**Lien codebase :** `packages/glaze/src/core/Clock.ts` (`update` :102-160, constructeur :19-25), `GLAZE_REFACTOR_INVENTORY.md` (Section 3, Findings 1 & 5)

### Action Kanban

```bash
./scripts/kanban.sh idea "Clock: union discriminée + advance* purs" -b "Rejeter pingPong/loop sans duration via union discriminée ; extraire advanceFree/PingPong/Looping/Once en helpers purs pour que update() ne soit plus qu'un dispatch. Étape 3 du plan bottom-up."
```

---

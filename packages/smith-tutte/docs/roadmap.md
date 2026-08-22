# Roadmap — Tutte & Smith

> À tenir à jour à chaque changement de cap. La version précédente (phases 1-3,
> pensée avant le pivot objet d'ADR-002) est conservée plus bas comme repère fonctionnel,
> mais la stratégie d'exécution est désormais le **vertical slice** (voir ci-dessous).

## Stratégie : vertical slice, pas phases horizontales

Objectif : un visuel à l'écran le plus vite possible, quitte à ce que chaque couche soit
minimale, plutôt que de peaufiner une couche avant de passer à la suivante. Ça donne un
retour concret rapidement et évite de re-tomber dans l'abstraction pure (cf. journal, Entrée 3).

Périmètre volontairement réduit pour la première slice :

- Un seul graphe, codé en dur en TypeScript via l'API `Graph` (pont de Wheatstone). Pas de DSL (ADR-003).
- Une seule vue rendue (le pavage). Le schéma électrique dual vient dans une 2e itération, pas dans la première.
- Rendu Canvas basique, sans pan/zoom, sans interaction.

## Slice 1 — Premier visuel (le jalon actuel)

- [ ] `engine/core/Graph.ts` — structure minimale (Node, Edge), assez pour représenter le pont de Wheatstone.
- [ ] `engine/solver/KirchhoffSolver.ts` — résout le système linéaire pour ce graphe fixe (potentiels + courants).
- [ ] `engine/geometry/SquareLayout.ts` — transforme le graphe résolu en rectangles (x, y, w, h).
- [ ] `interface/CanvasRenderer.ts` — dessine ces rectangles à l'écran. Pas de Viewport/SurfaceAdapter pour l'instant : un canvas statique suffit.
- [ ] Un test unitaire sur le solveur avec le pont de Wheatstone, où le résultat attendu (les 21 carrés du carré parfait simple) est connu à l'avance — c'est le seul moyen de vérifier que le solveur est correct sans se fier à l'œil.

**Critère de fin de slice :** voir le pavage du pont de Wheatstone s'afficher correctement à l'écran, validé par le test.

## Slice 2 — Deuxième vue + interactions minimales

- [ ] Ajouter le rendu du schéma électrique dual, à partir du même graphe enrichi (pas de nouveau modèle).
- [ ] `interface/Viewport.ts` — pan/zoom, `worldToScreen`.
- [ ] Vérifier que `worldToPavage()` / `pavageToNode()` fonctionnent dans les deux sens (ARCHITECTURE.md §3.2).

## Slice 3 — Mutations

- [ ] `subdivideEdge(graph, edgeId)`, `invertDual(graph)` sur l'API `Graph`.
- [ ] Chaque mutation redéclenche solveur + géométrie + rendu, en temps réel.
- [ ] Interaction minimale : cliquer sur un carré ou une branche déclenche une mutation de test.

## Après ça seulement : DSL et projection de surfaces

Ces deux chantiers (`src/dsl/`, `ClosedMesh.ts` / `PlanarFlattener.ts`) ne démarrent qu'une fois les
slices 1-3 stables. Ce sont les deux points les plus incertains du projet (le DSL a besoin de cas d'usage
réels pour être bien conçu, cf. ADR-003 ; la projection de surfaces est un sujet de recherche à part
entière) — les attaquer avant d'avoir un moteur qui marche serait revenir à l'emballement du Level 9.

## Phase 1 — Solveur Kirchhoff minimal (MVP)

- Entrée : un graphe fixe minimal (pont de Wheatstone codé en dur).
- Traitement : résolution du système matriciel → potentiels de nœuds, courants de branches.
- Sortie : génération automatique des rectangles (x, y, w, h).

## Phase 2 — Moteur de mutations

Fonctions utilitaires pures sur la structure de graphe :

- `createBridgeGraph()` — graphe racine.
- `subdivideEdge(graph, edgeId)` — opération série ou parallèle.
- `invertDual(graph)` — transformation duale.

Chaque mutation redéclenche la Phase 1 et recalcule le visuel instantanément.

## Phase 3 — Projection et API d'expérimentation

- Projection planaire : surface fermée → point de coupe → graphe planaire bordé.
- Connexion au moteur graphique via `onFrame(Surface)`.
- Affichage synchronisé côte à côte (pavage + réseau électrique).
- Interaction : cliquer sur une branche ou un carré applique une mutation en temps réel.

## Notes de révision

- Les phases ci-dessus datent d'avant ADR-002 (pivot objet). Elles restent valables comme découpage
  fonctionnel, mais leur implémentation doit suivre la structure de classes définie dans `ARCHITECTURE.md`
  plutôt qu'un style fonctionnel pur.
- Ne pas commencer la Phase 2 avant d'avoir des tests sur la Phase 1 — le solveur est le cœur du système,
  toute erreur s'y propage silencieusement dans la géométrie.

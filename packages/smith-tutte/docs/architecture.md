# Architecture — Tutte & Smith

> **⚠️ Hypothèse de travail, pas une spec figée.** Tant que la Slice 1 (`ROADMAP.md`) ne tourne pas,
> ce document décrit une intention, pas un système existant. Il ne doit être mis à jour **qu'après**
> avoir codé un changement, jamais avant — on documente ce qui existe, on ne prédit plus ce qui va
> exister. Pour les décisions actées en temps réel (qui restent valables même quand cette page change),
> voir `DECISIONS.md`.

> Ce fichier décrit le système tel qu'il est pensé aujourd'hui : comment ça marche,
> pas pourquoi on en est arrivé là. Pour le récit, voir `JOURNAL.md`.
> Pour les choix structurants et leurs alternatives écartées, voir `DECISIONS.md`.

## 1. Le moteur Smith-Tutte

Le projet adopte la méthode historique de Brooks, Smith, Stone et Tutte (1936) plutôt que de saisir la géométrie à la main.

### 1.1 Mécanique générative

1. **La brique topologique de base : le pont.** Les pavages simples (découpages en guillotine, réseaux série/parallèle) ne produisent jamais de carrés tous uniques. La structure minimale pour casser la symétrie est le pont de Wheatstone (cinq résistances, une branche croisée).
2. **La résolution par Kirchhoff.** Chaque branche est une résistance unitaire (R_i = 1 Ω). Les lois de Kirchhoff (nœuds + mailles) donnent un système linéaire dont la résolution fournit le courant I_i de chaque branche. Principe fondamental : la valeur absolue du courant I_i correspond exactement au côté du carré K_i (c_i = |I_i| = V_i).

### 1.2 Pipeline

```text
┌─────────────────────────────────────────────────────────────┐
│                      MOTEUR MÉTA                            │
│   (Générateur de Graphes : Pont, Mutations, Slicing...)     │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Graphe Planaire Raw)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   SOLVEUR DE KIRCHHOFF                      │
│      (Système Linéaire -> Calcul des Courants I_i)          │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Graphe Enrichi avec I_i)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 CONSTRUCTEUR DE GÉOMÉTRIE                   │
│ (Calcul automatique des coordonnées x, y de chaque carré)  │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
      [ Rendu Pavage 2D ]             [ Rendu Schéma RF/Circuit ]
```

## 2. Projection de surfaces (hors périmètre immédiat)

> Voir ADR-004 : ce module est repoussé après le vertical slice historique, et son périmètre est
> volontairement restreint à l'import + aplatissement, pas à la génération de maillage.

Pour produire des graphes planaires riches et asymétriques sans coder des milliers de mutations manuelles, l'idée est de projeter une surface fermée sur un plan.

- N'importe quelle surface sans trou (sphère, cube, icosaèdre...) se déforme topologiquement en sphère. La génération de ce maillage n'est pas le sujet du projet — elle est déléguée à un outil externe (Blender ou autre) et **importée**, pas générée en interne.
- Le maillage importé est ensuite percé en un point choisi et étendu : on obtient un graphe planaire sans croisement.
- Le point de perçage définit le bord extérieur du graphe — donc les bornes du circuit électrique, donc la limite du grand carré à paver.
- Changer le point de perçage change entièrement la topologie du réseau obtenu, et donc le pavage final. C'est un générateur intéressant de variations : maillage importé + point de coupe + Kirchhoff → pavage unique.

Cette API resterait indépendante du moteur électrique (module `topology/`, sans dépendance vers `engine/`) : elle produit un graphe planaire neutre, sans sémantique de résistance, traduit ensuite par un adaptateur vers le `Graph` du solveur.

## 3. Modèle noyau

Une seule source de vérité : le graphe planaire enrichi issu du solveur. Les deux vues (pavage et schéma électrique) en dérivent, jamais de modèles distincts à synchroniser.

```text
                   [ Fichier DSL / Config ]
                              │
                              ▼
                ┌───────────────────────────┐
                │  Graphe Planaire Enrichi  │
                │   (Source Unique de Vérité) │
                └─────────────┬─────────────┘
                              │
       ┌──────────────────────┴──────────────────────┐
       ▼                                             ▼
┌──────────────────────────┐             ┌──────────────────────────┐
│ Vue A : Pavage Geometrique│             │ Vue B : Schema Électrique│
│ (Rectangles & Surfaces)   │             │ (Noeuds & Résistances)   │
└──────────────────────────┘             └──────────────────────────┘
```

### 3.1 Le graphe planaire dual

- **Sommets (nodes)** = lignes d'équipotentielle de tension V → segments horizontaux du carré.
- **Arêtes (edges)** = dipôles / résistances de 1 Ω → les carrés eux-mêmes.
- Courant I de l'arête = côté du carré c. Tension V aux bornes = côté du carré c (car V = R·I, R = 1 Ω).

### 3.2 Relation bidirectionnelle pavage ↔ réseau

- Le graphe primal dicte l'ordonnancement vertical Y (niveaux de potentiel).
- Le graphe dual dicte l'ordonnancement horizontal X (accumulation des flux de courant).
- Chaque arête E_i et chaque carré K_i référencent directement leur pendant → requêtes bilatérales `worldToPavage()` / `pavageToNode()`.

## 4. Rendu découplé

La logique métier ignore le mode de rendu (Canvas, SVG, WebGL). Elle produit des primitives abstraites en world space.

```text
[ Graphe Planaire ]
       │
       ▼
[ Générateur de Primitives (World Space) ] ──> (Rectangles, Segments, Labels)
       │
       ▼
[ Matrice Viewport (Transform) ]           ──> (Pan & Zoom, worldToScreen)
```

## 5. DSL — langage de description

Le DSL est le point d'entrée pour décrire les graphes de départ, analysable facilement, agréable à écrire dans un `.ts` ou `.smith`.

Trois approches comparées (voir `DECISIONS.md` pour le choix retenu et pourquoi) :

**A. Netlist (type SPICE)** — focus topologie pure, proche de la théorie des circuits, mais peu lisible géométriquement.

```text
graph Duijvestijn21 {
  source TOP
  sink BOTTOM
  TOP -> N1 : 50
  TOP -> N2 : 35
  N1  -> N4 : 8
}
```

**B. Slicing tree** — très visuel pour l'imbrication de rectangles, mais limité aux pavages en guillotine (exclut certains carrés parfaits non séparables).

```text
layout Duijvestijn21(size: 112) {
  row {
    square(size: 50)
    col { square(size: 35) square(size: 27) }
  }
}
```

**C. Hybride déclaratif** — entités + disposition relative minimale, le moteur fait le reste.

```text
system Duijvestijn21 {
  bounds: 112 x 112
  blocks { k1: 50, k2: 35, k3: 27, k4: 8, k5: 19, k6: 15, k7: 17 }
  potentials {
    V_max = [k1, k2, k3]
    V_1   = [k4, k5]
    V_min = ...
  }
}
```

## 6. Séparation API / interface

L'API expose des classes (`Graph`, `KirchhoffSolver`, `SquareLayout`), avec une façade publique `Engine`. L'interface reçoit cet `Engine` et utilise une boucle `onFrame(Surface)` pour lui demander les données à passer au renderer. L'API ne connaît jamais l'existence d'un canvas.

## 7. Structure des dossiers

```text
src/
├── engine/                 # L'API publique et privée
│   ├── core/               # Les structures de données mutées
│   │   ├── Graph.ts
│   │   ├── Node.ts
│   │   └── Edge.ts
│   ├── solver/              # Le moteur mathématique
│   │   └── KirchhoffSolver.ts
│   ├── geometry/            # La transformation en formes
│   │   ├── WorldSpace.ts
│   │   └── SquareLayout.ts
│   ├── graph_generator/     # La création de topologies
│   │   ├── ClosedMesh.ts    # Toute surface topologiquement équivalente à une sphère
│   │   └── PlanarFlattener.ts
│   └── Engine.ts            # La Facade publique
│
├── dsl/                     # Le parseur de langage de description
│   ├── Lexer.ts
│   └── Parser.ts
│
└── interface/               # L'Interface (ce qui parle à l'écran)
    ├── Viewport.ts          # Gère la caméra (pan, zoom, worldToScreen)
    ├── SurfaceAdapter.ts    # Implémente la lib graphique (onFrame, etc.)
    └── CanvasRenderer.ts    # Trace les rectangles et les lignes
```

- `engine/core/Graph.ts` : stocke la topologie (points, lignes). Ne calcule rien.
- `engine/solver/KirchhoffSolver.ts` : prend un graphe, résout le système, écrit courants et tensions sur les arêtes.
- `engine/geometry/SquareLayout.ts` : prend le graphe enrichi, génère les coordonnées x, y, w, h dans un `WorldSpace`.
- `engine/graph_generator/ClosedMesh.ts` : crée un réseau sur une surface fermée.
- `engine/graph_generator/PlanarFlattener.ts` : prend ce maillage, choisit un point de coupe, produit un graphe planaire prêt pour le solveur.
- `engine/Engine.ts` : orchestre tout. Seule classe connue de l'interface.
- `interface/Viewport.ts` : transformation espace monde ↔ pixels.
- `interface/SurfaceAdapter.ts` : implémente `onSurface`/`onFrame`, interroge l'`Engine` pour les changements.
- `interface/CanvasRenderer.ts` : reçoit `WorldSpace` et `Viewport`, fait les appels de dessin.

Petit conseil pour demain : quand la nouvelle session voudra creuser le contrat, garde sous la main le source de `StateBuffer` et ton composant ReactionDiffusion pour les recoller — c'est ce qui évitera de re-spéculer.

Bonne pause, et à demain pour le `types.ts` 🙂

````markdown
# Handoff — Workshop de simulations GPU (nouvelle session)

## Comment on travaille

- Codage récréatif. Je code en TS, niveau débutant-à-intermédiaire : explique sans jargon non demandé.
- **C'est moi qui conduis** : tu proposes une étape, tu attends ma validation avant de continuer. Jamais de produit fini livré d'un bloc. On est d'abord en design/brainstorm, le code vient à la fin.
- On parle français.

## Le projet

Un petit "workshop" (pas un framework) au-dessus de ma lib maison `@repo/glaze` pour itérer des expériences de simulation par pixel : une seed par pixel, une règle d'évolution, un rendu. Objectif : me concentrer sur le côté créatif.

Une expérience = trois rôles :

- **seed** : l'état initial de chaque pixel
- **step** : la règle qui produit l'état suivant
- **shade** : comment on regarde/dessine l'état

Première expérience prévue : `01-smoke-field` (champ vectoriel + nuage de gaz, le gaz poussé par le vent). Envies futures : particules, flow fields, automates.

## Mon setup

- Monorepo pnpm + Turborepo, React 19, app Vite prête.
- `@repo/glaze` (même monorepo) : WebGL2, esprit p5 + r3f. `GpuCanvas` (React) exécute des custom programs = fragment shaders sur triangle fullscreen, avec uniforms standards (`u_resolution`, `u_aspect`, `u_mouse`, `u_camera`, `u_dpr`, `u_time`, `u_clockTime`). Le vertex fournit `vUv` en 0..1. Les custom programs acceptent des textures en uniforms (le shade peut donc lire l'état — confirmé).
- `StateBuffer` : paire de textures ping-pong. API : `addProgram(name, fragment)`, `useProgram`, `setUniforms`, `step()`. `step()` branche automatiquement `u_state` (texture de lecture). Actuellement en RGBA8. `init(Uint8Array)` ne remplit que le canal rouge. `CLAMP_TO_EDGE` (pas de wrap torique auto). `resize()` détruit l'état.
- J'ai un composant React d'exemple (ReactionDiffusion) qui est la spec vivante du futur runtime : cycle de vie du buffer lié au surface, injection souris, orchestration par frame. Je peux le recoller ainsi que le source de StateBuffer quand on attaque l'implémentation.

## Décisions déjà actées

1. **Route B** : ajouter le format float à glaze — RGBA32F + check `EXT_color_buffer_float` au boot, seed = programme shader (`addProgram('seed')`) plutôt que data CPU, filtrage NEAREST par défaut.
2. **Pas de controls ni de UI** : l'interface c'est le code. Pas de home.
3. Une couche = 4 canaux/pixel pour l'instant. Multi-buffers se lisant mutuellement : **parké** (`step()` ne branche qu'un `u_state` auto — limitation connue de glaze).
4. Structure de dossiers validée :

```
src/
├── main.tsx
├── App.tsx              ← une ligne : l'expérience courante importée et montée
├── kit/
│   ├── types.ts         ← le contrat : "qu'est-ce qu'une expérience ?"
│   ├── runtime.ts       ← l'ouvrier : buffers, seed, step, texture à montrer
│   └── Experiment.tsx   ← le composant React unique, généralisé
└── experiments/
    ├── _template/
    │   └── index.ts       ← à copier : seed + step + shade en un fichier
    └── 01-smoke-field/
        └── index.ts       ← le cobaye vent + gaz
```

## Où on s'est arrêté

Prochaine étape : **brainstormer le contrat d'une expérience** (`kit/types.ts`) — les trois rôles, ce qu'ils reçoivent, ce qu'ils rendent — plus le crochet par-frame pour que l'expérience pousse ses propres uniforms (injection souris, orchestration d'intro). Valider le contrat avec moi avant d'écrire quoi que ce soit.

## Pièges notés (à gérer au moment du runtime, pas à rediscuter)

- `u_resolution` = résolution du canvas ≠ taille de la grille d'état → prévoir un uniform `u_grid`.
- `u_mouse` est en espace écran/monde → traduire vers l'espace grille/uv côté kit.
- Préférer `u_time` (pausable) à `u_clockTime` pour des trajectoires reproductibles.
- Idées parkées : accumulator/trails dans le shade, hot-reload des règles, textures 3D.
````

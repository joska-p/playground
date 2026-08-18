Rapport d'audit — @repo/art-canvas

1. Inventaire rapide
   Répertoire Rôle Nature
   src/assembly/ Pipeline de génération de shaders (seed → RNG → modules → GLSL) Pure logic (impératif, closures)
   src/shaders/ Définitions de modules GLSL, templates, preamble, types Données + templates
   src/modules/ 5 modules auto-contenus : atlas, folded-space, manual, seed, spirale Façades React (store + component + controls)
   src/stores/ui/ État global (sélection du mode d'entrée) Store Zustand
   src/components/ ArtCanvas (routeur), ControlsPanel UI composition
   src/palettes/ Registre de palettes de couleurs Données
   5 modules : atlas, folded-space, manual, seed, spirale. Chacun suit le pattern : store Zustand + composant GpuCanvas + controls.
2. Couches logiques (Impératif)
   Excellente couche impérative dans assembly/ :

- createSeededRandom() (src/assembly/seeded-random.ts:45) — PRNG basé sur closures, état mutable caché (let seed), API minimale (next, pick, pickWeighted, range). Impeccable.
- generateShaderFromSeed() (src/assembly/from-seed.ts:11) — pipeline pur, aucune mutation, aucune side-effect.
- resolveDeps(), pickModules(), pickEffects(), processArgs(), applyMood() — toutes des fonctions pures.
  États portés :
- Stores Zustand créés au niveau module (hors React) — bon pattern hybride.
- spirale/store.ts:11 — instance Clock (classe) maintenue dans le store. Correct : lifecycle impératif isolé du rendering.
  Dépendances externes critiques : @repo/glaze (GpuCanvas, Clock), @repo/ui, zustand.

3. Façades React (Déclaratif)

- Hooks = sélecteurs Zustand purs : chaque store exporte des useX() uniques par champ. Pas de hooks custom composites, pas de useEffect, pas de mutations embarquées.
- Un seul useMemo dans tout le package (AtlasControls.tsx:64) — calcul du seedOffset hash.
- Un seul startTransition (AtlasControls.tsx:59) — wrapping du setComplexity pour la fluidité.
- Les composants modules sont de minces wrappers autour de GpuCanvas — pattern correct : React gère l'arbre déclaratif, @repo/glaze gère le lifecycle WebGL impératif.

4. Frictions Paradigmatiques & Sur-abstractions
   4a. Store Atlas sur-découpé (sur-abstraction React)
   atlas/store/ est scindé en 4 fichiers (store.ts, types.ts, selectors.ts, actions.ts) pour 6 champs. Les autres modules (seed, manual, spirale) tiennent tout dans un seul fichier. La séparation selectors/actions est un réflexe React (isoler les hooks des mutations) qui ajoute de l'indirection sans bénéfice clair ici.
   Alignement proposé : Aplatir atlas/store/ en un seul fichier, comme les autres modules.
   4b. Hash seed dupliqué entre Atlas et AtlasControls
   Le calcul seed → hash → seedOffset est duplicqué :

- Atlas.tsx:20-24 — inline dans le render (impératif, non mémoïsé)
- AtlasControls.tsx:64-70 — dans un useMemo
  Alignement proposé : Extraire le hash en utility dans assembly/ et l'appeler depuis les deux côtés.
  4c. generateShaderFromSeed appelé à chaque render sans mémoïsation
  SeedCanvas.tsx:11 :
  const fragmentShader = generateShaderFromSeed(seed, complexity, mood, palette);
  Cette fonction crée un SeededRandom, exécute tout le pipeline RNG, et produit une string GLSL — à chaque render. C'est le calcul le plus coûteux du package, sans aucun useMemo.
  Alignement proposé : Wrapping avec useMemo sur les 4 dépendances, ou déplacement dans un useEffect + state séparé.
  4d. Wrapper objet inutile dans manual.ts
  const manual = { fragmentShader };
  export { manual };
  Un objet contenant un seul champ string. Les autres modules exportent directement la string (foldedSpaceFragment) ou un const nommé (SYLLABIC_FIBONACCI_FRAGMENT). Ceci est un micro-façade ajouté par habitude.
  Alignement proposé : export { fragmentShader as manualFragment } — direct et cohérent.
  4e. Typo setInpuMode (ui/store.ts:18)
  Manque un 't'. Pas un problème paradigmatique, mais un défaut de qualité.
  4f. Absence de frictions dans la couche imperative
  L'assembly/ est propre : fonctions pures, closures pour l'état, aucune sur-abstraction. C'est la force de ce package.

5. Couplage et API Publique

- Exports (package.json) : ./art-canvas → App.tsx, ./styles → CSS. Le package est consommé comme un app-shell noir. Aucun module interne n'est exposé — correct pour un container de workshop.
- Consommation croisée des shader modules : assembly/registries.ts les importe (pour la génération procédurale) ET folded-space/foldedSpace.ts les importe directement (pour le shader inline). Pattern valide — ce sont des bibliothèques de code GLSL.
- Isolation des modules : aucun module n'importe un autre. Chacun est indépendant et lifting-proof.

6. Synthèse
   Forces :

- La couche assembly/ est exemplaire — pureté, closures, aucune sur-abstraction
- L'isolation des modules est bien maintenue
- Les stores sont créés hors React (niveau module) — bon pattern hybride
- Le registre de modules shaders est extensible et propre
  Risques :
- SeedCanvas régénère les shaders à chaque render (performance)
- Incohérence dans la mémoïsation (AtlasControls oui, SeedCanvas non)
- Store Atlas sur-organisé par rapport aux autres modules
  Quick Wins :

1. useMemo sur generateShaderFromSeed dans SeedCanvas.tsx
2. Aplatir atlas/store/ en un seul fichier
3. Supprimer le wrapper manual = { fragmentShader }, exporter directement
4. Corriger setInpuMode → setInputMode
5. Extraire le hash seed en utility dans assembly/
   Transformations profondes :
   Aucune nécessaire. L'architecture est saine. Le biais React est minimal dans ce package — la couche imperative est propre et les façades React sont de minces wrappers. C'est l'un des packages les mieux structurés du repo sur le plan paradigmique.

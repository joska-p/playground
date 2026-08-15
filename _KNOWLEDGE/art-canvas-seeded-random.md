# art-canvas — session nettoyage commentaires (custom linting)

## Bilan de la session (rules empiriques de commentaires)

- **Avant : 55 commentaires / Après : 26** sur 6 fichiers (`seeded-random.ts`, `classic.ts`, `SyllabicFibonacciMaterial.ts`, `AtlasControls.tsx`, `foldedSpace.ts`, `manual.ts`). Tous les commentaires restants sont des "pourquoi" vérifiés.
- Règles appliquées :
    - Commentaire = uniquement un _pourquoi_ (décision, contrainte, piège, intention, contrat d'entrée invisible).
    - Un nom de fonction/variable lisible → pas de commentaire.
    - Les magic numbers (palettes, matrices de color-space) méritent un label/ancre de standard — c'est le seul cas "quoi" toléré, car indérivable.
    - "xxx was removed" / historique pur → git log, pas le code.
    - Banners décoratifs (`// ---`) → supprimer ; si le texte porte une info (ancre de standard), le garder en commentaire simple.
    - Une étape numérotée (`// 1.`) = duplication du quoi → le détail vit dans _KNOWLEDGE, l'ancre reste dans le code.
    - Commentaire qui justifie un pattern obsolète = signal que le pattern l'est peut-être (useMemo).

## Pipeline OKLCH → sRGB (Björn Ottosson) — manual.ts

Référence complète, extraite du code (magic numbers indérivables) :

1. **OKLCH → OKLab** (polar → cartésien) : `a = C·cos(h)`, `b = C·sin(h)`. `h` en **radians [0, 2π]** (contrat d'entrée).
2. **OKLab → LMS** (cone space) : matrices 0.3963377774 / 0.2158037573 / 0.0638541728 (L), -0.1055613458 / -0.0638541728 / -1.2914855480 (M), -0.0894841775 / 1.2914855480 / -0.2914855480 (S) — valeurs exactes dans le code.
3. **Cube root** : OKLab est non-linéaire (`l³`, `m³`, `s³`).
4. **LMS → linear sRGB** : 4.0767416621 / -3.3077115913 / 0.2309699292 (r), -1.2684380046 / 2.6097574011 / -0.3413193965 (g), -0.0041960863 / -0.7034186147 / 1.7076147010 (b).
5. **Gamma sRGB** : `x ≤ 0.0031308 → x·12.92`, sinon `1.055·x^(1/2.4) − 0.055`. Branchless via `mix(highPart, lowPart, lessThanEqual(...))` — commentaire "cheaper than branching on the GPU" = pourquoi légitime.

Leçon : les étapes numérotées (`// 1.`, `// 2.`…) dans le code décrivent le _quoi_ ; le détail vaut mieux dans _KNOWLEDGE. Le contrat d'entrée (radians) et l'ancrage au standard restent dans le code.

## Pattern shader "neon glow" (foldedSpace.ts)

- `wave = abs(sin(...)); wave = 0.02 / wave;` — l'inverse d'une vague crée des pics fins et brillants (effet néon / glow).
- Le commentaire original "Compute neon waves" décrivait le _quoi_ ; le vrai "pourquoi" = le truc de l'inverse. Aujourd'hui le commentaire porte le truc, pas le résultat.

## Pattern récurrent : en-tête shader QuadPipeline

- En-tête quasi identique dans 3 fichiers : `SyllabicFibonacciMaterial.ts`, `foldedSpace.ts`, `manual.ts`.
- Contrat partagé : **QuadPipeline fournit le fullscreen triangle (vertex shader)** ; les modules ne fournissent que le fragment.
- Leçon : ce genre de contrat partagé répété verbatim = candidat à une constante/facto (le contrat est la seule raison d'exister de l'en-tête).

## Smell useMemo sous React 19 compiler (AtlasControls.tsx)

- AGENTS.md : React 19 avec compiler → plus besoin de `useMemo`/`useCallback`.
- Ce `useMemo` (hash de seed → offset affiché dans les cards d'infos) est un **candidat smell** : le calcul est trivial, le commentaire `// Memoize offset...` justifiait un memo inutile. Fix futur : supprimer `useMemo`, calculer directement.
- Leçon commentaire : un commentaire qui justifie un pattern obsolète = signal que le pattern est peut-être obsolète.
- Hash de string djb2 (`charCodeAt + ((hash << 5) - hash)`) utilisé ici pour seed→offset ; FNV-1a dans seeded-random. Deux variantes de hash maison, même usage (seed → identifiant/offset). Éventuelle unification à réfléchir.

## Domain UCAS / Atlas (SyllabicFibonacciMaterial.ts)

- **UCAS = rotationnel** : Unified Canadian Aboriginal Syllabics — une forme unique (ᐱ ᐯ ᐸ ᐳ) tournée encode la voyelle. Tout le module Atlas repose sur ce principe : `angle = signal * (2π / uModulo)`.
- SDF ↔ glyphes : `sdTriangle` = arrow syllabics, `sdRoundBox` = container syllabics, `sdArc` = crescent. Ce lien est indérivable du code → commentaire d'intention justifié.
- Piège GLSL : `pow(x, n)` avec `x < 0` → NaN sur plusieurs GPUs → Fibonacci via Binet (`floor(phi^n / √5 + 0.5)`).
- Piège GLSL : précision float32 limitée → `mod(fibIndex, 24.0)` pour éviter les "cracks".
- Pattern : labels de thème sur paires de magic numbers (`// Cyberpunk Neon` etc.) = quasi-obligatoires, sinon les vec3 sont du bruit. (Même famille que les matrices de color-space.)
- Leçon commentaire : "Three.js ShaderMaterial class removed" = historique pur (git log, pas le code) → à retirer.

## Composition shader (classic.ts)

- Les templates injectent `${spaceBlock}`, `${shapeBlock}`, `${effectBlock}` par interpolation de string dans un template literal GLSL.
- Contrat fragile : le bloc injecté doit déclarer des variables précises (`float dist`) — la seule doc de ce contrat est le commentaire trailing `${shapeBlock} // declares float dist`. C'est un "pourquoi" légitime (invisible dans le code).
- Les "banners" (`// --- XXX ---`) et labels génériques (`// Palette vectors`) = bruit, les noms de variables suffisent.

## seeded-random.ts

Matière brute, pas encore triée.

## Pattern `assertDefined` (au lieu de `!`)

- Helper local non-exporté : `assertDefined<T>(value: T | undefined, message?)`.
- Même narrowing que `!` mais échoue loud au runtime (`throw new Error`) au lieu de laisser `undefined` circuler.
- Utilisé dans `pick` et `pickWeighted` là où on a _prouvé_ que l'index est valide — c'est donc un invariant vérifié à chaud, pas juste un garde.
- Lesson : chaque usage d'`assertDefined` devrait être accompagné du commentaire "pourquoi c'est safe" (cf. pick : index borné par `[0,1)`).

## Piège float : `pickWeighted`

- Algo : `target = next() * totalWeight`, puis on soustrait `weight` de chaque item, on prend celui qui fait passer `target <= 0`.
- Piège : l'accumulation de soustractions peut laisser `target` juste au-dessus de 0 à cause de l'arrondi float → le loop se termine sans pick.
- Fix : fallback sur le dernier élément (plus le check non-vide en amont). Sans le fallback, bug rare/inexplicable.
- Piège similaire potentiel : `Math.floor(next() * n)` ne peut PAS donner `n` car `next() < 1` — c'est ce qui rend l'index de `pick` sûr.

## PRNG maison (déterministe, pas crypto)

- Seed string → `hashSeed` : FNV-1a (offset 2166136261, prime 16777619, `Math.imul`).
- `Math.abs(hash) || 1` → force seed non-nul (le `|| 1` garde contre un hash = 0).
- Stream : Mulberry32 (constante 0x6d2b79f5, opérations `Math.imul`/`>>>`). Déterministe, rapide, distribution suffisante pour du génératif — **PAS crypto-safe**.
- `Math.imul` + `| 0`/`>>>` = arithmétique 32 bits en JS, nécessaire pour que ça rejoue à l'identique.

## `rollHistory` capé

- Log des draws bruts de `next()`, cap à 1024 entrées (bound mémoire, pour le debug/replay).
- Exposé en lecture seule via getter sur l'objet retourné.

## Leçon TypeDoc (`typedoc.base.json`)

- `excludePrivate`/`excludeInternal` → les helpers **non-exportés** (`assertDefined`, `hashSeed`, `mulberry32Step`) ne sortent PAS dans la doc générée.
- → Ne pas investir de TSDoc sur du non-exporté ; seul ce qui est exporté mérite une attention.
- Le seul TSDoc "publié" du fichier : le type `SeededRandom` (membres de l'API).

## Remarques API du type SeededRandom

- `range(min, max, precision=3)` retourne une **string** (`toFixed`) — surprenant au premier abord, intention = format prêt à l'emploi.
- `initialHash` = hash de la seed d'entrée (utile pour identifier/rejouer une seed).

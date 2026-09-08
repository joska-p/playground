# Planification : migration vers TypeScript 7 + choix des outils

> Document de travail — pas de la SSOT. État au 08/09/2026 : repo propre, sur TS 6 (`catalog: typescript ~6.0.3`), lint/format/check-types verts.

## 1. Le problème en une phrase

TS 7.0 = le compilateur natif Go (tsgo). `typescript@7.0.x` n'expose plus l'API JS du compilateur, or c'est exactement l'API qu'utilisent typescript-eslint (et typedoc, ts-jest, les plugins Astro/Vite, etc.).

Donc : **migrer vers TS 7 impose de choisir ce qui remplace / accompagne typescript-eslint**, qui exige TS 6 (`peer > 4.8.4 < 6.1.0`).

## 2. Faits établis (vérifiés)

| Sujet | Constat |
|---|---|
| `typescript@7.0.x` (JS entrypoint) | n'expose que `version` / `versionMajorMinor` — crash `ts.Extension.Cjs is undefined` dans ts-estree |
| typescript-eslint 8.70 | peer `>=4.8.4 <6.1.0` ; issue #12518 close **not_planned** pour TS 7.0 |
| TS 7.1 | rétablit l'API programme stable (target automne 2026, microsoft/TypeScript#63703) ; typescript-eslint se positionnera ensuite |
| Recommandation officielle | Microsoft + typescript-eslint : **caster TS 6 et TS 7 côte à côte** en attendant |
| oxlint 1.0 stable | ~870 règles natives (eslint core, typescript, import, jsdoc, react/hooks, jsx-a11y, vitest, unicorn) ; React Compiler natif |
| oxlint `.astro` | natif (lint du `<script>`) → remplace `eslint-plugin-astro` + `astro-eslint-parser` |
| oxlint type-aware | `oxlint --type-aware --type-check` ; support TS7 sur la roadmap Q3-2026 (oxc#23976) |
| oxlint JS plugins | alpha (compat ESLint imparfaite) ; **`no-restricted-syntax` pas implémenté** |
| oxfmt beta | 100% conformité Prettier JS/TS ; natifs : JS/TS, JSON, CSS, YAML, TOML, GraphQL ; Prettier bundlé : HTML, Markdown, MDX, Vue, Svelte |
| oxfmt gaps (chez nous) | **pas de `.astro`** (57 fichiers dans apps/playground) **ni de GLSL** (~20 fichiers de shaders) |
| oxfmt built-ins | `sortImports` (off par défaut), `sortTailwindcss`, `sortPackageJson`, `jsdoc` (off par défaut) ; `printWidth` défaut = 100 (= notre config) |

## 3. Les trois directions possibles

### A. Côte à côte TS6/TS7 (la RI officielle)
- Catalog passe `typescript ~7.0.2` → `tsc`/build sur TS7.
- `@repo/config-eslint` épinglé en interne sur un `typescript ~6.0.3` dédié (hors catalog) pour satisfaire le peer de typescript-eslint.
- **Garde tout** : config eslint actuelle, rules type-aware, import/order, jsdoc, react-hooks. Zéro redesign.
- Coût : une dépendance TS6 fantôme, lenteur ESLint inchangée, migration différée au support TS7 de ts-eslint.

### B. Basculer lint + format sur oxc (oxlint + oxfmt)
- Config **par défaut** d'abord, on affinera au fil des besoins (pas de portage des règles custom).
- **Pour** : vitesse, écosystème full-Rust, `.astro` natif côté lint, no-brainer à terme si on veut du full TS7.
- **Contre** : `no-restricted-syntax` absent (nos « puits sémantiques » useMemo/useCallback + anti-patterns `TSPropertySignature`) ; parité type-aware incomplète ; `.astro` et GLSL non formatés par oxfmt → décision à prendre (hybride Prettier minimal ?).

### C. Hybride
- oxlint pour le lint ; Prettier **réduit** aux `.astro` + GLSL (oxfmt ailleurs).
- Pragmatique mais deux formatters à assumer.

## 4. Repo en chiffres (utile pour arbitrer)

- `apps/playground` : 57 fichiers `.astro` — besoins format + lint (script ts + directives astro).
- Shaders GLSL : ~20 fichiers, template literals `compileToGLSL` / `glsl-color-spaces` / `glsl-library`.
- Config lint actuelle : `@repo/config-eslint` (strictTypeChecked + stylisticTypeChecked, import-x, react-hooks, react-refresh, jsdoc) + `eslint-plugin-astro` dans apps/playground.
- Scripts racine : `lint`/`lint-fix` (turbo), `format` (prettier), `check-types` (tsc).
- `.prettierrc` : `printWidth 100`, `tabWidth 4`, `semi`, `singleQuote`, `trailingComma none`, importOrder `@ianvs` → à porter vers `sortImports.groups`.

## 5. Questions ouvertes avant d'acter

1. Le **format des `.astro`** et du **GLSL** pèse-t-il plus lourd que la simplicité du full-oxc ? (→ option B vs C)
2. `no-restricted-syntax` : on s'en passe, ou on le réimplémente en JS plugin oxlint dès le départ ?
3. On veut la **vitesse** maintenant (oxc) ou la **stabilité** (côte à côte) ?
4. Horizons : est-ce qu'on attend juste TS 7.1 (API programme) pour que ts-eslint suive et garder notre config actuelle vue par vue ?

## 6. Plan de migration (squelette, à compléter selon le choix)

### Si A — côte à côte
1. `pnpm-workspace.yaml` : `typescript: ~7.0.2`.
2. `packages/config-eslint/package.json` : pin `"typescript": "~6.0.3"` (hors catalog) + re-`typescript-eslint` si besoin.
3. `pnpm install`, vérif `lint` + `check-types` + `build` sur le catalog TS7.

### Si B — full oxc
1. `pnpm add -D oxlint oxfmt` + retrait eslint/typescript-eslint/plugins/prettier (et `@repo/config-eslint`).
2. `.oxlintrc` par défaut + `.oxfmtrc.json` généré par `oxfmt --migrate prettier`.
3. Scripts turbo `lint`/`lint-fix`/`format` pointés sur oxlint/oxfmt.
4. Test de parité sur un package représentatif (randomart-engine-next ou apps/playground) avant bascule globale.

### Dans les deux cas
- Bench avant/après (temps lint + format).
- Rails de sortie : si un point bloque, on garde la branche comme POC.

## 7. Signaux pour re-prioriser

- ts-eslint annonce le support TS 7 → ré-évaluer l'option A seule.
- oxfmt annonce `.astro` ou GLSL natif → lever le blocker de l'option B.
- oxc type-aware « TS7 » sort de la roadmap (Q3-2026).
- TS 7.1 stable (automne 2026).
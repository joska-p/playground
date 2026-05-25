# Illustrations — L'Émergence de la Complexité

Composants Astro statiques (SVG inline) pour l'article MDX.  
Compatibles Tailwind CSS + Tailwind Typography. Aucun JS externe. Aucun asset externe.

---

## Fichiers livrés

| Fichier                      | Rôle                            |
| ---------------------------- | ------------------------------- |
| `HeroIllustration.astro`     | En-tête de l'article            |
| `Step1Illustration.astro`    | Étape 01 — ℕ (nombres naturels) |
| `Step2Illustration.astro`    | Étape 02 — ℤ (entiers relatifs) |
| `Step3Illustration.astro`    | Étape 03 — ℚ (rationnels)       |
| `Step4Illustration.astro`    | Étape 04 — log (logarithmes)    |
| `Step5Illustration.astro`    | Étape 05 — i (imaginaire)       |
| `Step6Illustration.astro`    | Étape 06 — ℂ (plan complexe)    |
| `EpilogueIllustration.astro` | Épilogue — Formule d'Euler      |
| `Divider.astro`              | Séparateur de sections          |

---

## Usage MDX

Placez tous les `.astro` dans le **même dossier** que votre `index.mdx`, puis importez-les en tête de fichier :

```mdx
---
title: "L'Émergence de la Complexité"
---

import HeroIllustration from "./HeroIllustration.astro";
import Step1Illustration from "./Step1Illustration.astro";
import Step2Illustration from "./Step2Illustration.astro";
import Step3Illustration from "./Step3Illustration.astro";
import Step4Illustration from "./Step4Illustration.astro";
import Step5Illustration from "./Step5Illustration.astro";
import Step6Illustration from "./Step6Illustration.astro";
import EpilogueIllustration from "./EpilogueIllustration.astro";
import Divider from "./Divider.astro";

<HeroIllustration class="my-8" />

## Étape 01 — ℕ

<Step1Illustration class="mx-auto my-6" />

<Divider class="my-6" step="02" />

## Étape 02 — ℤ

<Step2Illustration class="mx-auto my-6" />

<Divider class="my-6" step="03" />

## Étape 03 — ℚ

<Step3Illustration class="mx-auto my-6" />

<Divider class="my-6" step="04" />

## Étape 04 — log

<Step4Illustration class="mx-auto my-6" />

<Divider class="my-6" step="05" />

## Étape 05 — i

<Step5Illustration class="mx-auto my-6" />

<Divider class="my-6" step="06" />

## Étape 06 — ℂ

<Step6Illustration class="mx-auto my-6" />

<Divider class="my-6" />

<EpilogueIllustration class="mx-auto my-8" />
```

---

## API des composants

Tous les composants acceptent les mêmes props :

| Prop        | Type     | Défaut               | Description                                           |
| ----------- | -------- | -------------------- | ----------------------------------------------------- |
| `class`     | `string` | `""`                 | Classes Tailwind additionnelles (marges, alignement…) |
| `ariaLabel` | `string` | _(texte par défaut)_ | Label d'accessibilité ARIA                            |
| `title`     | `string` | _(texte par défaut)_ | Titre SVG (tooltip et lecteurs d'écran)               |

**`Divider.astro` uniquement** :

| Prop    | Type               | Défaut | Description                            |
| ------- | ------------------ | ------ | -------------------------------------- |
| `step`  | `string \| number` | —      | Affiche « Étape N » dans le séparateur |
| `label` | `string`           | —      | Texte personnalisé (remplace `step`)   |

---

## Personnalisation

### 1. Couleurs via variables CSS du thème

Tous les SVG utilisent **les variables CSS de `gruvbox-theme.css`** :

```
--background, --foreground, --card, --muted, --muted-foreground
--border, --primary, --secondary, --accent
```

Pour changer la palette globale, modifiez ces variables dans votre fichier CSS.

**Exemple — remplacer la couleur accent (rose) par du violet :**

```css
:root {
  --accent: oklch(0.55 0.15 290);
}
```

### 2. Ajuster taille et alignement via `class`

```mdx
{/* Centré avec marges verticales généreuses */}

<Step1Illustration class="mx-auto my-10" />

{/* Restreindre la largeur max */}

<Step1Illustration class="mx-auto my-6 max-w-lg" />

{/* Aligné à gauche, marge réduite */}

<Step1Illustration class="my-4" />
```

Les SVGs utilisent `viewBox` responsive et `width: 100%` — ils s'adaptent automatiquement à la largeur de la colonne d'article.

### 3. Dark mode

Les illustrations utilisent les variables CSS du thème. Si votre thème gère le dark mode via `html[data-theme="dark"]` (comme `gruvbox-theme.css`), **le dark mode est automatique** — aucune modification nécessaire.

Pour forcer le dark mode sur une illustration seulement :

```astro
<div style="color-scheme: dark; background: var(--background);">
  <Step1Illustration />
</div>
```

### 4. Modifier le texte par défaut

Chaque composant accepte une prop `title` :

```mdx
<Step1Illustration title="01 — Naturels" ariaLabel="Illustration des nombres naturels" />
```

### 5. Exporter en PNG / SVG

**Option A — navigateur :**
Ouvrez l'article, faites un clic droit sur l'illustration > « Enregistrer l'image sous » (Firefox/Chrome).

**Option B — Node.js avec `sharp` :**

```js
import sharp from "sharp";
import fs from "fs";

// Extrayez le SVG du DOM ou depuis le HTML généré par Astro
const svgString = fs.readFileSync("./exported.svg", "utf-8");
await sharp(Buffer.from(svgString))
  .resize(1440) // double résolution
  .png()
  .toFile("./output.png");
```

**Option C — depuis Astro build :**
Utilisez `astro build` puis manipulez le HTML généré avec `cheerio` pour extraire les SVG inline.

---

## Accessibilité

- Chaque `<svg>` a `role="img"` et un `<title>` interne.
- Le `<figure>` parent a `aria-label` configurable via prop.
- Les dividers ont `role="separator"`.
- Contraste : les textes utilisent `var(--foreground)` ou `var(--muted-foreground)` — conformes AA avec le thème Gruvbox (testez avec votre palette finale si vous la modifiez).

---

## Compatibilité Tailwind Typography

Les composants sont enveloppés dans `<figure class="not-prose ...">` pour **désactiver les styles Tailwind Typography** (`prose`) sur le SVG.  
Cela évite les conflits de marges, couleurs de texte et styles `prose img/figure`.

Si vous n'utilisez pas le plugin Typography, vous pouvez retirer `not-prose` sans impact.

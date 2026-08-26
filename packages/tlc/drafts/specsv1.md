# Playground UI — Spec & Guide de démarrage

> Design system interne pour Playground (Cahier d'exercices).
> Objectif : ne plus jamais réfléchir au layout "canvas + panneaux de contrôle" ni réinventer un slider.
> Stack : React 19, Tailwind v4, clsx, tailwind-merge, cva. Zéro dépendance runtime UI (pas de Radix).

---

## 0. Philosophie

1. **Deux problèmes, deux couches.** Ne mélange pas "layout de l'app" et "contrôles d'input" dans le même package mental. Ce sont deux systèmes qui se composent :
   - `layout/` → comment l'écran se découpe (canvas plein écran + panneaux).
   - `controls/` → les widgets qu'on pose dans les panneaux (slider, toggle, color, etc.).
2. **Composition, pas configuration.** Pas de `<Panel controls={[...]} />` piloté par config JSON. Des composants composables (`<Panel><Panel.Section>...</Panel.Section></Panel>`), comme shadcn — sauf que ce sera *tes* primitives, pas des copier-coller de Radix.
3. **Headless-friendly mais pas headless pur.** Tu n'as pas besoin du niveau d'abstraction Radix (a11y multi-device custom-heavy). Vise "80% de la robustesse pour 20% du code" : primitives natives HTML (`<input type="range">`, `<button>`, `<select>`) stylées et enrichies, plutôt que réimplémenter un listbox ARIA complet.
4. **Non générique.** C'est un outil de labo créatif — l'identité visuelle doit le dire. Évite le look "shadcn zinc" par défaut (gris neutre, radius 0.5rem, ombres douces). Choisis une identité qui a un point de vue (voir §2).
5. **Un seul package, deux exports.** `@playground/ui/layout` et `@playground/ui/controls` (ou un seul barrel si le monorepo est petit) — jamais un composant qui fait les deux.

---

## 1. Architecture du package

```
packages/ui/
├── src/
│   ├── lib/
│   │   ├── cn.ts                # clsx + twMerge
│   │   └── use-controllable-state.ts
│   ├── primitives/
│   │   └── slot.tsx             # ton "asChild" maison (voir §5)
│   ├── layout/
│   │   ├── shell.tsx            # <Shell> : grid canvas + panel(s)
│   │   ├── canvas-stage.tsx      # wrapper w-full h-screen pour le canvas
│   │   ├── panel.tsx             # <Panel>, <Panel.Header>, <Panel.Section>
│   │   └── panel-group.tsx       # gestion multi-panneaux (dock, tabs, resize)
│   ├── controls/
│   │   ├── slider.tsx
│   │   ├── number-field.tsx
│   │   ├── toggle.tsx
│   │   ├── select.tsx
│   │   ├── color-field.tsx
│   │   ├── vector-field.tsx      # x/y/z groupés, pattern courant en creative coding
│   │   ├── button.tsx
│   │   ├── field.tsx             # <Field label="..." hint="..."> wrapper commun
│   │   └── group.tsx             # <ControlGroup> pour ranger visuellement
│   ├── tokens/
│   │   ├── colors.css
│   │   └── index.ts
│   └── index.ts
├── tailwind.css                  # @theme avec tes tokens custom
└── package.json
```

Point important : **`layout` ne connaît rien de `controls`**, et `controls` ne connaît rien de `layout`. Le seul point de couture c'est que `Panel.Section` accepte n'importe quel enfant.

---

## 2. Tokens de design — Gruvbox, compatible convention shadcn

### 2.1 Comment shadcn gère réellement ses tokens (pour ne pas réinventer)

Vérifié sur la doc actuelle (shadcn + Tailwind v4), le système shadcn tient en 3 règles simples — une fois que tu les connais, tu peux lire ou fabriquer n'importe quel thème shadcn :

1. **Convention `nom` / `nom-foreground`.** Chaque couleur "de fond" a sa paire "de texte" : `--primary` / `--primary-foreground`, `--secondary` / `--secondary-foreground`, `--muted` / `--muted-foreground`, `--accent` / `--accent-foreground`, `--destructive` / `--destructive-foreground`, plus `--background`/`--foreground`, `--card`/`--card-foreground`, `--popover`/`--popover-foreground`, et les utilitaires `--border`, `--input`, `--ring`. Un composant qui fait `bg-primary` sait qu'il doit faire `text-primary-foreground` à côté — c'est tout le système.
2. **Variables brutes en `:root` / `.dark`, mappées vers Tailwind via `@theme inline`.** Le thème (couleurs) est séparé du mapping Tailwind (classes utilitaires) :
   ```css
   :root {
     --primary: oklch(0.55 0.15 30);
     --primary-foreground: oklch(0.98 0 0);
   }
   .dark {
     --primary: oklch(0.7 0.15 30);
     --primary-foreground: oklch(0.15 0 0);
   }
   @theme inline {
     --color-primary: var(--primary);
     --color-primary-foreground: var(--primary-foreground);
   }
   ```
   `@theme inline` est ce qui génère `bg-primary`, `text-primary-foreground`, etc. Sans cette ligne, la variable existe mais aucune classe Tailwind n'est générée.
3. **Format de couleur : OKLCH.** Depuis la v4, les thèmes shadcn utilisent `oklch(L C H)` plutôt que du HSL — perceptuellement plus régulier, et compatible avec les modificateurs d'opacité Tailwind (`bg-primary/50`).
4. **Un seul token de radius, décliné.** `--radius` en base, puis `--radius-sm/md/lg/xl` calculés en `calc()` à partir de lui. Change une valeur, tout le système suit.
5. **Dark mode = classe `.dark` sur `<html>`**, pas media query par défaut (mais rien n'empêche de bootstrap avec `prefers-color-scheme` en plus).

→ **Conséquence pour toi** : si tu respectes ces 5 règles (mêmes noms de variables, même structure `:root`/`.dark`/`@theme inline`, format oklch), ton thème Gruvbox est un thème shadcn valide. N'importe quel composant shadcn copié-collé plus tard fonctionnera avec tes couleurs sans modification.

### 2.2 Palette Gruvbox → tokens shadcn

Gruvbox est nativement en hex. Plutôt que convertir les valeurs à la main (source d'erreur), utilise la **relative color syntax** de CSS (supportée nativement par les navigateurs modernes) : tu déclares le hex Gruvbox officiel une fois, et le navigateur calcule l'équivalent oklch pour toi.

```css
/* tokens/gruvbox.css — constantes brutes, jamais utilisées directement dans les composants */
:root {
  /* Gruvbox dark */
  --gb-bg0-hard:  #1d2021;
  --gb-bg0:       #282828;
  --gb-bg1:       #3c3836;
  --gb-bg2:       #504945;
  --gb-bg3:       #665c54;
  --gb-fg0:       #fbf1c7;
  --gb-fg1:       #ebdbb2;
  --gb-fg4:       #a89984;
  --gb-red:       #fb4934;
  --gb-green:     #b8bb26;
  --gb-yellow:    #fabd2f;
  --gb-blue:      #83a598;
  --gb-purple:    #d3869b;
  --gb-aqua:      #8ec07c;
  --gb-orange:    #fe8019;
  --gb-gray:      #928374;

  /* Gruvbox light */
  --gb-bg0-hard-l: #f9f5d7;
  --gb-bg0-l:      #fbf1c7;
  --gb-fg1-l:      #3c3836;
  --gb-red-l:      #9d0006;
  --gb-green-l:    #79740e;
  --gb-yellow-l:   #b57614;
  --gb-blue-l:     #076678;
  --gb-orange-l:   #af3a03;
}
```

```css
/* tokens/theme.css — mapping shadcn, dark = thème par défaut (esprit "labo") */
:root {
  --background: oklch(from var(--gb-bg0) l c h);
  --foreground: oklch(from var(--gb-fg1) l c h);

  --card: oklch(from var(--gb-bg1) l c h);
  --card-foreground: oklch(from var(--gb-fg1) l c h);

  --popover: oklch(from var(--gb-bg1) l c h);
  --popover-foreground: oklch(from var(--gb-fg1) l c h);

  --primary: oklch(from var(--gb-orange) l c h);
  --primary-foreground: oklch(from var(--gb-bg0-hard) l c h);

  --secondary: oklch(from var(--gb-bg2) l c h);
  --secondary-foreground: oklch(from var(--gb-fg1) l c h);

  --muted: oklch(from var(--gb-bg1) l c h);
  --muted-foreground: oklch(from var(--gb-fg4) l c h);

  --accent: oklch(from var(--gb-aqua) l c h);
  --accent-foreground: oklch(from var(--gb-bg0-hard) l c h);

  --destructive: oklch(from var(--gb-red) l c h);
  --destructive-foreground: oklch(from var(--gb-fg0) l c h);

  --border: oklch(from var(--gb-bg2) l c h);
  --input: oklch(from var(--gb-bg2) l c h);
  --ring: oklch(from var(--gb-orange) l c h);

  --chart-1: oklch(from var(--gb-red) l c h);
  --chart-2: oklch(from var(--gb-green) l c h);
  --chart-3: oklch(from var(--gb-yellow) l c h);
  --chart-4: oklch(from var(--gb-blue) l c h);
  --chart-5: oklch(from var(--gb-purple) l c h);

  --radius: 0.25rem; /* Gruvbox = esthétique terminal, radius sobre. Change ici pour tout le système. */
}

/* Gruvbox est nativement conçu comme thème sombre ; ".light" plutôt que ".dark" comme variante */
.light {
  --background: oklch(from var(--gb-bg0-l) l c h);
  --foreground: oklch(from var(--gb-fg1-l) l c h);
  --card: oklch(from var(--gb-bg0-hard-l) l c h);
  --card-foreground: oklch(from var(--gb-fg1-l) l c h);
  --primary: oklch(from var(--gb-orange-l) l c h);
  --primary-foreground: oklch(from var(--gb-bg0-hard-l) l c h);
  --muted-foreground: oklch(from var(--gb-fg1-l) l c h / 0.6);
  --border: oklch(from var(--gb-bg0-l) l calc(c * 1.5) h);
  --ring: oklch(from var(--gb-orange-l) l c h);
  /* ... même schéma pour les autres tokens */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

Points d'attention :

- `oklch(from var(--gb-orange) l c h)` : c'est la **relative color syntax** (CSS Color Module 4) — le navigateur convertit le hex en oklch et t'en extrait L/C/H. Support natif Chrome/Edge/Safari/Firefox récents, donc niveau 2026 c'est safe sans fallback pour un projet perso. Si tu veux figer les valeurs (perf ou support plus large), passe une fois par [oklch.com](https://oklch.com) et colle les valeurs calculées en dur.
- **Tu n'as pas besoin d'un token `--canvas` séparé** comme dans la v1 du guide — `--background` de shadcn joue exactement ce rôle (fond de `Shell.Canvas` = `bg-background`). Ça te fait un thème unique au lieu de deux systèmes de couleurs parallèles.
- **Sémantique des couleurs Gruvbox pour tes controls** : `--destructive` = rouge (déjà la convention), `--primary`/`--ring`/accent actif = orange ou aqua (les deux couleurs "signal" de Gruvbox), le vert/jaune/bleu/violet restants vont dans `--chart-*` — pratique si tu affiches des courbes ou plusieurs séries de données dans tes mini-apps.
- **Radius sobre (`0.25rem`)** cohérent avec l'esprit "terminal/instrument" de Gruvbox — évite les radius doux type shadcn par défaut (`0.625rem`) qui contredisent l'ambiance.

Tous tes composants `controls/` et `layout/` consomment exclusivement `bg-background`, `text-foreground`, `bg-primary`, etc. — jamais de couleur Gruvbox brute (`--gb-*`) directement dans un composant, ces variables sont des constantes internes au thème.

---

## 3. Le système de layout (le vrai cœur de ta demande)

### Le besoin réel
- Un canvas `w-full h-screen` (souvent `<canvas>`, parfois WebGL/Three, parfois SVG).
- 0 à N panneaux de contrôle, plus ou moins denses, positionnés en overlay ou en dock.

### API proposée

```tsx
<Shell>
  <Shell.Canvas>
    <canvas ref={canvasRef} />
  </Shell.Canvas>

  <Shell.Panels position="right"> {/* left | right | float */}
    <Panel title="Paramètres">
      <Panel.Section label="Forme">
        <ControlGroup>
          <Slider label="Rayon" value={r} onChange={setR} min={0} max={100} />
          <ColorField label="Couleur" value={color} onChange={setColor} />
        </ControlGroup>
      </Panel.Section>
      <Panel.Section label="Physique" collapsible defaultOpen={false}>
        ...
      </Panel.Section>
    </Panel>
  </Shell.Panels>
</Shell>
```

### Mobile-first & progressive enhancement — comment ça se traduit concrètement

Deux principes distincts à ne pas confondre :

- **Mobile-first** = tu écris le CSS de base pour le plus petit écran, puis tu *ajoutes* des règles à partir de breakpoints (`md:`, `lg:`) pour les écrans plus grands. Jamais l'inverse (`max-width` en cascade descendante).
- **Progressive enhancement** = le layout de base doit être fonctionnel avec le minimum (CSS simple, pas de JS de mesure/drag), puis tu superposes des couches d'amélioration (resize au drag, position `float`, animations) qui s'activent seulement si l'environnement le permet. Si le JS d'enhancement plante ou n'est pas encore hydraté (React 19 + streaming SSR), l'utilisateur a quand même un layout utilisable.

Concrètement pour `Shell` :

```css
/* Base (mobile) — un seul flux vertical, aucune media query */
.shell {
  display: grid;
  grid-template-rows: 1fr auto; /* canvas en haut, panneau en bas comme un bottom sheet */
  height: 100dvh; /* dvh, pas vh — évite le saut de barre d'adresse mobile */
}

.shell-panels {
  max-height: 40dvh;
  overflow-y: auto;
  border-top: 1px solid var(--border);
}

/* Enhancement : à partir de md, on passe en dock latéral */
@media (min-width: 48rem) {
  .shell {
    grid-template-columns: 1fr auto;
    grid-template-rows: none;
  }
  .shell-panels {
    max-height: none;
    height: 100%;
    border-top: none;
    border-left: 1px solid var(--border);
  }
}
```

Traduit en Tailwind (mobile-first natif chez Tailwind, donc ça tombe bien) :

```tsx
<div className="grid h-dvh grid-rows-[1fr_auto] md:grid-cols-[1fr_auto] md:grid-rows-none">
  <Shell.Canvas className="min-h-0 min-w-0" />
  <Shell.Panels className="max-h-[40dvh] overflow-y-auto border-t md:max-h-none md:border-t-0 md:border-l" />
</div>
```

Points d'attention :

- **`min-w-0` / `min-h-0`** : le piège classique en grid — sans ça, le contenu interne (canvas ou panneau) pousse la grille hors de ses bornes. Nécessaire dans les deux dimensions puisque tu changes d'axe entre mobile (rows) et desktop (columns).
- **`100dvh` plutôt que `100vh`** : sur mobile, `vh` inclut la zone que la barre d'adresse masque/révèle → ton canvas "saute" au scroll. `dvh` (dynamic viewport height) résout ça, support natif large en 2026.
- **Panneau = bottom sheet par défaut, dock en amélioration** : sur mobile tu n'as pas besoin de JS pour ça — c'est juste une media query qui change `grid-template`. Le "drawer qui slide" avec drag-to-dismiss, lui, est une vraie amélioration progressive : ajoute-le seulement si tu sens le besoin, avec `@media (hover: hover) and (pointer: fine)` pour ne l'activer que sur les devices qui ont un vrai pointeur/hover (pas de resize-by-drag sur tactile, où le geste est ambigu avec le scroll).
- **`position="float"`** devient alors une 3e amélioration, réservée au desktop large : `hidden md:block` sur des viewports encore plus grands, jamais le mode par défaut sur petit écran où l'espace est trop contraint pour un panneau flottant par-dessus le canvas.
- **Densité variable en `@container`, pas en media query.** Le panneau doit s'adapter à *sa propre* largeur (dock étroit vs drawer pleine largeur mobile), pas à celle de l'écran :
  ```css
  .panel { container-type: inline-size; }
  @container (max-width: 16rem) {
    .field { grid-template-columns: 1fr; } /* label au-dessus de l'input plutôt qu'à côté, si le panneau est étroit */
  }
  ```
  C'est ce qui te permet de réutiliser le même `Field`/`Panel` en dock latéral fin *et* en bottom-sheet pleine largeur sans dupliquer de composant.
- **Scroll** : le panneau a un `overflow-y-auto` interne, jamais le `Shell` entier — sinon ton canvas scroll avec la page sur mobile.
- **`Panel.Section collapsible`** reste la première ligne de défense contre la densité, avant même le responsive : `useState` + `grid-template-rows: 0fr / 1fr` en transition CSS grid (pas de lib d'animation), fonctionne à l'identique mobile/desktop.

---

## 4. Le système de controls

### Pattern commun à tous les inputs

Chaque control suit la même forme :

```tsx
<Field label="Vitesse" hint="px/frame">
  <Slider value={speed} onChange={setSpeed} min={0} max={10} step={0.1} />
</Field>
```

`Field` gère label + hint + layout (grid 2 colonnes label/valeur, comme un vrai panneau d'instrument). Chaque control individuel (`Slider`, `Toggle`...) ne gère que sa propre interaction, jamais son label — séparation stricte.

### Cahier des charges par control (v1 minimale)

| Control | Base HTML | Points d'attention |
|---|---|---|
| `Slider` | `input[type=range]` | Afficher la valeur en `font-mono` à côté ; support `step`, drag fin avec `shift` optionnel |
| `NumberField` | `input[type=number]` custom | Drag vertical pour incrémenter (pattern Blender/Figma), très utilisé en creative coding |
| `Toggle` | `button[role=switch]` | État visuel clair via `data-state=on/off` + variants cva |
| `Select` | `<select>` natif d'abord | Ne réimplémente un listbox custom que si le natif devient limitant |
| `ColorField` | `input[type=color]` + swatch custom | Le natif suffit en v1, tu customises juste le déclencheur visuel |
| `VectorField` | composition de `NumberField` | x/y(/z) alignés horizontalement, un seul `Field` wrapper |
| `Button` | `button` | cva variants: `default / accent / ghost / destructive`, tailles `sm/md` |

**Ne construis pas plus que ça en v1.** Un `Combobox`, un `DatePicker`, un `Tabs` custom : tu les ajoutes le jour où un mini-projet en a réellement besoin. Le piège classique en construisant un design system perso, c'est de vouloir couvrir shadcn au complet avant d'avoir un seul projet qui tourne dessus.

### Pattern technique : `cva` + `cn()`

```ts
// lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```ts
// controls/toggle.tsx
const toggleVariants = cva(
  "inline-flex items-center rounded-md transition-colors",
  {
    variants: {
      size: { sm: "h-5 w-9", md: "h-6 w-11" },
    },
    defaultVariants: { size: "md" },
  }
);
```

### Le pattern exact de shadcn pour les variants (celui que tu réutilises tel quel)

shadcn ne fait rien d'exotique : chaque composant exporte un `xxxVariants = cva(base, { variants, defaultVariants })`, et le composant React ne fait que résoudre les props à travers `cva` puis merge un `className` custom par-dessus avec `cn()`. Deux axes de variants systématiques : `variant` (apparence sémantique) et `size` (dimension). Exemple directement transposable à ton `Button` :

```ts
// controls/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        ghost: "hover:bg-muted hover:text-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
```

C'est tout le "secret" de shadcn : `cva` résout les variants en classes, `cn()` (donc `twMerge`) permet à l'appelant d'override n'importe quelle classe sans conflit de spécificité. Comme tes classes ne référencent que les tokens sémantiques (`bg-primary`, `text-accent-foreground`...), **changer de thème = changer les valeurs `oklch` dans `:root`/`.light`, zéro ligne de composant à toucher.** C'est exactement pour ça que la compatibilité de tokens du §2 est plus importante que copier le code des composants shadcn eux-mêmes.

### Controlled / uncontrolled

Tous tes controls doivent marcher en mode contrôlé (`value` + `onChange`) ET non-contrôlé (`defaultValue`), comme les inputs natifs. Un seul hook partagé :

```ts
// lib/use-controllable-state.ts
function useControllableState<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const state = isControlled ? value : internal;
  const setState = (v: T) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };
  return [state, setState] as const;
}
```

---

## 5. Le "asChild" maison (composition à la shadcn, sans Radix)

Tu vas vouloir, à un moment, faire du style shadcn `<Button asChild><a href="...">...</a></Button>`. Pas besoin de Radix `Slot` — une version minimale :

```tsx
// primitives/slot.tsx
import { cloneElement, isValidElement, type ReactElement } from "react";

export function Slot({ children, ...props }: { children: ReactElement } & Record<string, unknown>) {
  if (isValidElement(children)) {
    return cloneElement(children, { ...props, ...children.props });
  }
  return null;
}
```

Usage :

```tsx
function Button({ asChild, className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants(), className)} {...props} />;
}
```

Suffisant pour 90% des besoins réels d'un design system perso — pas besoin de gérer les refs fusionnées type Radix tant que tu n'as pas un cas concret qui l'exige.

---

## 6. Accessibilité — le minimum non négociable

Tu n'as pas besoin du niveau Radix, mais ne saute pas ça, ça coûte peu :

- Focus visible partout (`focus-visible:ring-2 ring-[var(--color-accent)]`), jamais `outline-none` sans replacement.
- `role="switch"` + `aria-checked` sur `Toggle`.
- Labels toujours liés via `htmlFor`/`id` dans `Field`, jamais juste visuel.
- Navigation clavier sur les sliders : gratuite si tu pars d'`input[type=range]` natif — encore une raison de ne pas réinventer.

---

## 7. Ordre d'implémentation recommandé

Ne construis pas tout d'un coup. Ordre qui donne de la valeur le plus vite :

1. Thème Gruvbox (`:root`/`.light` + `@theme inline`, §2) + `cn()` — 30-45 min, base de tout et vérifiable visuellement tout de suite (une simple `<div className="bg-primary">` doit être orange).
2. `Shell` mobile-first : layout bottom-sheet en base, dock `md:` en enhancement (§3) — débloque déjà 90% de tes mini-apps, sur mobile et desktop du premier coup.
3. `Panel`, `Panel.Section` (avec collapsible) — le conteneur des contrôles, avec `container-type: inline-size` posé dès le départ.
4. `Field`, `Slider`, `Toggle`, `NumberField` — les 3 controls que tu utilises dans quasiment tout projet créatif, stylés uniquement via tokens sémantiques (`bg-primary`, jamais `bg-orange-500`).
5. Migre **un vrai mini-projet existant** sur ce système avant d'aller plus loin, teste-le sur mobile réel — ça révèle immédiatement les trous d'API que tu n'avais pas anticipés.
6. `Select`, `ColorField`, `VectorField`, `Button` variants (cva `variant`/`size`, §4).
7. Enhancements desktop-only : `position="float"`, `position="left"`, resize-by-drag (`hover: hover) and (pointer: fine)`).

---

## 8. Anti-patterns à éviter

- ❌ Un composant `<Controls schema={[...]} />` généré depuis un objet de config — ça a l'air pratique, ça devient vite un mini-langage impossible à étendre proprement. Compose du JSX.
- ❌ Copier l'esthétique shadcn par défaut (zinc/slate) sans y réfléchir — perd l'identité "labo créatif".
- ❌ Réimplémenter un `Select` custom avec listbox ARIA maison avant d'en avoir vraiment besoin — le natif stylé (`appearance-none` + wrapper) suffit longtemps.
- ❌ Mettre la logique de scroll/overflow sur `Shell` au lieu de `Panel` — casse le layout plein écran du canvas.
- ❌ Coupler `layout` et `controls` (ex: un `Panel` qui importe direct un `Slider` en interne) — perd la composabilité.
- ❌ Utiliser une couleur Gruvbox brute (`bg-[--gb-orange]`) directement dans un composant — passe toujours par le token sémantique (`bg-primary`), sinon changer de thème plus tard casse tout.
- ❌ Écrire le CSS desktop d'abord puis "corriger" en `max-width:` pour mobile — pars du flux simple (bottom-sheet, une colonne) et ajoute des règles à partir de `min-width:`, jamais l'inverse.
- ❌ Rendre le drag-to-resize ou le mode `float` obligatoires au premier rendu — ce sont des enhancements, le layout doit être 100% utilisable si le JS n'a pas encore hydraté ou si l'input est tactile.
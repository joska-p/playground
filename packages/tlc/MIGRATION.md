# Migration @repo/ui → @repo/tlc

## Contexte

`@repo/ui` est l'ancienne UI lib du playground. `@repo/tlc` est sa remplacement — design system créatif-lab专用, Shell-first, zero dépendances runtime, identité Gruvbox.

Le dossier `controls/` vient d'être restructuré en `components/forms/` et `components/display/`. `mosaic-maker` est déjà migré et sert de référence.

L'objectif : supprimer `@repo/ui` de tous les packages et migrer vers `@repo/tlc`.

---

## Étape 0 — Combler les lacunes dans tlc

Avant de migrer les consommateurs, tlc doit fournir les composants manquants.

### 0a. `FieldRow` (remplace `ControlRow`)

`ControlRow` est le composant le plus utilisé de `@repo/ui` (7 packages). C'est un layout label/valeur/enfant en colonne (portrait) ou ligne (landscape via media query).

**Fichier :** `src/components/forms/field-row.tsx`
**Export :** `src/components/forms/index.ts` + `package.json` `./components/forms`

```tsx
// API cible — même signature que ControlRow
export interface FieldRowProps {
    label: ReactNode;
    value?: ReactNode;
    hint?: string;
    className?: string;
    children: ReactNode;
}
```

Comportement :
- Portrait : colonne `flex flex-col gap-1.5`
- Landscape : `flex-row items-center gap-2` via `@media (orientation: landscape)`
- Label fixe `w-20` en landscape, `truncate`
- Value optionnelle à droite du label
- Zone children `min-w-0 flex-1`

> Note : `FieldRow` ≠ `Field`. `Field` est un layout label+hint+value avec `FieldContext` pour wirer l'id. `FieldRow` est un layout compact pour controls empilés.

### 0b. `Toggle` — vérifier parité API avec `Switch`

`Switch` (@repo/ui) a un prop `loading` que `Toggle` (tlc) n'a pas. Vérifier que :
- `Toggle` accepte `loading?: boolean` (affiche un spinner)
- `Toggle` accepte `label?: ReactNode` (rend un `<label>` wrapper, comme Switch)
- Le variant `toggleVariants` est cohérent

**Fichier :** `src/components/forms/toggle.tsx`

### 0c. `Label` standalone (optionnel)

Seul `radu-machine-learning` utilise `Label` standalone. Ne pas ajouter tant que pas de besoin critique. Utiliser `<label>` natif ou `Field` à la place.

### 0d. `Spinner` (optionnel)

Plus aucun package ne l'utilise actuellement. Ne pas ajouter.

### 0e. `Sidebar` — ne pas migrer

Les packages utilisant `Sidebar` (`pixel`, `palette-generator`, `graph-viz`) devront être restructurés pour utiliser `Shell > ShellPanels`. C'est un changement architectural, pas un drop-in replacement. À traiter cas par cas.

### 0f. `ControlConditional` — ne pas migrer

Utilisé uniquement par `art-canvas`. Remplacer par un `&&` classique dans le JSX du consommateur.

---

## Étape 1 — Packages triviaux (nettoyage dep)

Ces packages ont `@repo/tlc` ou `@repo/ui` dans `package.json` mais zéro import en source.

| Package | Action |
|---------|--------|
| `real-life` | Supprimer `@repo/ui` du `package.json` |
| `l-system` | Supprimer `@repo/ui` du `package.json` |
| `smith-tutte` | Supprimer `@repo/ui` du `package.json` |
| `oeis-signal` | Supprimer `@repo/ui` du `package.json` |
| `three-stage` | Supprimer `@repo/ui` du `package.json` |
| `workshop` | Vérifier si `@repo/ui` est en dep, supprimer si oui |

**Validation :** `pnpm install` + `pnpm --filter <pkg> check-types`

---

## Étape 2 — Packages LOW (2-5 fichiers)

### 2a. `fracture` (1 fichier)

Imports : `ControlPanel`, `ControlGrid`, `ControlRow`, `Select`, `Slider`

Migration :
- `ControlPanel` → `Panel` (from `@repo/tlc/layout`)
- `ControlSection` → `PanelSection` (from `@repo/tlc/layout`)
- `ControlGrid` → `ControlGrid` (from `@repo/tlc/components/forms`)
- `ControlRow` → `FieldRow` (from `@repo/tlc/components/forms`) — après ajout à l'étape 0a
- `Select` → `Select` (from `@repo/tlc/components/forms`)
- `Slider` → `Slider` (from `@repo/tlc/components/forms`)
- Layout Shell : ajouter `Shell` + `ShellCanvas` + `ShellPanels` si pas déjà présent

### 2b. `image-to-particles` (2 fichiers)

Imports : `ErrorBoundary`, `Button`, `Input`

Migration directe :
- `ErrorBoundary` → `@repo/tlc/components/display`
- `Button` → `@repo/tlc/components/forms`
- `Input` → `@repo/tlc/components/forms`

### 2c. `mandelbrot` (2 fichiers)

Imports : `ErrorBoundary`, `Button` + custom `SliderRow`

Migration :
- `ErrorBoundary` → `@repo/tlc/components/display`
- `Button` → `@repo/tlc/components/forms`
- Custom `SliderRow` → `FieldRow` (tlc) ou garder local

### 2d. `glaze` (docs only)

Imports : `Accordion`, `AccordionItem`, `Badge`, `Hero`, `SectionHeading`

Migration :
- `Accordion`/`AccordionItem` → `@repo/tlc/components/display`
- `Badge` → `@repo/tlc/components/display`
- `Hero`, `SectionHeading` → garder en local (composants docs, pas dans tlc)

**Validation :** `pnpm install && pnpm --filter <pkg> check-types && pnpm --filter <pkg> lint`

---

## Étape 3 — Packages MEDIUM (5-10 fichiers)

### 3a. `automa` (5 fichiers)

Imports : `ControlPanel`, `ControlGrid`, `ControlSection`, `ControlRow`, `Button`, `Slider`, `Select`, `ErrorBoundary`

Migration :
- `ControlPanel` → `Panel`
- `ControlSection` → `PanelSection`
- `ControlGrid` → `ControlGrid`
- `ControlRow` → `FieldRow`
- `Button`, `Slider`, `Select` → `forms`
- `ErrorBoundary` → `display`

### 3b. `palette-generator` (3 fichiers)

Imports : `Sidebar`, `Button`, `Slider`, `ErrorBoundary`

Migration :
- `Sidebar` → restructurer avec `Shell > ShellPanels`
- `Button`, `Slider` → `forms`
- `ErrorBoundary` → `display`

### 3c. `radu-machine-learning` (4 fichiers)

Imports : `ControlPanel`, `ControlGrid`, `Button`, `Input`, `Label`, `ColorSwatch`, `Card`, `ErrorBoundary`

Migration :
- `ControlPanel` → `Panel`
- `ControlGrid` → `ControlGrid`
- `Label` → `<label>` natif ou `Field`
- `ColorSwatch` → `ColorPalette` (tlc) — vérifier compatibilité API
- `Button`, `Input` → `forms`
- `Card` → `display`
- `ErrorBoundary` → `display`

### 3d. `graph-viz` (5 fichiers)

Imports : `Sidebar`, `Badge`, `Button`, `Switch`, `Icon`

Migration :
- `Sidebar` → restructurer avec `Shell`
- `Switch` → `Toggle`
- `Badge`, `Button` → `forms`/`display`
- `Icon` → garder lucide-react en local

**Validation :** `pnpm install && pnpm --filter <pkg> check-types && pnpm --filter <pkg> lint`

---

## Étape 4 — Packages HIGH (10+ fichiers)

### 4a. `pixel-manipulator` (12 fichiers, 19 imports)

Imports principaux : `ControlPanel`, `ControlGrid`, `ControlSection`, `ControlRow`, `ControlSubsection`, `Button`, `Slider`, `Select`, `Badge`, `Card`, `ErrorBoundary`

Migration :
- `ControlPanel` → `Panel`
- `ControlSection` → `PanelSection`
- `ControlGrid` → `ControlGrid`
- `ControlRow` → `FieldRow`
- `ControlSubsection` → `PanelSection` (variant ou nested)
- Tous les inputs → `forms`
- `Badge`, `Card`, `ErrorBoundary` → `display`
- Layout : Shell-first si pas déjà le cas

### 4b. `sequence-renderer` (7 fichiers, 12 imports)

Même pattern que pixel-manipulator. Attention aux deep imports `@repo/ui/button`.

### 4c. `art-canvas` (6 fichiers, 11 imports)

Imports uniques : `ControlConditional` → remplacer par `&&` JSX.
Reste : pattern classique ControlPanel → Panel.

### 4d. `randomart-next` (12 fichiers, 21 imports)

Pattern identique à randomart. Faire randomart d'abord comme référence.

### 4e. `randomart` (15 fichiers, 25 imports)

Le plus gros consommateur. A ses propres wrappers locaux (Badge.tsx wrappe le Badge de @repo/ui).

Migration :
- Supprimer les wrappers locaux qui dupliquent des composants tlc
- `Switch` → `Toggle`
- `ControlRow` → `FieldRow`
- `ControlPanel` → `Panel`
- Layout : restructurer vers Shell si nécessaire

**Validation :** `pnpm install && pnpm --filter <pkg> check-types && pnpm --filter <pkg> lint`

---

## Étape 5 — Nettoyage final

1. Supprimer `@repo/ui` de la dépendance racine si plus aucun consommateur
2. Supprimer le package `@repo/ui` du workspace (ou marquer comme deprecated)
3. Vérifier qu'aucun import `@repo/ui` ne subsiste : `rg "@repo/ui" --include='*.tsx' --include='*.ts'`
4. `pnpm install` pour nettoyer le lockfile
5. `pnpm -r check-types && pnpm -r lint` — validation globale

---

## Mapping des imports @repo/ui → @repo/tlc

| @repo/ui | @repo/tlc | Notes |
|----------|-----------|-------|
| `data-entry:Button` | `components/forms:Button` | |
| `data-entry:Input` | `components/forms:Input` | |
| `data-entry:Select` | `components/forms:Select` | |
| `data-entry:Slider` | `components/forms:Slider` | |
| `data-entry:Textarea` | `components/forms:Textarea` | |
| `data-entry:Checkbox` | `components/forms:Checkbox` | |
| `data-entry:Switch` | `components/forms:Toggle` | **Renamed** |
| `data-entry:Label` | `<label>` natif ou `Field` | Pas de standalone |
| `data-display:Badge` | `components/display:Badge` | |
| `data-display:Card` | `components/display:Card` | |
| `data-display:Accordion` | `components/display:Accordion` | |
| `feedback:ErrorBoundary` | `components/display:ErrorBoundary` | |
| `control-panel:ControlPanel` | `layout:Panel` | **Renamed** |
| `control-panel:ControlSection` | `layout:PanelSection` | **Renamed** |
| `control-panel:ControlGrid` | `components/forms:ControlGrid` | |
| `control-panel:ControlRow` | `components/forms:FieldRow` | **New** — étape 0a |
| `control-panel:ControlSubsection` | `layout:PanelSection` | Nested variant |
| `control-panel:ControlConditional` | `&&` JSX | Pas de replacement |
| `widgets:Sidebar` | `layout:Shell` | **Different API** — restructurer |
| `widgets:ColorPalette` | `components/forms:ColorPalette` | |
| `widgets:Spinner` | — | Plus utilisé |
| `icons:Icon` | lucide-react direct | |
| `lib:cn` | `lib/cn` | Inchangé |

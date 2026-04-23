# Gruvbox Design System

A warm, earthy retro theme for the playground. Built with CSS custom properties for native theming support.

---

## Philosophy

- **Warm & Earthy**: Inspired by Gruvbox color palette
- **CSS-Native**: Uses CSS custom properties, no runtime dependencies
- **Dual Theme**: Light + dark mode via `data-theme="dark"` attribute
- **Stateless-First**: Components are pure, theme handled externally

---

## Color Palette

### Light Mode

| Role | HSL | Usage |
| :--- | :--- | :--- |
| `background` | `hsl(43 58% 80%)` | Page background |
| `foreground` | `hsl(21 7% 29%)` | Primary text |
| `card` | `hsl(48 86% 88%)` | Card surfaces |
| `card-foreground` | `hsl(20 5% 22%)` | Card text |
| `popover` | `hsl(52 73% 90%)` | Dropdowns, menus |
| `popover-foreground` | `hsl(21 7% 29%)` | Popover text |
| `primary` | `hsl(189 88% 24%)` | Actions, links |
| `primary-foreground` | `hsl(43 58% 80%)` | Text on primary |
| `secondary` | `hsl(58 70% 34%)` | Secondary actions |
| `secondary-foreground` | `hsl(48 86% 88%)` | Text on secondary |
| `muted` | `hsl(43 58% 80%)` | Disabled, hints |
| `muted-foreground` | `hsl(26 9% 36%)` | Muted text |
| `accent` | `hsl(332 33% 53%)` | Highlights |
| `accent-foreground` | `hsl(20 3% 19%)` | Text on accent |
| `destructive` | `hsl(2 75% 45%)` | Errors, delete |
| `destructive-foreground` | `hsl(52 73% 90%)` | Text on destructive |
| `border` | `hsl(35 17% 58%)` | Borders |
| `input` | `hsl(52 73% 90%)` | Input backgrounds |
| `ring` | `hsl(38 100% 50%)` | Focus ring |

### Dark Mode

| Role | HSL | Usage |
| :--- | :--- | :--- |
| `background` | `hsl(195 6% 12%)` | Page background |
| `foreground` | `hsl(40 38% 73%)` | Primary text |
| `card` | `hsl(20 3% 19%)` | Card surfaces |
| `card-foreground` | `hsl(48 86% 88%)` | Card text |
| `popover` | `hsl(0 0% 15%)` | Dropdowns, menus |
| `popover-foreground` | `hsl(40 38% 73%)` | Popover text |
| `primary` | `hsl(157 15% 58%)` | Actions, links |
| `primary-foreground` | `hsl(195 6% 12%)` | Text on primary |
| `secondary` | `hsl(59 70% 34%)` | Secondary actions |
| `secondary-foreground` | `hsl(0 0% 15%)` | Text on secondary |
| `muted` | `hsl(20 5% 22%)` | Disabled, hints |
| `muted-foreground` | `hsl(38 24% 65%)` | Muted text |
| `accent` | `hsl(332 33% 53%)` | Highlights |
| `accent-foreground` | `hsl(20 3% 19%)` | Text on accent |
| `destructive` | `hsl(2 75% 45%)` | Errors, delete |
| `destructive-foreground` | `hsl(195 6% 12%)` | Text on destructive |
| `border` | `hsl(21 7% 29%)` | Borders |
| `input` | `hsl(20 5% 22%)` | Input backgrounds |
| `ring` | `hsl(41 95% 58%)` | Focus ring |

---

## Typography

### Font Families

| Family | Font | Usage |
| :--- | :--- | :--- |
| `sans` | `Source Code Pro, monospace` | Body text |
| `serif` | `Source Serif 4, serif` | Headings |
| `mono` | `JetBrains Mono, monospace` | Code, inputs |

### Type Scale

| Token | Size | Line Height | Usage |
| :--- | :--- | :--- | :--- |
| `xs` | `0.75rem` | `1rem` | Captions |
| `sm` | `0.875rem` | `1.25rem` | Small text |
| `base` | `1rem` | `1.5rem` | Body |
| `lg` | `1.125rem` | `1.75rem` | Large body |
| `xl` | `1.25rem` | `1.75rem` | Small headings |
| `2xl` | `1.5rem` | `2rem` | Headings |
| `3xl` | `1.875rem` | `2.25rem` | Page titles |
| `4xl` | `2.25rem` | `2.5rem` | Hero text |

---

## Spacing

| Token | Value |
| :--- | :--- |
| `xs` | `0.25rem` (4px) |
| `sm` | `0.5rem` (8px) |
| `md` | `1rem` (16px) |
| `lg` | `1.5rem` (24px) |
| `xl` | `2rem` (32px) |
| `2xl` | `3rem` (48px) |

---

## Border Radius

| Token | Value |
| :--- | :--- |
| `sm` | `0.125rem` (2px) |
| `md` | `0.25rem` (4px) |
| `lg` | `0.5rem` (8px) |
| `xl` | `0.75rem` (12px) |

---

## Shadows

| Token | Light Mode | Dark Mode |
| :--- | :--- | :--- |
| `2xs` | `0px 1px 2.5px 0px hsl(35 17% 20% / 0.03)` | `0px 1px 2px 0px hsl(0 0% 0% / 0.01)` |
| `xs` | `0px 1px 2.5px 0px hsl(35 17% 20% / 0.03)` | `0px 1px 2px 0px hsl(0 0% 0% / 0.01)` |
| `sm` | `0px 1px 2.5px 0px hsl(35 17% 20% / 0.06), 0px 1px 2px -1px hsl(35 17% 20% / 0.06)` | `0px 1px 2px 0px hsl(0 0% 0% / 0.01), 0px 1px 2px -1px hsl(0 0% 0% / 0.01)` |
| `md` | `0px 1px 2.5px 0px hsl(35 17% 20% / 0.06), 0px 2px 4px -1px hsl(35 17% 20% / 0.06)` | `0px 1px 2px 0px hsl(0 0% 0% / 0.01), 0px 2px 4px -1px hsl(0 0% 0% / 0.01)` |
| `lg` | `0px 1px 2.5px 0px hsl(35 17% 20% / 0.06), 0px 4px 6px -1px hsl(35 17% 20% / 0.06)` | `0px 1px 2px 0px hsl(0 0% 0% / 0.01), 0px 4px 6px -1px hsl(0 0% 0% / 0.01)` |
| `xl` | `0px 1px 2.5px 0px hsl(35 17% 20% / 0.06), 0px 8px 10px -1px hsl(35 17% 20% / 0.06)` | `0px 1px 2px 0px hsl(0 0% 0% / 0.01), 0px 8px 10px -1px hsl(0 0% 0% / 0.01)` |
| `2xl` | `0px 1px 2.5px 0px hsl(35 17% 20% / 0.15)` | `0px 1px 2px 0px hsl(0 0% 0% / 0.03)` |

---

## Motion

| Token | Value |
| :--- | :--- |
| `duration-fast` | `100ms` |
| `duration-default` | `150ms` |
| `duration-slow` | `300ms` |
| `ease-default` | `ease-out` |
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

### Usage

```css
.button {
  transition: transform var(--duration-default) var(--ease-default),
              background-color var(--duration-default) var(--ease-default);
}
```

---

## CSS Variables

Copy this into your project's CSS:

```css
:root {
  /* Colors - Light Mode */
  --background: hsl(43 58% 80%);
  --foreground: hsl(21 7% 29%);
  --card: hsl(48 86% 88%);
  --card-foreground: hsl(20 5% 22%);
  --popover: hsl(52 73% 90%);
  --popover-foreground: hsl(21 7% 29%);
  --primary: hsl(189 88% 24%);
  --primary-foreground: hsl(43 58% 80%);
  --secondary: hsl(58 70% 34%);
  --secondary-foreground: hsl(48 86% 88%);
  --muted: hsl(43 58% 80%);
  --muted-foreground: hsl(26 9% 36%);
  --accent: hsl(332 33% 53%);
  --accent-foreground: hsl(20 3% 19%);
  --destructive: hsl(2 75% 45%);
  --destructive-foreground: hsl(52 73% 90%);
  --border: hsl(35 17% 58%);
  --input: hsl(52 73% 90%);
  --ring: hsl(38 100% 50%);

  /* Typography */
  --font-sans: Source Code Pro, monospace;
  --font-serif: Source Serif 4, serif;
  --font-mono: JetBrains Mono, monospace;

  /* Radius */
  --radius: 0.5rem;

  /* Shadows */
  --shadow-2xs: 0px 1px 2.5px 0px hsl(35 17% 20% / 0.03);
  --shadow-xs: 0px 1px 2.5px 0px hsl(35 17% 20% / 0.03);
  --shadow-sm: 0px 1px 2.5px 0px hsl(35 17% 20% / 0.06), 0px 1px 2px -1px hsl(35 17% 20% / 0.06);
  --shadow: 0px 1px 2.5px 0px hsl(35 17% 20% / 0.06), 0px 1px 2px -1px hsl(35 17% 20% / 0.06);
  --shadow-md: 0px 1px 2.5px 0px hsl(35 17% 20% / 0.06), 0px 2px 4px -1px hsl(35 17% 20% / 0.06);
  --shadow-lg: 0px 1px 2.5px 0px hsl(35 17% 20% / 0.06), 0px 4px 6px -1px hsl(35 17% 20% / 0.06);
  --shadow-xl: 0px 1px 2.5px 0px hsl(35 17% 20% / 0.06), 0px 8px 10px -1px hsl(35 17% 20% / 0.06);
  --shadow-2xl: 0px 1px 2.5px 0px hsl(35 17% 20% / 0.15);
}

[data-theme="dark"] {
  --background: hsl(195 6% 12%);
  --foreground: hsl(40 38% 73%);
  --card: hsl(20 3% 19%);
  --card-foreground: hsl(48 86% 88%);
  --popover: hsl(0 0% 15%);
  --popover-foreground: hsl(40 38% 73%);
  --primary: hsl(157 15% 58%);
  --primary-foreground: hsl(195 6% 12%);
  --secondary: hsl(59 70% 34%);
  --secondary-foreground: hsl(0 0% 15%);
  --muted: hsl(20 5% 22%);
  --muted-foreground: hsl(38 24% 65%);
  --accent: hsl(332 33% 53%);
  --accent-foreground: hsl(20 3% 19%);
  --destructive: hsl(2 75% 45%);
  --destructive-foreground: hsl(195 6% 12%);
  --border: hsl(21 7% 29%);
  --input: hsl(20 5% 22%);
  --ring: hsl(41 95% 58%);

  --shadow-2xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.01);
  --shadow-xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.01);
  --shadow-sm: 0px 1px 2px 0px hsl(0 0% 0% / 0.01), 0px 1px 2px -1px hsl(0 0% 0% / 0.01);
  --shadow: 0px 1px 2px 0px hsl(0 0% 0% / 0.01), 0px 1px 2px -1px hsl(0 0% 0% / 0.01);
  --shadow-md: 0px 1px 2px 0px hsl(0 0% 0% / 0.01), 0px 2px 4px -1px hsl(0 0% 0% / 0.01);
  --shadow-lg: 0px 1px 2px 0px hsl(0 0% 0% / 0.01), 0px 4px 6px -1px hsl(0 0% 0% / 0.01);
  --shadow-xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.01), 0px 8px 10px -1px hsl(0 0% 0% / 0.01);
  --shadow-2xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.03);
}
```

---

## Tailwind Usage

This theme is exported as a Tailwind plugin in `@repo/tailwind-config`. Use the design tokens directly in your components:

```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click me
</button>
```

---

## Astro Usage

In Astro, the theme is controlled via the `data-theme` attribute on the `<html>` element. Theme-aware components:

```astro
<div class="bg-background text-foreground" data-theme="dark">
  <!-- Dark mode content -->
</div>
```

The theme toggle is handled by the navbar component in the playground layout.
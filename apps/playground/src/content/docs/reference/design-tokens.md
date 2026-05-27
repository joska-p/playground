---
title: "Design Tokens"
description: "Colors, typography, spacing — the Gruvbox theme and design token reference."
category: "reference"
tags:
  - reference
---

# Design Tokens

The visual language of the playground. Based on [Gruvbox](https://github.com/morhetz/gruvbox), defined as CSS custom properties in `packages/ui/src/styles/gruvbox-theme.css`.

All tokens use the `oklch()` color space.

---

## Colors

### Light Mode

| Token                | Value                                    | Usage                  |
| -------------------- | ---------------------------------------- | ---------------------- |
| `background`         | `oklch(0.888 0.059 89.012)`              | Page background        |
| `foreground`         | `oklch(0.409 0.011 50.327)`              | Primary text           |
| `primary`            | `oklch(0.46 0.079 214.349)`              | Actions, links         |
| `primary-foreground` | `oklch(0.888 0.059 89.012)`              | Text on primary        |
| `secondary`          | `oklch(0.635 0.129 107.44)`              | Alt actions            |
| `accent`             | `oklch(0.59 0.111 351.672)`              | Highlights             |
| `destructive`        | `oklch(0.539 0.201 28.478)`              | Errors, delete         |
| `border`             | `oklch(0.684 0.035 76.295)`              | Borders                |
| `muted`              | `oklch(0.888 0.059 89.012)`              | Disabled, secondary bg |
| `muted-foreground`   | `oklch(0.477 0.017 59.8)`                | Muted text             |

### Dark Mode

Toggle with the theme button or `data-theme="dark"` on `<html>`.

| Token                | Value                                    | Usage           |
| -------------------- | ---------------------------------------- | --------------- |
| `background`         | `oklch(0.239 0.004 219.659)`             | Page background |
| `foreground`         | `oklch(0.822 0.051 84.515)`              | Primary text    |
| `primary`            | `oklch(0.691 0.04 169.812)`              | Actions         |
| `primary-foreground` | `oklch(0.239 0.004 219.659)`             | Text on primary |
| `secondary`          | `oklch(0.639 0.131 108.548)`             | Alt actions     |
| `accent`             | `oklch(0.59 0.111 351.672)`              | Highlights      |
| `destructive`        | `oklch(0.539 0.201 28.478)`              | Errors          |
| `border`             | `oklch(0.409 0.011 50.327)`              | Borders         |
| `muted`              | `oklch(0.341 0.006 48.534)`              | Disabled        |
| `muted-foreground`   | `oklch(0.749 0.042 81.345)`              | Muted text      |

### Category Colors (Project Badges)

| Token                   | Light (oklch)                | Dark (oklch)                  |
| ----------------------- | ---------------------------- | ----------------------------- |
| `category-generative`   | `0.558 0.097 167.141`        | `0.644 0.1 168.409`           |
| `category-color`        | `0.544 0.164 313.001`        | `0.592 0.131 313.642`         |
| `category-image`        | `0.559 0.143 38.532`         | `0.596 0.131 38.922`          |
| `category-data-viz`     | `0.551 0.099 234.793`        | `0.635 0.103 233.501`         |

### Doc Category Colors

| Token                   | Light (oklch)                | Dark (oklch)                  |
| ----------------------- | ---------------------------- | ----------------------------- |
| `category-tutorial`     | `0.558 0.097 167.141`        | `0.644 0.1 168.409`           |
| `category-how-to`       | `0.544 0.164 313.001`        | `0.592 0.131 313.642`         |
| `category-explanation`  | `0.559 0.143 38.532`         | `0.596 0.131 38.922`          |
| `category-reference`    | `0.619 0.128 237.422`        | `0.635 0.103 233.501`         |

---

## Typography

| Token        | Stack                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| `font-sans`  | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", …`            |
| `font-serif` | `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`             |
| `font-mono`  | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", …` |

### Prose Tokens

Tailwind Typography plugin tokens for the `prose-playground` utility:

| Token                    | CSS variable           |
| ------------------------ | ---------------------- |
| `--tw-prose-body`        | `var(--foreground)`    |
| `--tw-prose-headings`    | `var(--foreground)`    |
| `--tw-prose-links`       | `var(--primary)`       |
| `--tw-prose-bold`        | `var(--foreground)`    |
| `--tw-prose-bullets`     | `var(--border)`        |
| `--tw-prose-hr`          | `var(--border)`        |
| `--tw-prose-pre-bg`      | `var(--card)`          |
| `--tw-prose-th-borders`  | `var(--border)`        |
| `--tw-prose-td-borders`  | `var(--border)`        |

---

## Border Radius

| Token       | Value                       |
| ----------- | --------------------------- |
| `radius-sm` | `calc(var(--radius) - 4px)` |
| `radius-md` | `calc(var(--radius) - 2px)` |
| `radius-lg` | `0.5rem`                    |
| `radius-xl` | `calc(var(--radius) + 4px)` |

---

## Usage

```tsx
// Colors
<div className="bg-primary text-primary-foreground">Action</div>
<div className="text-muted-foreground">Secondary</div>

// Typography
<p className="font-mono text-sm">Code</p>

// Radius
<button className="rounded-lg">Rounded</button>
```

---

## Source

Design tokens live in `packages/ui/src/styles/gruvbox-theme.css`.

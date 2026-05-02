---
title: "Design Tokens"
description: "Colors, typography, and spacing — the Gruvbox theme."
tags:
  - reference
---

# Design Tokens

The visual language of the playground. Based on [Gruvbox](https://github.com/morhetz/gruvbox).

---

## Colors

### Light Mode

| Token         | Value              | Swatch                                                                                                                                       | Usage                  |
| ------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `background`  | `hsl(43 58% 80%)`  | <span style="display:inline-block;width:2em;height:2em;background:hsl(43 58% 80%);border-radius:4px;border:1px solid var(--border)"></span>  | Page background        |
| `foreground`  | `hsl(21 7% 29%)`   | <span style="display:inline-block;width:2em;height:2em;background:hsl(21 7% 29%);border-radius:4px;border:1px solid var(--border)"></span>   | Primary text           |
| `primary`     | `hsl(189 88% 24%)` | <span style="display:inline-block;width:2em;height:2em;background:hsl(189 88% 24%);border-radius:4px;border:1px solid var(--border)"></span> | Actions, links         |
| `secondary`   | `hsl(58 70% 34%)`  | <span style="display:inline-block;width:2em;height:2em;background:hsl(58 70% 34%);border-radius:4px;border:1px solid var(--border)"></span>  | Alt actions            |
| `accent`      | `hsl(332 33% 53%)` | <span style="display:inline-block;width:2em;height:2em;background:hsl(332 33% 53%);border-radius:4px;border:1px solid var(--border)"></span> | Highlights             |
| `destructive` | `hsl(2 75% 45%)`   | <span style="display:inline-block;width:2em;height:2em;background:hsl(2 75% 45%);border-radius:4px;border:1px solid var(--border)"></span>   | Errors, delete         |
| `border`      | `hsl(35 17% 58%)`  | <span style="display:inline-block;width:2em;height:2em;background:hsl(35 17% 58%);border-radius:4px;border:1px solid var(--border)"></span>  | Borders                |
| `muted`       | `hsl(43 58% 80%)`  | <span style="display:inline-block;width:2em;height:2em;background:hsl(43 58% 80%);border-radius:4px;border:1px solid var(--border)"></span>  | Disabled, secondary bg |

### Dark Mode

Toggle with the theme button or `data-theme="dark"` on `<html>`.

| Token         | Value              | Swatch                                                                                                                                       | Usage           |
| ------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `background`  | `hsl(195 6% 12%)`  | <span style="display:inline-block;width:2em;height:2em;background:hsl(195 6% 12%);border-radius:4px;border:1px solid var(--border)"></span>  | Page background |
| `foreground`  | `hsl(40 38% 73%)`  | <span style="display:inline-block;width:2em;height:2em;background:hsl(40 38% 73%);border-radius:4px;border:1px solid var(--border)"></span>  | Primary text    |
| `primary`     | `hsl(157 15% 58%)` | <span style="display:inline-block;width:2em;height:2em;background:hsl(157 15% 58%);border-radius:4px;border:1px solid var(--border)"></span> | Actions         |
| `secondary`   | `hsl(59 70% 34%)`  | <span style="display:inline-block;width:2em;height:2em;background:hsl(59 70% 34%);border-radius:4px;border:1px solid var(--border)"></span>  | Alt actions     |
| `accent`      | `hsl(332 33% 53%)` | <span style="display:inline-block;width:2em;height:2em;background:hsl(332 33% 53%);border-radius:4px;border:1px solid var(--border)"></span> | Highlights      |
| `destructive` | `hsl(2 75% 45%)`   | <span style="display:inline-block;width:2em;height:2em;background:hsl(2 75% 45%);border-radius:4px;border:1px solid var(--border)"></span>   | Errors          |
| `border`      | `hsl(21 7% 29%)`   | <span style="display:inline-block;width:2em;height:2em;background:hsl(21 7% 29%);border-radius:4px;border:1px solid var(--border)"></span>   | Borders         |
| `muted`       | `hsl(20 5% 22%)`   | <span style="display:inline-block;width:2em;height:2em;background:hsl(20 5% 22%);border-radius:4px;border:1px solid var(--border)"></span>   | Disabled        |

### Category Colors

Used for project category badges.

| Category              | Light              | Dark               | Swatch                                                                                                        |
| --------------------- | ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `category-generative` | `hsl(160 50% 35%)` | `hsl(160 40% 45%)` | <span style="display:inline-block;width:2em;height:2em;background:hsl(160 50% 35%);border-radius:4px"></span> |
| `category-color`      | `hsl(280 40% 50%)` | `hsl(280 35% 55%)` | <span style="display:inline-block;width:2em;height:2em;background:hsl(280 40% 50%);border-radius:4px"></span> |
| `category-image`      | `hsl(15 60% 45%)`  | `hsl(15 50% 50%)`  | <span style="display:inline-block;width:2em;height:2em;background:hsl(15 60% 45%);border-radius:4px"></span>  |
| `category-data-viz`   | `hsl(200 60% 40%)` | `hsl(200 50% 50%)` | <span style="display:inline-block;width:2em;height:2em;background:hsl(200 60% 40%);border-radius:4px"></span> |

### Doc Category Colors

Used for documentation section badges (tutorial, how-to, explanation, reference).

| Category              | Light             | Dark              | Swatch                                                                                                     |
| --------------------- | ----------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `category-tutorial`   | `hsl(160 50% 35%)` | `hsl(160 40% 45%)` | <span style="display:inline-block;width:2em;height:2em;background:hsl(160 50% 35%);border-radius:4px"></span> |
| `category-how-to`     | `hsl(280 40% 50%)` | `hsl(280 35% 55%)` | <span style="display:inline-block;width:2em;height:2em;background:hsl(280 40% 50%);border-radius:4px"></span> |
| `category-explanation`| `hsl(15 60% 45%)`  | `hsl(15 50% 50%)`  | <span style="display:inline-block;width:2em;height:2em;background:hsl(15 60% 45%);border-radius:4px"></span>  |
| `category-reference`  | `hsl(200 75% 45%)` | `hsl(200 50% 50%)` | <span style="display:inline-block;width:2em;height:2em;background:hsl(200 75% 45%);border-radius:4px"></span> |

---

## Typography

Uses JetBrains Mono for all text (monospace-first design).

| Token        | Stack                    |
| ------------ | ------------------------ |
| `font-sans`  | JetBrains Mono           |
| `font-serif` | JetBrains Mono           |
| `font-mono`  | JetBrains Mono           |

### Prose Tokens

Tailwind Typography plugin tokens for `prose-gruvbox` utility:

| Token | Value |
| --- | --- |
| `--tw-prose-body` | `var(--foreground)` |
| `--tw-prose-headings` | `var(--foreground)` |
| `--tw-prose-links` | `var(--primary)` |
| `--tw-prose-bold` | `var(--foreground)` |
| `--tw-prose-bullets` | `var(--border)` |
| `--tw-prose-hr` | `var(--border)` |
| `--tw-prose-pre-bg` | `var(--card)` |
| `--tw-prose-th-borders` | `var(--border)` |
| `--tw-prose-td-borders` | `var(--border)` |

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

Design tokens live in `packages/tailwind-config/gruvbox-styles.css`.

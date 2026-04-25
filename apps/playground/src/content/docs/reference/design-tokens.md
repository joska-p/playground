---
title: "Design Tokens"
description: "Colors, typography, spacing, and the Gruvbox theme."
type: "reference"
order: 1
---

# Design Tokens

> The building blocks of our visual language.

---

## Color Palette

### Light Mode

| Token         | HSL                | Usage           |
| ------------- | ------------------ | --------------- |
| `background`  | `hsl(43 58% 80%)`  | Page background |
| `foreground`  | `hsl(21 7% 29%)`   | Primary text    |
| `card`        | `hsl(48 86% 88%)`  | Card surfaces   |
| `primary`     | `hsl(189 88% 24%)` | Actions, links  |
| `secondary`   | `hsl(58 70% 34%)`  | Alt actions     |
| `accent`      | `hsl(332 33% 53%)` | Highlights      |
| `destructive` | `hsl(2 75% 45%)`   | Errors, delete  |
| `border`      | `hsl(35 17% 58%)`  | Borders         |
| `muted`       | `hsl(43 58% 80%)`  | Disabled        |

### Dark Mode

| Token         | HSL                | Usage           |
| ------------- | ------------------ | --------------- |
| `background`  | `hsl(195 6% 12%)`  | Page background |
| `foreground`  | `hsl(40 38% 73%)`  | Primary text    |
| `card`        | `hsl(20 3% 19%)`   | Card surfaces   |
| `primary`     | `hsl(157 15% 58%)` | Actions         |
| `secondary`   | `hsl(59 70% 34%)`  | Alt actions     |
| `accent`      | `hsl(332 33% 53%)` | Highlights      |
| `destructive` | `hsl(2 75% 45%)`   | Errors          |
| `border`      | `hsl(21 7% 29%)`   | Borders         |
| `muted`       | `hsl(20 5% 22%)`   | Disabled        |

## Typography

| Family  | Font            | Usage        |
| ------- | --------------- | ------------ |
| `sans`  | Source Code Pro | Body         |
| `serif` | Source Serif 4  | Headings     |
| `mono`  | JetBrains Mono  | Code, inputs |

### Type Scale

| Token  | Size     |
| ------ | -------- |
| `xs`   | 0.75rem  |
| `sm`   | 0.875rem |
| `base` | 1rem     |
| `lg`   | 1.125rem |
| `xl`   | 1.25rem  |
| `2xl`  | 1.5rem   |
| `3xl`  | 1.875rem |
| `4xl`  | 2.25rem  |

## Spacing

| Token | Value   |
| ----- | ------- |
| `xs`  | 0.25rem |
| `sm`  | 0.5rem  |
| `md`  | 1rem    |
| `lg`  | 1.5rem  |
| `xl`  | 2rem    |
| `2xl` | 3rem    |

## Border Radius

| Token | Value    |
| ----- | -------- |
| `sm`  | 0.125rem |
| `md`  | 0.25rem  |
| `lg`  | 0.5rem   |
| `xl`  | 0.75rem  |

## Shadows

| Token | Light      | Dark            |
| ----- | ---------- | --------------- |
| `sm`  | subtle     | subtle-dark     |
| `md`  | medium     | medium-dark     |
| `lg`  | pronounced | pronounced-dark |

## Animation

| Token     | Value |
| --------- | ----- |
| `fast`    | 100ms |
| `default` | 150ms |
| `slow`    | 300ms |

## Usage in Code

```tsx
// Colors
<div className="bg-primary text-primary-foreground">Hi</div>

// Typography
<p className="font-mono text-sm">Code here</p>

// Spacing
<div className="p-4 gap-2">Spaced</div>

// Radius
<button className="rounded-lg">Rounded</button>
```

> **Tip:** All tokens are available via Tailwind—use them directly!

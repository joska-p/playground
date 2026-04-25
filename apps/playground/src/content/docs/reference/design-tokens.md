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

| Token | Color | HSL | Usage |
| ------------- | ------------------ | ------------------ | --------------- |
| `background` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(43 58% 80%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(43 58% 80%)` | Page background |
| `foreground` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(21 7% 29%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(21 7% 29%)` | Primary text |
| `card` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(48 86% 88%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(48 86% 88%)` | Card surfaces |
| `primary` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(189 88% 24%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(189 88% 24%)` | Actions, links |
| `secondary` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(58 70% 34%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(58 70% 34%)` | Alt actions |
| `accent` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(332 33% 53%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(332 33% 53%)` | Highlights |
| `destructive` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(2 75% 45%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(2 75% 45%)` | Errors, delete |
| `border` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(35 17% 58%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(35 17% 58%)` | Borders |
| `muted` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(43 58% 80%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(43 58% 80%)` | Disabled |

### Dark Mode

| Token | Color | HSL | Usage |
| ------------- | ------------------ | ------------------ | --------------- |
| `background` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(195 6% 12%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(195 6% 12%)` | Page background |
| `foreground` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(40 38% 73%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(40 38% 73%)` | Primary text |
| `card` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(20 3% 19%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(20 3% 19%)` | Card surfaces |
| `primary` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(157 15% 58%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(157 15% 58%)` | Actions |
| `secondary` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(59 70% 34%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(59 70% 34%)` | Alt actions |
| `accent` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(332 33% 53%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(332 33% 53%)` | Highlights |
| `destructive` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(2 75% 45%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(2 75% 45%)` | Errors |
| `border` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(21 7% 29%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(21 7% 29%)` | Borders |
| `muted` | <span style="display:inline-block;width:1.5em;height:1.5em;background:hsl(20 5% 22%);border-radius:4px;border:1px solid var(--border)"></span> | `hsl(20 5% 22%)` | Disabled |

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

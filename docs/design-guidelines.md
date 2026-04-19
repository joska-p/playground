# Gruvbox Playground: Design Guidelines

This document defines the visual and interaction principles for the project. Our goal is to create a UI that feels **physical, tactile, and intentionally "retro-tech"**, powered by the Gruvbox color palette.

---

## 🎨 1. Core Principles

### 1.1 Tactile Realism
Components should feel like physical objects on a desk. We use borders and specific shadow offsets to simulate depth. Avoid "flat" design; prefer "tactile" design.
- **Rule**: Every interactive element must have a visible "click" state (translation or shadow change).

### 1.2 The Terminal Aesthetic
As a playground for code and math, the UI should feel like a sophisticated terminal or laboratory instrument.
- **Rule**: Use monospaced fonts for data, labels, and interactive elements.

### 1.3 Deliberate Contrast
Gruvbox is known for its "soft contrast." We use background colors to group elements and high-contrast primary colors only for the main actions or critical data.

---

## 🌈 2. Color Palette (Gruvbox)

We use the following functional tokens derived from the Gruvbox palette:

| Token | Purpose | Aesthetic Note |
| :--- | :--- | :--- |
| `primary` | Main actions | Blue/Aqua in light, Aqua/Green in dark. |
| `secondary` | Secondary actions / Highlights | Yellow/Orange tones. |
| `accent` | Emphasis / Decorative | Magenta/Purple. |
| `background` | Page background | "Hard" contrast background. |
| `card` | Container background | "Soft" contrast background. |
| `muted` | De-emphasized text/elements | Low contrast against card/bg. |
| `destructive` | Errors / Danger | Gruvbox Red. |

---

## ⌨️ 3. Typography

- **Interactive Elements** (`button`, `input`, `select`, `label`): **Monospace** (`JetBrains Mono` or `Source Code Pro`). It conveys precision.
- **Data/Math**: **Monospace**.
- **Body Text**: **Sans-serif** for readability in long form.
- **Titles**: **Monospace** with bold weights and tracking-tight.

---

## 🛠️ 4. Component Rules

### 4.1 Borders & Shadows
- **Cards**: 1px solid border using `--border`. Use a "stepped" shadow (`shadow-md`) to lift it off the background.
- **Buttons**:
    - **Default**: Solid background with a slight bottom border (2px) to simulate height.
    - **Active**: `translate-y-[1px]` to simulate being pressed.
- **Inputs**: Inset look or solid border. Use `focus-visible:ring-2` with the `--ring` color.

### 4.2 Interactive Feedback
- **Hover**: Subtle shift in background opacity (`/90`) or a border color change.
- **Focus**: Always use a high-visibility ring. Never hide the focus state.
- **Disabled**: Lower opacity (`0.5`) and `cursor-not-allowed`. Remove tactile translations.

---

## 📏 5. Layout & Spacing

- **Grid System**: Use a consistent 4px (1 unit) spacing scale.
- **Density**: Prefer "Comfortable" for experiments and "Compact" for toolbars.
- **Toolbars**: Always fixed-height or clearly delimited with a border (e.g., `border-t-2`).

---

## 🌓 6. Dark Mode Strategy

- **Light Mode**: Warm, "parchment" feel. Focus on readability.
- **Dark Mode**: High-tech, "obsidian" feel. Focus on reduced eye strain.
- **Transition**: All components must use `transition-all` or `transition-colors` to handle theme switching gracefully.

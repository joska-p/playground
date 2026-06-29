# DESIGN SYSTEM GUIDELINES: THE EXPLORATIVE LAB TERMINAL

## 1. The Chromatic Philosophy: "Code & Logic Coloration"

In a creative playground, color should never be used as a decoration or background fill for layout containers. Instead, **color is used as data syntax highlighting**. Just like an IDE highlights syntax based on data type, the UI components use specific Gruvbox tones to indicate interactive function, mathematical mode, or state logic:

- **The Primary Engine (`--primary`)**: Map this blue/teal tone explicitly to global runtime actions—such as "Execute Code," "Generate Mesh," or "Seed String." It signifies an active computation trigger.
- **The Secondary Variable (`--secondary`)**: Use this mossy mint green for active mathematical mutations, parameter locks, or values that are currently modifying runtime states.
- **The Acute Accent (`--accent`)**: This striking warm tone is reserved strictly for specialized sub-domains—like switching coordinates (Cartesian vs. Polar), altering matrix states, or triggering an active visual rendering overwrite.
- **The Structural Frame (`--card` & `--background`)**: Keep these surfaces absolutely flat, solid, and non-distracting. The layout containers frame your vibrant generative outputs like an elegant terminal interface, leaving your canvas graphics to stand out on their own.

---

## 2. JetBrains Mono Typographic Constraints

Typography acts like a clear, laser-etched code matrix. Because there are no font families to switch between, hierarchy is structured through clean mathematical layout properties rather than custom font weights:

- **Strict Token Scaling:** Use Tailwind v4 scale steps explicitly (`text-xs`, `text-sm`, `text-base`). Never use arbitrary manual sizes.
- **Functional Token Mapping:**
- `text-xs uppercase tracking-widest`: Used for fixed system metadata, section properties, matrix coordinates, and array keys (e.g., `SEED //`, `DIMENSIONS //`).
- `text-sm font-medium`: The default text size for live parameters, input text lines, and active values.

- **No Label Hiding:** Active values (like a slider's exact position `42px` or a switch's status `[ON]`) should be rendered inline using a crisp text display alongside the control handle, matching an interactive data stream.

---

## 3. Physical Geometry & Interaction Slices

- **Flat Plane Collisions (Zero Shadows):** Completely ban `shadow-*` utility classes. To separate control panels from the active visual playground canvas, rely exclusively on clean, single-pixel geometric seams (`border-l`, `border-t`).
- **Micro-Bezel Radii:** Use a subtle, sharp corner constraint (`rounded-xs` or `rounded-sm`) only on interactive items like buttons or text boxes. This mimics sharp, custom-cut laboratory tiles without looking organic or soft.
- **The Hardware Tactile Snap:** When hovering over (`hover:`) or clicking into (`active:`) buttons and controls, colors should switch instantly with minimal or zero animation fade. It should feel like flipping a hardware toggle or executing a script in a command line terminal.
- **Zero Layout Displacement:** Focus states use `outline-offset-*` tricks exclusively to project the `--ring` outline cleanly over elements during keyboard navigation. The layout engine must never experience pixel shifting when a component enters focus.

---

## 4. Layout Anti-Soup Strategy: Clean Component Archetypes

To eliminate redundant HTML wrappers, treat semantic elements as layout primitives directly. Let's see how these rules format your core creative controls:

### A. The Parameter Slider

Instead of creating complex container elements, use a native grid layout. The text attributes map seamlessly above the range input track without any extra structural blocks.

```text
[   SEED SIZE   ]           [ 1024px ]  <- text-xs uppercase tracking-wider
[======================O=============]  <- accent-primary input track

```

### B. The Collapsible Math Block (`<details>`)

For complex parameter lists, matrices, or code blocks, use native HTML `<details>` and `<summary>` components. When the module expands, use the parent's native toggle state to tint the background panel with a subtle structural color shift (`open:bg-card/40`), keeping your layout tree completely lightweight.

### C. The Placement-Fluid Grid Sidebar

When the sidebar panel transitions into visibility across your chosen direction, the canvas panel shifts and adjusts its dimensions through native CSS grid tracks. The internal workspace automatically expands or contracts smoothly, acting as a natural extension of your playground.

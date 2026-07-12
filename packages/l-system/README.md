---
title: 'L-System'
coordinates: '/algorithms/fractals'
status: 'Dormant'
date_discovered: 2025-06-01
---

# @repo/l-system

> An interactive 3D fractal visualizer that turns L-system grammars into
> turtle-graphics geometry — pick a grammar, watch it grow, tweak the angles
> and watch the branches reshape themselves.

---

## Essence

L-System is the visual half of a two-package L-system system. It takes the
pure rewriting output from
[`@repo/l-system-engine`](/docs/reference/packages/l-system-engine) — a flat
sequence of named symbols — and interprets it as 3D turtle-graphics commands:
move forward, yaw left, pitch up, push branch, pop branch. The resulting line
segments are coloured by stack depth using a Gruvbox palette and rendered in a
React Three Fiber scene you can orbit, zoom, and examine from any angle.

The interesting tension is between _generative complexity_ and _immediate
feedback_. Five built-in grammars span the canonical L-system spectrum —
deterministic (Koch curve, fractal tree, dragon plant), parametric (tree
with length decay), and stochastic (random branching with seed control). Each
grammar produces hundreds or thousands of segments at modest iteration
counts, and the Leva GUI panel makes every parameter a live dial: switch
grammars, step the iteration forward one frame at a time, toggle
auto-animation, or drag the turtle angle slider and watch the fractal
reshape in real time. The interpreter (144 lines, quaternion math, 18 turtle
symbols) is the bridge between abstract symbols and spatial geometry — it
doesn't know anything about Three.js, and the scene doesn't know anything
about L-systems. They meet at `LineSegment[]`.

## Quick Launch

```bash
pnpm dev --filter @repo/l-system
```

Or install it into your own project:

```bash
pnpm add @repo/l-system
```

```tsx
import { App } from '@repo/l-system';

export default function Page() {
  return <App />;
}
```

```tsx
import '@repo/l-system/styles';
```

## Field Notes

- **The Catalyst:** The question of what a formal grammar _looks like_ when
  its symbols are interpreted as spatial instructions rather than characters
  on a page. L-systems were invented to model plant growth — the parallel
  rewriting produces self-similar structures at every scale, which is
  exactly what fractals are. A 3D turtle-graphics interpreter makes this
  tangible: you can orbit around a stochastic tree and see how a 70/30
  weight split on the branching rule produces organic-looking variation,
  or watch a parametric tree's branches shrink exponentially and stop at
  a threshold. The Leva panel turns the whole thing into a live laboratory
  — every parameter is adjustable, every change is immediate, and the
  quaternion math in the interpreter handles the 3D rotations correctly
  so you don't have to.

- **Quirks & Anomalies:** The interpreter uses quaternion multiplication
  for all rotations (yaw, pitch, roll, turn-around) rather than Euler
  angles, which avoids gimbal lock but makes the rotation math less
  intuitive to read. Branch depth is tracked via the push/pop stack —
  each `[` increments depth, each `]` decrements — and the depth value
  drives the Gruvbox colour palette (8 colours cycled by depth). The
  HUD overlay at top-left shows grammar name, current iteration vs. max,
  and segment count — a thin diagnostic layer that doesn't interfere with
  the scene. The five grammars have hardcoded max iteration limits (6–8)
  to prevent the segment count from exceeding what the line renderer can
  handle at interactive frame rates.

- **Future Horizons:** A grammar editor — type L-system rules directly in
  the browser and see the result without restarting. Export to OBJ or STL
  for 3D printing. Material variation: colour segments by parameter value
  (e.g., branch length) rather than just depth. A "growth" animation mode
  that progressively reveals segments over time instead of stepping the
  entire grammar. Integration with the palette-generator to drive the
  depth colour scheme from a generated palette.

---

## Architecture

```
@repo/l-system-engine                # Pure symbol rewriting
  └─ @repo/l-system                  # React Three.js app
       ├─ grammars.ts                # 5 built-in grammars + GRUVBOX_DEPTH palette
       ├─ core/
       │   └─ interpreter.ts         # 3D turtle-graphics (144 lines)
       │       ├─ interpretWord()    # Word → LineSegment[]
       │       └─ TurtleState        # position, direction, up, depth
       ├─ components/
       │   ├─ LSystemApp.tsx         # Leva controls + R3F Canvas wrapper
       │   └─ Scene.tsx              # lineSegments + per-vertex colouring + OrbitControls
       └─ styles/
           └─ global.css             # Tailwind + Gruvbox theme
```

### Interpreter Symbols

| Symbol | Action                          |
| ------ | ------------------------------- |
| `F`    | Move forward and draw           |
| `f`    | Move forward silently (no line) |
| `+`    | Yaw left                        |
| `-`    | Yaw right                       |
| `^`    | Pitch up                        |
| `&`    | Pitch down                      |
| `\`    | Roll left                       |
| `/`    | Roll right                      |
| `\|`   | Turn around 180°                |
| `[`    | Push state (branch start)       |
| `]`    | Pop state (branch end)          |

## Built-in Grammars

| Grammar         | Type          | Angle | Step | Max Iterations |
| --------------- | ------------- | ----- | ---- | -------------- |
| Koch Curve      | Deterministic | 90°   | 0.5  | 6              |
| Fractal Tree    | Deterministic | 25°   | 0.4  | 7              |
| Dragon Plant    | Deterministic | 22.5° | 0.3  | 6              |
| Parametric Tree | Parametric    | 25°   | 1    | 8              |
| Stochastic Tree | Stochastic    | 22.5° | 0.4  | 6              |

## Leva Controls

| Folder    | Control        | Type   | Range / Notes                        |
| --------- | -------------- | ------ | ------------------------------------ |
| Grammar   | `grammarId`    | Select | Dropdown of 5 grammar names          |
| Animation | `autoStep`     | Toggle | Auto-advance iteration each frame    |
|           | `Step`         | Button | Manual single-step forward           |
|           | `Reset`        | Button | Reset iteration to 0                 |
|           | `interval`     | Slider | 0.25–5s, shown only when autoStep on |
| Turtle    | `angle`        | Slider | 1–180°                               |
|           | `stepLength`   | Slider | 0.01–5                               |
|           | `lengthFactor` | Slider | 0.1–5                                |
|           | `lineWidth`    | Slider | 0.5–10                               |
|           | `widthFactor`  | Slider | 0.1–5                                |

## Key Dependencies

| Package                 | Role                                  |
| ----------------------- | ------------------------------------- |
| `@repo/l-system-engine` | Workspace sibling — grammar expansion |
| `three`                 | 3D rendering engine                   |
| `@react-three/fiber`    | React renderer for Three.js           |
| `@react-three/drei`     | R3F utilities (OrbitControls)         |
| `leva`                  | Debug GUI panel                       |
| `zustand`               | State management                      |

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

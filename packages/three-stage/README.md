---
title: 'Three Stage'
coordinates: '/visuals/3d'
status: 'Active'
date_discovered: 2025-06-01
---

# @repo/three-stage

> A 3D scene explorer where geometry, materials, and lighting are all
> swappable at runtime — click a mesh to see its wireframe, tweak a slider
> to reshape it, switch a light and watch the shadows move.

---

## Essence

Three Stage is a standalone React Three Fiber playground for inspecting how
Three.js geometries, materials, and light rigs behave together. It is not a
library — it is a live canvas: a single `<Scene />` component that renders a
configurable mesh on a ground plane with four light sources, all driven by a
Leva debug GUI panel that stays out of the way until you need it.

The interesting tension is between _immediacy_ and _control_. The Leva panel
organises every parameter into folders — geometry, material, each light source
as its own subfolder — so you can swap a `TorusKnot` for a `Sphere`, change
`MeshStandardMaterial` to `MeshToonMaterial`, or drag a spotlight across the
scene and see the result in real time. But the mesh itself is also interactive:
click it to toggle wireframe mode without touching the GUI at all. The two
interaction paths — panel and pointer — are independent, and the scene
responds to both without re-mounting.

Behind the scenes, geometry and material are created as fresh Three.js
instances via factory functions (`utils/geometry.ts`, `utils/material.ts`)
whenever the Leva dropdown value changes, then applied through R3F
`<primitive object={...}>` bindings. Each of the three directional light types
(Directional, Point, Spot) renders a drei `Helper` gizmo in the scene,
making their position and orientation visible as wireframe overlays — a
debugging affordance that doubles as a visual reference for how light
propagates through the space.

A second scene — the GetStarted demo — renders an procedural plant generator
with instanced leaves, custom GLSL shaders, and fibonacci-sphere spawn
points, demonstrating a more creative use of the same R3F foundation.

## Quick Launch

```bash
pnpm dev --filter @repo/three-stage
```

Or install it into your own project:

```bash
pnpm add @repo/three-stage
```

```tsx
import App from '@repo/three-stage';

export default function Page() {
  return <App />;
}
```

```tsx
import '@repo/three-stage/styles';
```

## Field Notes

- **The Catalyst:** The question of what happens when every rendering
  parameter becomes a live dial. Three.js scenes in tutorials are usually
  static — hardcoded geometries, fixed lights, materials set once at
  creation. The Leva panel dissolves that boundary: you can swap a box for a
  torusknot mid-frame, drag a spotlight from one side of the scene to the
  other, and watch how `MeshToonMaterial` reacts differently to the same
  light rig that `MeshStandardMaterial` handles smoothly. The wireframe
  toggle — a click, not a checkbox — makes the mesh itself feel like an
  interface, not just a display surface.

- **Quirks & Anomalies:** The geometry and material factories create new
  Three.js instances on every Leva dropdown change, which is correct for
  R3F's reconciliation model but means there is no object pooling or reuse.
  The grid helper uses hardcoded magenta (`0xff22aa`) center lines and cyan
  (`0x55ccff`) edges — a colour choice that is intentional but not
  configurable. The box geometry factory has a typo in its parameter name
  (`heigh` instead of `height`) that has survived since the initial commit.
  The `depth` material entry is the only one missing `as const`, making its
  TypeScript type slightly less precise than the others.

- **Future Horizons:** Animated transitions when swapping geometries — a
  morph from one shape to another instead of an instant replacement. A
  material comparison mode that renders two meshes side by side with
  different materials under identical lighting. Export the current scene
  state (geometry, material, light positions) as a shareable URL or JSON
  snapshot. A recording mode that captures the canvas to WebM. Integration
  with the palette-generator package to drive mesh colour from a generated
  palette.

---

## Architecture

```
App.tsx (entry — renders GetStarted scene)
  │
  ├─ GetStarted Scene (active — procedural plant generator)
  │   ├─ Canvas (camera [0,0,10], fov 75)
  │   ├─ AmbientLight + HemisphereLight
  │   ├─ OrbitControls + GizmoHelper
  │   ├─ GradientBackground (procedural GLSL radial gradients)
  │   └─ Root (branch spawner)
  │       ├─ Branch[] (instanced leaves, custom ShaderMaterial)
  │       ├─ DebugGeometry (wireframe spawn envelope)
  │       └─ useLevaControls (Spawn folder: preset, radius, offset)
  │
  └─ Stage Scene (dormant — 3D scene explorer)
      ├─ Canvas (camera [-15,10,20], fov 60, shadows)
      ├─ GizmoHelper + GizmoViewport (bottom-left)
      ├─ GridHelper (20×20, magenta/cyan)
      ├─ AxesHelper (10 units)
      ├─ Ground plane (20×20, receives shadows)
      ├─ Sample (Leva-controlled mesh)
      │   ├─ geometry (select: Box, TorusKnot, Sphere, Cylinder)
      │   ├─ material (select: 7 Three.js materials)
      │   ├─ color (color picker)
      │   ├─ speed (rotation slider)
      │   └─ click → toggle wireframe
      └─ Lighting (Leva folder with subfolders)
          ├─ Ambient (intensity, color)
          ├─ Directional (position, intensity, color + helper gizmo)
          ├─ Point (position, intensity, color, decay + helper gizmo)
          └─ Spot (position, intensity, color, penumbra, angle + helper gizmo)
```

## Geometry Library

| Label     | Geometry                                 |
| --------- | ---------------------------------------- |
| Box       | `BoxGeometry(2, 2, 2)`                   |
| TorusKnot | `TorusKnotGeometry(1, 0.4, 64, 8, 2, 3)` |
| Sphere    | `SphereGeometry(2, 8, 8)`                |
| Cylinder  | `CylinderGeometry(2, 2, 2, 8)`           |

## Material Library

| Label    | Three.js Material      |
| -------- | ---------------------- |
| Standard | `MeshStandardMaterial` |
| Toon     | `MeshToonMaterial`     |
| Basic    | `MeshBasicMaterial`    |
| Lambert  | `MeshLambertMaterial`  |
| Normal   | `MeshNormalMaterial`   |
| Phong    | `MeshPhongMaterial`    |
| Depth    | `MeshDepthMaterial`    |

## Key Dependencies

| Package              | Role                                          |
| -------------------- | --------------------------------------------- |
| `three`              | 3D rendering engine                           |
| `@react-three/fiber` | React renderer for Three.js                   |
| `@react-three/drei`  | R3F utilities (OrbitControls, helpers, gizmo) |
| `leva`               | Debug GUI panel                               |

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

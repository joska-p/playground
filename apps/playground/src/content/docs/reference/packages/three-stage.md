---
title: "Three Stage"
description: "React Three Fiber 3D scene explorer with interactive Leva controls for geometry, material, and lighting."
category: "reference"
tags:
  - reference
  - three-stage
order: 20
---

# @repo/three-stage

> React Three Fiber 3D scene explorer with interactive Leva controls for geometry, material, and lighting.

## Quick Start

```bash
pnpm add @repo/three-stage
```

```tsx
import { Scene } from "@repo/three-stage/Scene";

export default function App() {
  return <Scene />;
}
```

## Architecture

The scene renders a configurable 3D mesh on a ground plane with multiple light sources, all controllable via the Leva debug GUI panel.

```
Scene
  ├─ <Canvas> (R3F — shadows, orbit controls)
  │   ├─ <GizmoHelper> + <GizmoViewport>
  │   ├─ <gridHelper>
  │   ├─ <axesHelper>
  │   ├─ Ground plane
  │   ├─ Sample
  │   │   └─ <mesh> (geometry + material, configurable via Leva)
  │   ├─ AmbientLight
  │   ├─ DirectionalLight (with helper gizmo)
  │   ├─ PointLight (with helper gizmo)
  │   └─ SpotLight (with helper gizmo)
```

## Controls (Leva GUI)

The Leva panel exposes controls grouped under folders.

### Sample Object

| Control | Type | Default | Description |
|---|---|---|---|
| `speed` | 0–0.03 | 0.005 | Rotation speed on all axes |
| `geometry` | select | Box | Box, TorusKnot, Sphere, Cylinder |
| `color` | color | #ff0000 | Mesh color |
| `material` | select | Standard | Standard, Toon, Basic, Lambert, Normal, Phong, Depth |

Click the mesh to toggle wireframe mode.

### Lighting

Each light type has position (x, y, z), intensity, and color controls, organized under a "Lighting" folder in Leva. Directional, Point, and Spot lights include helper gizmos via `@react-three/drei` `useHelper`.

## Geometry Library

| Label | Geometry |
|---|---|
| Box | `BoxGeometry(width, height, depth)` |
| TorusKnot | `TorusKnotGeometry(1, 0.4, 64, 8, 2, 3)` |
| Sphere | `SphereGeometry(2, 8, 8)` |
| Cylinder | `CylinderGeometry(2, 2, 2, 8)` |

## Material Library

| Label | Three.js Material |
|---|---|
| Standard | `MeshStandardMaterial` |
| Toon | `MeshToonMaterial` |
| Basic | `MeshBasicMaterial` |
| Lambert | `MeshLambertMaterial` |
| Normal | `MeshNormalMaterial` |
| Phong | `MeshPhongMaterial` |
| Depth | `MeshDepthMaterial` |

## Exports

| Export | Path | Description |
|---|---|---|
| `Scene` | `@repo/three-stage/Scene` | Root 3D scene component |
| `./styles` | `@repo/three-stage/styles` | Component CSS |

## Key Dependencies

| Package | Role |
|---|---|
| `three` | 3D rendering engine |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | R3F utilities (OrbitControls, helpers, gizmo) |
| `leva` | Debug GUI panel |

---

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_


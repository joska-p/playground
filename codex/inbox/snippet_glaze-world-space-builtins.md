---
title: 'Builtins glaze : conversion canonique monde et contrats implicites'
date: 2026-08-21
type: snippet
tags: [glaze, webgl, glsl]
---

**Contexte :** les démos glaze répètent toutes le même idiome de conversion ; les builtins sont des uniformes auto-alimentés, pas des injections GLSL.

**Corps :**

Conversion canonique écran→monde (identique bit à bit à `Camera.screenToWorld` côté CPU) :

```glsl
// vUv est Y-up ; u_camera est en px CSS Y-down (convention DOM) → flip explicite.
vec2 css = vec2(vUv.x, 1.0 - vUv.y) * (u_resolution / u_dpr);
vec2 world = (css - u_camera.xy) / u_camera.z;
```

Uniformes standards réservés (réappliqués par `renderProgram` chaque frame, donc déclarer seulement ceux utilisés) : `u_resolution` (vec2 device px), `u_aspect`, `u_mouse` (UV Y-up), `u_camera` (vec3 `[x, y, zoom]`), `u_dpr`, `u_time`, `u_clockTime`. Dans un programme StateBuffer : `u_state` (sampler2D) — **nom imposé**, `step()` le binde à TEXTURE0 par lookup de nom.

Gotchas :

- glaze n'injecte que `#version 300 es` (et strippe toute directive existante). `precision`, `in vec2 vUv`, `out vec4 fragColor` et les déclarations d'uniformes restent à la charge du shader.
- Sources GLSL ES 1.00 (`texture2D`, `varying`, `gl_FragColor`) ne compilent pas — porter vers 3.00.
- Blend `SRC_ALPHA/ONE_MINUS_SRC_ALPHA` avec alpha prémultiplié : un fullscreen opaque sort `alpha = 1.0`.

**Lien codebase :** `packages/glaze/src/gpu/shader/compileProgram.ts`, `packages/glaze/src/gpu/shader/setUniforms.ts` (`createStandardUniformValues`), `packages/glaze/src/gpu/GpuSurface.ts` (`renderProgram`)

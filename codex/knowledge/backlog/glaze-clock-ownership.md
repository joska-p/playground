# Glaze — clock ownership : consumer → GpuCanvas, pas l'inverse

La clock suit le même pattern que la camera : le consumer la crée, la passe à GpuCanvas,
et GpuSurface l'utilise. Le flux :

```
consumer crée Clock → passe à GpuCanvas (prop clock)
    → GpuSurface utilise clock.update(deltaTime) chaque frame
    → onClockStore revient avec le ClockStore wrapper (subscribe, togglePlay, getIsPlaying)
```

Pourquoi pas l'inverse (GpuSurface crée la clock, expose via callback) :

- le consumer perd le contrôle du lifecycle de la clock
- deux clocks indépendantes peuvent coexister (une dans le store, une dans le surface)
- le shader reçoit `u_clockTime` via les uniforms standard de `renderProgram()` —
  la source est toujours `surface.clock.time`, quelle que soit l'origine de la clock

`GpuSurfaceConfig.clock` est optionnel : si non fourni, GpuSurface en crée une
avec `clockOptions`. Si fourni, elle l'utilise telle quelle.
`clockOptions` n'a de sens que quand aucun `clock` n'est passé.

API : `onClockStore` sur `GpuCanvas` — même pattern que `onSurface`. Le callback
reçoit le `ClockStore` (wrapping la clock du surface) au moment du mount.
Le consumer peut stocker ce wrapper dans un store Zustand pour le partager
à des composants siblings (ex: SpiraleControls).

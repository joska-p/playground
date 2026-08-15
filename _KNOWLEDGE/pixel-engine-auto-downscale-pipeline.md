# Design — auto-downscale silencieux du pipeline

`runPipeline` (packages/pixel-engine/src/pipeline-runner.ts) insère automatiquement un step
`resize` au début de la liste si la source dépasse `context.maximumPixels` (et si le pipeline ne
contient pas déjà un resize). `buildAutoDownscaleStep` renvoie null dans ces cas-là.

Pièges / décisions :

- L'utilisateur ne demande jamais ce resize : il voit un `console.warn` et un snapshot
  supplémentaire en tête des résultats. C'est voulu — borner la taille évite de lancer des
  manipulations coûteuses sur des images énormes — mais c'est facile à oublier quand on debug.
- Le check `steps.some((step) => step.id === 'resize')` évite de doubler un resize explicite.
- `options: { maximumPixels }` : le step resize reçoit la limite, donc redimensionner à la volée
  respecte toujours le budget même si l'utilisateur a changé la config.

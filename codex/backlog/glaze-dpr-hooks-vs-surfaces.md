# Glaze — divergence `dpr` : hooks React vs surfaces (corrigé)

C'était un **bug**, corrigé : `useCpuSurface` / `useGpuSurface` faisaient
`dpr: options.dpr ?? 1` et forçaient un défaut de **1**, alors que les surfaces (config directe)
défautent sur `window.devicePixelRatio` (ou 1 hors navigateur).

Conséquence du bug : rendus flous sur écran HiDPI via les hooks React sans `dpr` explicite.

Fix : ne plus forcer 1, laisser `undefined` retomber sur le défaut de la surface. Attention :
le projet a `exactOptionalPropertyTypes: true` → on ne peut pas passer `dpr: undefined`
explicitement, il faut l'omettre via un spread conditionnel
(`...(options.dpr !== undefined ? { dpr: options.dpr } : {})`).

Leçon : quand une option a un défaut intelligent côté bas niveau, les facades ne doivent pas
ré-appliquer un défaut plus bête.

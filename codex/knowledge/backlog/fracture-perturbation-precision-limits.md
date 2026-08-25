# Fracture — limites de précision (perturbation)

`packages/fracture/src/core/perturbationOrbit.ts` + shaders DS.

- Float64 ≈ 15-16 chiffres significatifs → les centres ne sont fiables que jusqu'à ~1e15-1e16 de zoom.
  Pour du vrai 1e100, il faut swap vers BigInt / decimal.js en gardant le même shape de sortie
  (Float32Array entrelacé (Xr, Xi)).
- La boucle delta GPU est en double-single (~48 bits de mantisse) → plancher du décalage par pixel :
  ~1e7-1e8 (float32 simple) → ~1e14-1e15 relatif à la référence (si le centre reste précis).
- `u_camera.z` (uniform float32 de glaze, zoom) déborde au-delà de ~3.4e38.
- Atteindre 1e100 exige un schéma scaled/regioned ou une référence multiprecision, pas juste du DS.

## Glitch

Les pixels qui restent dedans après `referenceIterations` (itération où la référence a échappé) ne
peuvent pas être résolus depuis une seule orbite de référence → rendus "intérieur".
Détection de glitch / orbites de référence supplémentaires = future work.

La référence secondaire (`computeSecondaryOrbit`) est décalée de ~2-3 px dans le plan complexe :
toujours utile pour la vue courante mais statistiquement moins susceptible de tomber sur le même
glitch. Offset ~2.5 px, tourné pour ne pas être aligné sur les axes (0.7/0.7).

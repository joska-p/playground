# Mandelbrot — perturbation : seule la référence a besoin de précision arbitraire

Pour le deep-zoom Mandelbrot, on ne fait des calculs en précision arbitraire (BigInt) que pour
**un seul point** : le centre de l'orbite de référence (C). On itère Z_{n+1} = Z_n² + C en
BigFloat, mais on stocke chaque Z_n sous forme de `float32` ordinaire — tant que Z_n n'a pas
divergé, |Z| < 2, donc des floats suffisent largement.

Le GPU (shader) n'itère jamais Z lui-même : chaque pixel itère seulement le petit delta δ par
rapport à cette orbite stockée (δ_{n+1} = 2·Z_n·δ_n + δ_n² + δc). D'où le nom "perturbation" :
on perturbe la trajectoire de référence.

Conséquence pratique : la texture d'orbite est en RG32F (RG = (Zx, Zy) par texel), et le
`uRefOffset` uniform = (viewCenter - refCenter) en unités complexes pour translater chaque pixel
vers sa position absolue.

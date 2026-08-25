# Mandelbrot — rebasing (Zhuoran) : une seule référence pour tout l'écran

En perturbation, δ dérive petit à petit et peut devenir de l'ordre de Z, voire plus grand. Si on
continue à itérer δ contre l'orbite de référence, la représentation df32 sature et on obtient des
taches ("glitch blobs").

Trick de Zhuoran (_rebasing_) : à chaque itération, comparer |Z + δ| (la valeur pleine) à |δ|.
Dès que la valeur pleine devient **plus petite** que le delta (ou qu'on dépasse la fin de
l'orbite de référence), on **réinitialise** : δ = valeur pleine, et on repart de l'indice 0 de la
référence.

Conséquence : une seule orbite de référence (calculée en précision arbitraire côté CPU) peut
couvrir tout l'écran sans glitch, même en zoomant profondément.

Code dans le shader : test après l'avancement du delta,
`if (fmag2 < dmag2 || m >= uRefCount - 1) { dz = ...; m = 0; }`.

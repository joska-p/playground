# Design — fusion des étapes pixel (FusionScheduler)

Dans pixel-engine, les manipulations `access: 'pixel'` ne sont pas exécutées immédiatement :
`step-dispatcher.ts` les pousse dans `FusionScheduler.add()`. Elles ne s'exécutent qu'au `flush()`,
déclenché par la première étape non-pixel (neighborhood/global) ou par `runPipeline` à la fin de
chaque step.

Le gain : N étapes pixel consécutives s'appliquent à chaque pixel en **une seule passe** sur le
buffer au lieu de N passes. `runFusedPixelBatch` chaîne les fonctions pixel les unes après les
autres sur le même quadruplet RGBA, puis clamp dans [0,255] une seule fois à la fin.

Piège important : l'ordre compte. `dispatchStep` fait `scheduler.flush()` AVANT toute étape
neighborhood/global, donc une étape pixel non flushée verrait son effet disparaître si une étape
non-pixel écrivait le buffer directement. Le flush garantit que le buffer contient le résultat des
étapes pixel précédentes avant de le réutiliser.

# Leçon — classe concrète plutôt qu'interface (worker-pool)

Trois packages (`automa`, `graph-viz`, `pixel`) avaient chacun réinventé le même boilerplate de
Web Workers : création paresseuse, pool borné, file FIFO, teardown. `@repo/worker-pool` extrait la
forme commune en UNE classe concrète.

Choix de design notable : **une classe, pas une interface abstraite**. On s'interdit une interface
avant d'avoir une seconde implémentation — c'est du YAGNI (« adding an abstract interface before a
second implementation is premature »). `MockWorkerPool` (synchrone, pour les tests sans workers)
fournit la seconde implémentation quand elle devient réellement nécessaire.

Autres décisions :

- `workerFactory: () => Worker` est volontairement agnostique du bundler (pas de support `?worker&inline`
  intégré) — le consumer gère `new URL(..., import.meta.url)` et les flags Vite.
- `deserialize` est fourni par le consumer car chaque worker a son protocole d'erreur.
- `teardown()` rejette aussi les tâches en file — sinon leurs promesses penderaient pour toujours.

Leçon générale : quand N packages copient le même boilerplate, l'extraire dans un package commun
avec la forme la plus simple possible (classe + hooks de config), pas la plus générique.

# Review critique — Findings, gotchas & angles morts

> Ce document part du principe que la SSOT et le comparatif sont lus. Il ne réexplique pas chaque
> problème (déjà détaillé dans la SSOT, partie C) — il se concentre sur ce qui mérite un regard
> critique : les endroits où l'implémentation a dévié du plan initial, ce qui semble ne pas avoir
> été couvert, les subtilités qu'on oubliera dans six mois, et les principes transversaux à garder.
> **Limite à noter** : cette review s'appuie sur les documents fournis (audit + handoff), pas sur
> une lecture du code réel. Les points marqués « à vérifier » demandent un coup d'œil au repo pour
> être confirmés.

---

## 1. Écarts entre ce qui était proposé et ce qui a été livré

Le plan initial (l'audit) et l'exécution finale (le handoff) ne coïncident pas toujours au trait
près. Ce n'est pas un problème en soi — c'est même souvent le signe d'une meilleure solution
trouvée en cours de route — mais ça vaut la peine de le noter explicitement, car ces écarts ne
sont visibles nulle part ailleurs que dans la comparaison des deux documents.

### `endFrame()` : la solution complète a été choisie plutôt que la variante minimale

L'audit (Pass 3, Finding 2) proposait deux options : soit un vrai jeton de preuve
(`FrameToken`, basé sur un symbole unique) exigé par `endFrame(token)`, soit une alternative plus
légère (`consumeFrameState()` qui retourne l'état en le vidant, sans coupler les deux modules).
Le handoff confirme que c'est la première option, la plus contraignante mais la plus sûre, qui a
été retenue : `FrameLoop` émet le jeton, `InputStore.endFrame(token)` l'exige. **Bon réflexe** —
c'est la version qui élimine vraiment le risque d'appel oublié ou dupliqué, pas seulement celle
qui le rend plus visible.

### Le dispatch des gestes est allé plus loin que prévu

L'audit (Pass 3, Finding 7) proposait un simple helper générique `#dispatch(hook, event, point)`
pour arrêter de copier-coller la boucle d'itération cinq fois. Le handoff décrit autre chose de
plus ambitieux : un `#dispatch(invoke)` qui **agrège les réponses de chaque geste et ne
court-circuite jamais**, combiné à un déplacement de la politique de capture (qui geste « gagne »
l'interaction) vers le routeur — ce qui, au passage, résout aussi un problème identifié séparément
dans l'audit (Pass 2, Finding 6 : `PanGesture.onStart` déclenchait un effet de bord DOM caché
derrière un simple changement d'état). **À vérifier** : le contrat exact de « agrégation sans
court-circuit » — si deux gestes revendiquent la même interaction, quel est le comportement
attendu ? Ce point mériterait une ligne de documentation dans le code lui-même, pas seulement
dans ce handoff.

### Le bornage du zoom : version spécifique plutôt que le helper générique proposé

L'audit (Pass 1, Finding 6) proposait un helper générique réutilisable,
`bounded(min, max)`, pensé pour n'importe quelle valeur à borner. Le handoff décrit une version
concrète et spécifique au zoom : `createZoomBounds` / `createZoomClamp`. C'est un choix pragmatique
et raisonnable — mais si un futur besoin de bornage apparaît ailleurs (une future
`PanBounds`, par exemple), on repartira probablement de zéro plutôt que de réutiliser un helper
générique qui n'a finalement pas été construit. À garder en tête, pas à corriger.

### Le fan-out des frames est devenu déterministe — un changement de comportement discret

L'audit (Pass 3, Finding 8) documentait un comportement existant, non intentionnellement
conçu : les abonnés de la boucle d'animation étaient itérés sur un `Set` vivant, ce qui veut dire
qu'un abonné ajouté en plein milieu d'une frame pouvait être appelé dans la même passe, et qu'un
abonné qui en désabonnait un autre pouvait le faire sauter. Le handoff indique que
`runFrameSubscribers()` itère désormais **une snapshot prise à l'entrée** — ce qui élimine ces deux
comportements. C'est très probablement une amélioration voulue, mais c'est aussi, techniquement,
un changement de comportement observable en interne (même si aucun call-site de production n'a eu
besoin d'être modifié). Si un module quelque part dépendait — même involontairement — du
comportement précédent (un abonné qui s'attendait à être notifié le même cycle qu'il s'inscrit),
ça vaut la peine de vérifier qu'aucun code de ce genre n'existe.

---

## 2. Findings de l'audit qui ne semblent pas couverts par la feuille de route

En croisant la liste des 25 findings avec les 8 tâches effectivement exécutées, deux findings de
la Pass 1 n'apparaissent dans aucune tâche de la feuille de route ni dans le détail du handoff.
**Ce n'est pas une accusation d'oubli** — ils étaient classés priorité 🟡 basse, donc peut-être
volontairement reportés — mais ça vaut la peine de le vérifier explicitement plutôt que de
supposer que « tout ce qui était dans l'audit a été traité ».

- **Pass 1, Finding 8** — `wheelDelta` mélange les unités de scroll du DOM (pixel / ligne / page
  selon le navigateur). La solution proposée (`WheelPixelDelta`, normalisée à l'ingestion dans
  `#onWheel`) n'est mentionnée nulle part dans les tâches #5 ou #7, qui sont pourtant les deux
  candidates naturelles. **À vérifier dans le code** : le zoom à la molette se comporte-t-il encore
  différemment selon le navigateur/les réglages de l'utilisateur ?
- **Pass 1, Finding 9** — la confusion pixels CSS / pixels physiques (HiDPI) n'a pas non plus de
  brand dédiée (`CssPoint` / `DevicePoint`) mentionnée dans le handoff. Si aucun code ne fait
  actuellement de calcul en pixels physiques, ce n'est peut-être pas urgent — mais c'est le genre
  de trou qui redevient invisible une fois qu'on a fini de refactorer, jusqu'au jour où quelqu'un
  ajoute du rendu HiDPI et retombe dans le même piège.

---

## 3. Gotchas à garder en tête (subtils, faciles à casser sans le vouloir)

Ce sont les points que le handoff a jugés assez importants pour être écrits noir sur blanc dans ses
« notes d'architecture ». Ils méritent d'être répétés ici parce que ce sont exactement le genre de
détails qu'un futur refactor — même bien intentionné — peut casser sans s'en rendre compte.

- **Le cast `as EventListener` dans les bindings table-driven n'est pas un raccourci sale, c'est un
  prix à payer.** Les handlers privés sont typés plus précisément que `EventListener` générique
  (un handler de `pointermove` sait qu'il reçoit un `PointerEvent`, pas juste un `Event`) — le
  cast est nécessaire pour uniformiser le tableau de bindings. Une alternative existait (un
  registre `Record<string, EventListener>`) mais elle est plus verbeuse sans être plus sûre. Ne
  pas essayer de « nettoyer » ce cast sans comprendre pourquoi il est là.
- **Un instantané (snapshot) de pointeur est créé une seule fois par notification, partagé entre
  tous les abonnés du même passage.** Il capture l'état **après** la mise à jour interne — pas
  avant. Deux notifications différentes produisent deux instantanés différents. Si un futur bug
  ressemble à « deux gestes voient des positions différentes pour le même événement », c'est ici
  qu'il faut regarder en premier — ça ne devrait normalement jamais arriver par construction, donc
  si ça arrive, quelque chose contourne le mécanisme.
- **Les vues publiques restent volontairement « live » pendant le dispatch**, contrairement aux
  instantanés. Un geste qui lit `event.input.pointerDelta` en plein traitement voit l'état courant,
  pas figé. C'est intentionnel (protéger contre les mutations *entre* frames, pas *pendant* le même
  événement) mais ça veut dire que la bibliothèque a maintenant deux régimes de lecture différents
  selon l'endroit où on se trouve dans le code — une source de confusion possible pour quiconque
  n'a pas lu cette note.
- **`AttachedHandle` existe mais n'est utilisé par aucune surface de production.** Les composants
  actuels appellent `destroy()` et ignorent le handle retourné par `attach()`. Ce n'est pas du code
  mort à supprimer — c'est une extension d'API prévue pour un futur cas d'usage (détacher/rattacher
  un canvas sans détruire le store). Un futur nettoyage de code qui verrait « un retour de fonction
  jamais utilisé » et le supprimerait romprait cette extensibilité sans bénéfice immédiat.
- **Impossible de tester les handlers privés directement** — ils sont des champs de classe, donc
  invisibles depuis l'extérieur. Tous les tests d'`InputStore` passent par un `FakeEventSource` qui
  simule les événements DOM. Quiconque ajoute un nouvel événement à écouter doit suivre ce même
  chemin de test, pas essayer d'accéder au handler directement.
- **L'ordre « programmer la prochaine frame avant d'exécuter les callbacks » dans la boucle
  d'animation est une garantie de survie déguisée en détail d'implémentation.** Si un callback
  lève une exception, la chaîne d'animation ne meurt pas parce qu'elle est déjà reprogrammée. Un
  œil non averti pourrait « nettoyer » cet ordre en le remettant dans l'ordre le plus intuitif
  (dispatcher d'abord, reprogrammer ensuite) et introduire silencieusement une mort-par-exception.
  Ce point était déjà signalé dans l'audit (Pass 3, Finding 8) — bon réflexe de l'avoir gardé lors
  de l'implémentation (voir aussi le point sur le fan-out déterministe ci-dessus, qui touche la
  même zone de code).

---

## 4. Ce qui était déjà sain — à ne pas retoucher par réflexe

L'audit a explicitement listé du code jugé déjà honnête ou déjà correctement isolé, précisément
pour qu'un futur passage de nettoyage ne le « corrige » pas inutilement :

- `Clock.update(rawDelta)` recevait déjà son delta de temps en paramètre explicite — aucune lecture
  cachée de l'horloge.
- `Camera.screenToWorld` / `worldToScreen` renvoyaient déjà des objets neufs (pas de mutation).
- `clamp` (la fonction de base, avant les brands) était déjà pure.
- `FrameLoop.#tick(now)` recevait déjà son timestamp en paramètre — seul `#start()` lisait
  l'horloge globale directement.
- Aucune trace de `Math.random()` ou `Date.now()` nulle part dans `core/`.
- `matchesButton` (dans `gestures.ts`) était déjà correctement extrait à son propre niveau
  d'abstraction.
- `#updatePointer` vs `#notifyPointer` (dans `InputStore.ts`) montrait déjà la bonne séparation —
  l'audit note explicitement qu'il « suffit d'appliquer le même traitement ailleurs », ce qui
  suggère que ce couple a servi de modèle pour le reste du refactor.

---

## 5. Le principe transversal qui résume tout

Les trois passes d'audit convergent, chacune à leur manière, vers la même observation de fond :

> **Valider tard, utiliser tôt** (le défaut) devient **valider une fois, à la frontière**
> (le remède). Les mauvaises valeurs entraient par des constructeurs permissifs et étaient
> défendues à chaque site de consommation (la triple vérification de durée dans `Clock`, la
> dépendance au bon vouloir de `clamp`). L'inversion — un point de validation unique, au moment de
> la construction — fait disparaître ces gardes dispersées tout en rendant les états invalides
> irreprésentables.

Et une deuxième ligne de partage, plus structurelle, traverse tout `core/` :

> Le dossier se divise en deux : le **calcul pur** (`Camera`, `clamp`, `Clock.update` une fois le
> delta fourni) qui n'avait besoin que du vocabulaire de types brandés (étape 1). Les
> **adaptateurs d'environnement** (`FrameLoop`, `InputStore`) qui cachaient leurs dépendances
> (horloge, programmateur, fenêtre, mise en page) derrière des méthodes impératives — le remède
> étant systématiquement le même : injecter les capacités au constructeur, avec des valeurs par
> défaut branchées sur le vrai navigateur, pour que la production ne change rien pendant que les
> tests peuvent tout substituer.

Si une seule idée doit survivre à ce document, c'est celle-là : ce refactor n'a pas ajouté de
fonctionnalités, il a déplacé le moment et l'endroit où les erreurs deviennent visibles — de
l'exécution (parfois silencieuse) vers la compilation (toujours bruyante).

---

## 6. Reste ouvert

- **Administratif** : deux fichiers non committés (`InputStore.test.ts`, `LifecycleReport.tsx`) —
  à clore avant de considérer le chantier vraiment terminé.
- **Les deux findings potentiellement non couverts** (section 2) — à trancher : volontairement
  reportés, ou oubliés ?
- **Axes suivants mentionnés par le handoff** : tests d'intégration bout-en-bout
  (surface → geste → caméra), et extension vers les modules hors `core/` (adaptateurs React,
  etc.) — non commencés, juste identifiés comme suite logique.
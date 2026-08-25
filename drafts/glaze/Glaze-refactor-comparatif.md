# État des lieux — Avant / Après

## En bref

| | Avant | Après |
|---|---|---|
| Problèmes recensés | 25 (10 + 7 + 8, sur 3 passes d'audit) | — |
| Fichiers touchés | 7 fichiers de `core/` | 7 fichiers refactorés, 1 nouveau (`types.ts`) |
| Tests | existants, non comptés dans l'audit | 127/127 verts (dont 34 nouveaux pour `InputStore`) |
| Vérifications | — | types ✓ / lint ✓ / tests ✓ / monorepo entier ✓ |
| Comportement visible pour l'utilisateur final | — | **inchangé** (aucun call-site de production modifié) |
| Reste à faire | — | committer 2 fichiers en attente ; suite possible : tests d'intégration, adaptateurs React |

---

## Le comparatif, module par module

| Module | Avant | Après |
|---|---|---|
| **`types.ts`** *(nouveau)* | Les grandeurs sensibles (zoom, durée, vitesse, temps) étaient de simples `number`, sans distinction. | Chaque grandeur a son identité propre (zoom, durée, vitesse, secondes, millisecondes) et ne peut être créée que valide. |
| **`Camera.ts`** | Un zoom à 0 ou négatif se construisait sans broncher → divisions par zéro possibles. Position écran et position monde utilisaient le même type générique, interchangeables par erreur. | Le zoom invalide ne compile plus. Écran et monde sont deux types distincts : les confondre devient une erreur de compilation. Le bornage (clamp) ne laisse plus passer NaN ni les bornes inversées. |
| **`Clock.ts`** | Une seule fonction gérait 4 façons différentes de faire avancer le temps (libre, aller-retour, boucle, une fois), sur ~58 lignes mêlées. Une durée négative était silencieusement réinterprétée comme « pas de durée ». Des combinaisons d'options absurdes passaient sans avertissement. | Les 4 stratégies sont des fonctions séparées, testables indépendamment. La configuration est désormais une union claire : une durée invalide est rejetée à la construction, pas réinterprétée. |
| **`CameraControls.ts`** | Chaque méthode modifiait directement l'objet caméra partagé (mutation invisible). Une méthode (`update`) contournait complètement le bornage du zoom. | Les fonctions produisent une nouvelle caméra à chaque appel au lieu de modifier l'ancienne — traçable, testable sans mise en scène. Le bornage du zoom s'applique désormais partout, sans exception. |
| **`gestures.ts`** | La vitesse de la molette pouvait être nulle, négative ou invalide (zoom mort ou inversé sans prévenir). La logique de répartition des événements vers les gestes était copiée-collée cinq fois. | La vitesse de molette est validée à la création. Toute la répartition passe par un seul point commun — ajouter un nouveau type d'événement coûte une ligne, plus cinq. |
| **`FrameLoop.ts`** | L'horloge (`performance.now`) et le programmateur d'images (`requestAnimationFrame`) étaient appelés en dur à l'intérieur du module — impossible à tester sans un vrai navigateur. | L'horloge et le programmateur sont fournis de l'extérieur (avec les valeurs par défaut habituelles conservées) — testable hors navigateur, aucun changement pour le code de production existant. |
| **`InputStore.ts`** | Position/déplacement de la souris transmis comme références partagées, mutées en continu — un composant qui gardait un point en mémoire le voyait bouger tout seul. L'attache/détache du canvas dépendait de trois vérifications répétées à la main. Seize appels quasi identiques pour brancher/débrancher les événements DOM. | Les abonnés reçoivent des instantanés figés au moment de la notification. L'attache/détache passe par un jeton unique. Les seize appels sont devenus deux boucles pilotées par une table de correspondance. |
| **`InputRouter`** *(dans `gestures.ts`)* | La logique de composition finale dépendait de la répartition dupliquée cinq fois (voir `gestures.ts`). | Bénéficie directement du point de répartition unique ; aucun travail supplémentaire nécessaire — la réparation en amont suffit. |

---

## Ce qui n'a *pas* changé (et c'est voulu)

- **Aucun call-site de production modifié** pour l'injection de l'horloge et du programmateur d'images dans `FrameLoop` : les valeurs par défaut reproduisent le comportement existant.
- **Le comportement observable reste identique** — ce refactor est une réécriture interne, pas une nouvelle fonctionnalité.
- **Quelques zones déjà saines ont été identifiées et volontairement laissées telles quelles** : `Clock.update()` recevait déjà son delta de temps explicitement (pas de lecture cachée de l'horloge), `Camera.screenToWorld`/`worldToScreen` renvoyaient déjà des objets neufs, `clamp` était déjà pur, et `matchesButton` (dans `gestures.ts`) était déjà correctement isolé à son propre niveau.

---

*Pour le détail complet de chaque problème (ligne de code, raisonnement, impact) et pour les points d'attention à garder en tête pour la suite, voir la review critique (phase suivante).*
# L'histoire du refactor de `glaze`

## Le point de départ

`glaze` est une petite bibliothèque graphique maison, au cœur d'un « cahier d'exercices » de mini-applications. Elle s'occupe des choses de base : où se trouve la caméra, comment le temps s'écoule, comment on capte les clics et les gestes de la souris. Rien d'exotique, mais du code qui doit rester juste, frame après frame, sans jamais faire n'importe quoi.

Le déclic est venu d'un texte de référence — un manifeste — posant trois idées simples sur la façon d'écrire ce genre de code pour qu'il reste fiable dans la durée.

## Trois idées simples, avant tout

**Première idée : séparer le calcul du bazar extérieur.** Une fonction qui calcule une position ne devrait jamais aller lire l'horloge de l'ordinateur ou piocher un nombre au hasard toute seule dans son coin. Elle doit recevoir tout ce dont elle a besoin en entrée (le temps écoulé, la position de la souris, etc.) et rendre un résultat, point. Tout ce qui est « sale » — lire l'heure, écouter le clavier, dessiner à l'écran — doit être repoussé tout en haut, à la lisière entre le programme et le monde réel. Ainsi, le cœur du calcul reste prévisible et testable : mêmes entrées, mêmes sorties, toujours.

**Deuxième idée : rendre les erreurs impossibles à écrire, plutôt que de les vérifier après coup.** Beaucoup de bugs viennent de valeurs qui n'auraient jamais dû exister : un zoom à zéro, une durée négative, une vitesse de molette nulle. La méthode classique consiste à vérifier ces cas un peu partout dans le code (« si le zoom est nul, ne pas diviser »). L'idée ici est inverse : empêcher ces valeurs invalides de se construire dès le départ, une fois pour toutes, à l'endroit où elles naissent. Une fois validées, elles portent une étiquette qui garantit qu'elles sont saines partout où elles circulent — plus besoin de revérifier.

**Troisième idée : ne pas mélanger les niveaux de détail dans une même fonction.** Une fonction qui orchestre une scène ne devrait pas, au milieu de son code, se mettre à faire de la manipulation de tableaux ou des appels bas niveau au dessin. Chaque fonction doit rester à un seul niveau d'abstraction : soit elle orchestre, soit elle calcule, soit elle dessine — jamais les trois à la fois.

## L'état des lieux

Avant de toucher au moindre fichier, un audit complet du cœur de la bibliothèque a été mené, en trois temps, chacun braqué sur une des trois idées ci-dessus.

Le premier passage a cherché toutes les valeurs numériques qui pouvaient, en théorie, prendre une valeur absurde sans que rien ne s'en offusque : un zoom à zéro qui provoque une division par l'infini, une durée négative qui se fait silencieusement réinterpréter comme « pas de durée », une vitesse de molette qui inverse le sens du zoom sans prévenir, un delta de temps en millisecondes glissé par erreur là où on attendait des secondes. Dix problèmes de ce genre ont été recensés.

Le deuxième passage a traqué les endroits où le code cachait des dépendances au monde extérieur sans le dire : une horloge lue en douce, un minuteur de navigateur codé en dur, des objets partagés qui changent sous les pieds de qui les utilise, une position de fenêtre relue à chaque mouvement de souris alors qu'elle aurait pu être mise en cache. Sept cas de ce genre ont été trouvés — avec, à la décharge du code existant, plusieurs endroits déjà honnêtes qu'il fallait surtout préserver.

Le troisième passage s'est penché sur l'ordre des choses et le mélange des niveaux : une fonction qui gérait à elle seule quatre façons différentes de faire avancer le temps, un engagement du type « il faut appeler cette fonction une fois par frame, pas plus, pas moins » qui ne reposait que sur un commentaire, une fuite d'état possible si le composant disparaissait en plein geste de la souris. Huit cas relevés.

Au total : vingt-cinq points faibles précisément localisés, chacun avec son remède proposé — mais, à ce stade, rien n'avait encore été changé dans le code.

## Le chantier

Restait à transformer ce diagnostic en travail concret. Plutôt que de tout attaquer en même temps, le choix a été de procéder de bas en haut : d'abord les fondations qui ne dépendent de rien, puis les couches qui s'appuient dessus, et les pièces qui orchestrent tout le reste en dernier. Huit étapes ont été définies dans cet ordre, chacune vérifiée (compilation, style de code, tests) avant de passer à la suivante.

On a commencé par donner un nom et une garantie à chaque grandeur numérique sensible (un facteur de zoom, une durée, une vitesse), de façon à ce qu'une valeur invalide ne puisse tout simplement plus être construite. Puis on a nettoyé les calculs de la caméra elle-même — distinguer clairement une position à l'écran d'une position dans le monde, réparer un système de bornage qui laissait passer des valeurs aberrantes. Ensuite, l'horloge : les quatre façons de faire avancer le temps ont été séparées en fonctions indépendantes, chacune testable seule. Les commandes de la caméra sont devenues des transformations pures — on ne modifie plus un objet caméra en cachette, on en produit un nouveau à chaque fois, ce qui rend chaque changement traçable. La gestion des gestes (glisser, zoomer) a été simplifiée pour que toute la logique de répartition des événements passe par un seul point, au lieu d'être recopiée cinq fois. La boucle d'animation a appris à recevoir l'horloge et le programmateur d'images depuis l'extérieur plutôt que d'aller les chercher elle-même, ce qui la rend testable sans dépendre du vrai navigateur. Le module qui écoute le clavier et la souris a reçu le même traitement, avec en prime des instantanés figés transmis aux abonnés — pour qu'un composant qui garde en mémoire « la position au moment du clic » ne se retrouve plus avec une valeur qui bouge toute seule sous lui. Enfin, la pièce qui orchestre tout — le routeur d'entrées — s'est retrouvée essentiellement déjà en ordre grâce au travail fait sur les gestes.

## Où on en est

Les huit étapes sont terminées. Les vérifications automatiques passent toutes au vert : cent vingt-sept tests, la vérification des types, le style de code, et l'ensemble du reste du projet qui dépend de cette bibliothèque. Il reste deux fichiers non enregistrés dans l'historique (un nouveau fichier de tests, et une mise à jour mineure d'un rapport) — un détail d'administration plus qu'un reste de travail.

Le changement de fond n'est pas visible d'un coup d'œil sur l'interface : la bibliothèque se comporte exactement pareil de l'extérieur. Ce qui a changé, c'est la marge d'erreur pour l'avenir. Avant, un certain nombre de bugs n'étaient évités que parce que personne n'avait encore fait l'erreur qui les aurait déclenchés — passer un zoom à zéro, mélanger des secondes et des millisecondes, oublier d'appeler la bonne fonction au bon moment. Après, ces erreurs-là ne peuvent simplement plus s'écrire : le code refuse de compiler avant même d'être exécuté. Ce qui restait implicite — des conventions, des commentaires, des ordres d'appel qu'il fallait deviner — est désormais écrit noir sur blanc dans la façon même dont les fonctions s'assemblent.
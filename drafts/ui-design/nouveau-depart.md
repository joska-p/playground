# Brief de redesign — Playground / Cahier d’exercices

## Intention

Redesigner Playground, aussi appelé le Cahier d’exercices, comme un hub interne de récréatif coding, d’expérimentation algorithmique et de création visuelle interactive.

Ce site n’est pas une vitrine destinée à des visiteurs. C’est un espace de travail personnel qui doit permettre de parcourir rapidement des expérimentations et d’ouvrir directement un projet.

## Principe produit

- Pas de hero section marketing.
- Pas de storytelling, de testimonials, de pricing ou de contenu décoratif.
- Une landing page courte, fonctionnelle et dense.
- Des cartes qui représentent les expérimentations et pointent vers leur page projet.
- Le site doit donner l’impression d’un atelier vivant, pas d’un produit SaaS.

## Direction visuelle

Adopter une esthétique de laboratoire technique, entre Gruvbox Dark, terminal créatif et interface cyberpunk discrète.

### Palette

Limiter l’interface à une palette cohérente de 3 à 5 couleurs :

- Fond principal : brun-noir profond inspiré de Gruvbox.
- Surfaces : brun anthracite légèrement translucide.
- Texte principal : beige chaud à contraste élevé.
- Accent primaire : orange brûlé / ambre.
- Accent secondaire : vert néon réservé aux états actifs, au focus et aux détails interactifs.

Éviter les gradients violets, les couleurs pastel et les effets lumineux gratuits. Les accents doivent servir à hiérarchiser l’information.

### Matières et effets

- Utiliser des panneaux semi-transparents avec `backdrop-blur`.
- Ajouter des bordures fines et peu contrastées.
- Employer des halos néon très subtils autour des éléments actifs.
- Utiliser des grilles, coordonnées, petits labels techniques et micro-indicateurs comme langage visuel.
- Ne pas ajouter de blobs, de formes abstraites ou d’ornements sans fonction.

### Typographie

- Une police sans-serif lisible pour les titres et le texte.
- Une police monospace pour les métadonnées, états, seeds, valeurs et labels techniques.
- Maximum deux familles de caractères.
- Les textes doivent rester lisibles, avec une hiérarchie claire malgré la densité visuelle.

## Landing page

La page d’accueil doit fonctionner comme un index de projets :

- En-tête compact avec le nom Playground, un court statut et éventuellement le nombre d’expériences.
- Navigation minimale, sans menu marketing.
- Grille responsive de cartes d’expérimentations.
- Chaque carte affiche : titre, catégorie, statut, courte description, date ou version, et aperçu visuel.
- Les cartes doivent être cliquables et mener directement à la page du projet.
- Les previews peuvent montrer des patterns, particules, grilles, formes génératives ou mini-canvas.
- L’ensemble doit rester scannable et compact.

## Échantillons UI à présenter

Prévoir plusieurs variantes visibles ou sélectionnables afin de comparer des directions :

1. **Gruvbox Lab** — interface chaude, terminale et structurée.
2. **Neon Control** — contraste sombre, accents cyan/vert/orange et détails cyberpunk.
3. **Organic Algorithms** — même structure technique, mais avec des previews plus organiques et génératives.

Les variantes doivent modifier principalement l’accent, les previews et quelques détails de surface, sans changer la structure de navigation.

## Pages projet et canvas

Les applications canvas doivent maximiser l’espace de création.

- Le canvas occupe la majorité de la fenêtre.
- Le panneau de contrôle est secondaire et peut être masqué.
- Le panneau doit être togglable avec un bouton toujours identifiable.
- Sur desktop, il peut être docké sur le côté.
- Sur mobile, il doit devenir un drawer ou une feuille escamotable.
- La fermeture du panneau ne doit jamais redimensionner brutalement ou masquer le canvas.
- Prévoir un état compact avec uniquement les contrôles essentiels.

## Contrôles à illustrer

Le panneau peut contenir des exemples de contrôles génériques :

- Seed numérique ou bouton de randomisation.
- Densité, quantité, vitesse ou amplitude.
- Sélecteur de palette.
- Boutons Play / Pause et Reset.
- Export ou capture.
- Indicateur d’état : running, paused, ready.

Ces contrôles doivent ressembler à des outils d’atelier, pas à un formulaire administratif.

## Responsive design

Concevoir mobile-first :

- La grille de projets passe progressivement de plusieurs colonnes à une colonne.
- L’en-tête reste compact.
- Les cartes conservent leur aperçu visuel sans devenir trop hautes.
- Le canvas reste prioritaire sur toutes les tailles.
- Le panneau de contrôle passe d’un dock latéral à un drawer inférieur ou latéral.
- Les boutons importants doivent rester accessibles au pouce et respecter les standards d’accessibilité.

## Ton rédactionnel

Utiliser un vocabulaire court, direct et légèrement technique :

- expérimentation
- canvas
- seed
- palette
- density
- running
- paused
- ready
- draft
- stable

Éviter les formulations marketing comme « révolutionnaire », « découvrez », « la nouvelle génération » ou « conçu pour vous ».

## Critères de réussite

Le redesign est réussi si :

- l’utilisateur comprend immédiatement qu’il s’agit d’un index d’expérimentations ;
- aucune section ne semble être là uniquement pour remplir l’espace ;
- les projets sont visibles et accessibles en quelques secondes ;
- l’interface a une identité forte Gruvbox / laboratoire / cyberpunk ;
- les previews donnent envie d’ouvrir les projets sans détourner l’attention ;
- le canvas reste toujours la priorité dans les applications pleine page ;
- le panneau de contrôle est utile, discret et facile à masquer ;
- le rendu fonctionne aussi bien sur desktop que sur mobile.

## Instruction finale pour l’agent

Ne construis pas une landing page marketing classique. Construis un atelier personnel dense, lisible et expérimental : un index de projets avec des cartes visuelles, puis des interfaces de canvas où les contrôles s’effacent pour laisser toute la place à la création.
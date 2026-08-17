Ce rapport confirme exactement notre diagnostic. Ton architecture a grandi organiquement, ce qui est typique des projets de type « laboratoire créatif », mais elle a maintenant besoin de rigueur pour atteindre ce vernissage esthétique.

### 1. Extraction des informations clés & Lien avec notre vision

Le rapport met en évidence plusieurs axes de travail qui valident notre approche « art algorithmique » et « chaos structuré » :

* **L'interface est un laboratoire de contrôle :** Les composants les plus utilisés après le `Button` sont la famille `ControlGrid / ControlSection / ControlPanel` (58 importeurs). Cela colle parfaitement à l'esthétique d'une interface de *creative coding* dense.


* **Poids mort à purger :** Environ 25 composants (Dialog, Carousel, Sidebar, Popover, etc.) ne vivent que dans Storybook et polluent la base. Leur suppression laissera la place à des primitives plus brutes et affirmées.


* **Dette visuelle hors-thème :** Le rapport pointe 31 classes utilisant la palette Tailwind par défaut (slate, teal, amber) et 8 couleurs en dur (`black`/`white`), cassant ton système OKLCH.


* **Le traitement du « Glow » et des accents :** Le rapport signale 20 occurrences de classes arbitraires basées sur `var(--glow-color)` ou `var(--variant-color)` (dont ta `SciFiCard`) et des valeurs OKLCH copiées-collées. C'est exactement ce que nous avons commencé à normaliser avec l'attribut `accentColor` de la carte.


* **Bugs de génération et typos :** Le template Turbo génère des imports cassés (`CardFooter` n'existe pas), et la navigation Astro contient des erreurs CSS critiques (`var(--primar)`, `hover:text--glow-color`).



---

### 2. Spécifications techniques du projet de refonte (Architecture & Contrat de Design)

Ces spécifications cadrent le polissage du monorepo sans toucher au code métier.

**Phase A : Purge et Sécurisation de l'existant**

* **Élimination du code mort :** Suppression stricte des 25 composants et hooks (`useToast`, `SidebarMain`, `Dialog`, etc.) identifiés comme n'ayant aucun importeur externe hors Storybook.


* **Correction de l'outillage :** Réparation immédiate du template de génération Turbo (correction des chemins d'import et suppression des références à `CardFooter`).


* **Fixes ciblés :** Résolution des typos CSS dans `NavLinks.astro` (`--primary`).



**Phase B : Normalisation du Contrat de Tokens (Le Vernissage)**

* **Bannissement de la palette Tailwind par défaut :** Interdiction stricte (via linter ou agent) des classes `slate-*`, `teal-*`, `amber-*`, etc.. Tout doit être mappé sur le triptyque de la nouvelle vision : `surface` (toile), `foreground` (encre/trame), et variables sémantiques `primary`/`secondary`/`accent` (pigments).


* **Création de tokens manquants :** Remplacement des `bg-black/70` et `text-white` (utilisés pour les overlays de canvas) par des tokens officiels dédiés (ex: `--color-canvas-overlay`, `--color-canvas-text`) basés sur l'échelle OKLCH.


* **Standardisation des effets globaux :** Transformation des valeurs OKLCH en dur et des appels arbitraires `[var(--glow-color)]` ou `drop-shadow` en utilitaires Tailwind propres intégrés au plugin CSS (ex: `shadow-glow`, `text-glow`).



**Phase C : Alignement des Primitives UI**

* **Refonte Typographique :** Application d'une grille typographique stricte (`font-mono`, uppercase, tailles de police normalisées) sur la famille `ControlPanel` et `Card` pour affirmer le style brutaliste algorithmique.
* **Contrat d'injection de couleur :** Implémentation du système `accentColor` validé sur `SciFiCard` à l'ensemble des composants nécessitant une variation dynamique, en garantissant que seules les teintes OKLCH autorisées soient injectées.

---

### 3. Stratégie d'exécution pour l'agent (Boucle de Rétroaction)

Pour éviter que l'agent ne casse le site ou ne réintroduise des classes Tailwind par défaut, il faut une exécution itérative documentée.

**Concept de la Feedback Loop :** L'agent doit maintenir un fichier `ARCHITECTURE_DECISIONS.md` (ou `LEARNINGS.md`) à la racine. À chaque fin de tâche, il y consigne le mapping de couleur remplacé ou le composant supprimé. Lors du prompt suivant, il relit ce fichier pour conserver le contexte.

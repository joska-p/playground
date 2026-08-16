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

Voici le prompt à fournir à ton agent pour lancer l'exécution :

```text
Tu es chargé d'exécuter la refonte UI du monorepo étape par étape, en respectant un style "Creative Coding / Brutaliste" basé sur un thème OKLCH strict.

---
RÈGLES D'EXECUTION STRICTES :

1. GESTION DU RECOUVREMENT & HANDOFF (Handover Protocol) :
   - À la fin de chaque lot de travail validé, ou dès que tu estimes que la session accumule trop de contexte/historique, tu dois créer/mettre à jour un fichier `HANDOFF.md` à la racine du monorepo. Il y a un template ./drafts/ui-design/HANDOFF-template.md.
   - Ce fichier doit résumer : les tâches accomplies, le statut du build, les apprentissages d'architecture, les tests/code temporairement contournés, et l'instruction précise pour démarrer la session suivante.
   - Si tu juges qu'il est temps de rafraîchir le contexte, termine ta réponse par : "🛑 RECOMMANDATION : Ouvre une nouvelle session et relance-moi en me disant de lire HANDOFF.md."

2. PRAGMATISME & NO SINKHOLE RULE (Anti-Acharne) :
   - Ne passe PAS de temps à réparer du code ou des tests sur des composants/packages voués à être refactorisés ou supprimés sous peu.
   - Si un test échoue ou qu'un composant obsolète bloque le build suite à une modification, ne passe pas plus de 2 essais dessus : commente le test ou le bout de code avec un `// TODO(refactor-ui): bypass temporary`, documente-le dans `HANDOFF.md`, et passe à la suite.

---
MISSION ACTUELLE : Phase 1 — Purge, Fixes & Handoff Setup

1. Supprime physiquement les ~25 composants UI et hooks listés comme "dead weight" dans ton rapport (Dialog, Carousel, Popover, Sidebar, useToast, etc.) ainsi que leurs stories associées.
2. Répare le fichier template `turbo/generators/templates/new-package/src/components/Demo.tsx` en corrigeant les imports de Card et en supprimant `CardFooter`.
3. Corrige les deux typos dans `apps/playground/src/layouts/nav-bar/NavLinks.astro` (`--primar` devient `--primary` et `hover:text--glow-color` doit utiliser la syntaxe utilitaire Tailwind correcte).
4. Corrige `Switch.tsx` en remplaçant `text-white` par `text-primary-foreground`.

VALIDATION & HANDOFF :
- Lance le typecheck ou build global pour t'assurer qu'aucun import essentiel n'est cassé. Si des packages obsolètes cassent, applique la "No Sinkhole Rule".
- Crée le fichier `HANDOFF.md` à la racine avec le bilan de la Phase 1 et les instructions pour la Phase 2 (Migration des couleurs Tailwind hors-thème).

``` 
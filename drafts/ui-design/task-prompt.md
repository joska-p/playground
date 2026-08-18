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
je ne sais plus on en était de cette refont. est ce que tu peux me faire un point ?
MISSION ACTUELLE? / PRECEDENTE? : Phase 1 — Purge, Fixes & Handoff Setup

1. Supprime physiquement les ~25 composants UI et hooks listés comme "dead weight" dans ton rapport (Dialog, Carousel, Popover, Sidebar, useToast, etc.) ainsi que leurs stories associées.
2. Répare le fichier template `turbo/generators/templates/new-package/src/components/Demo.tsx` en corrigeant les imports de Card et en supprimant `CardFooter`.
3. Corrige les deux typos dans `apps/playground/src/layouts/nav-bar/NavLinks.astro` (`--primar` devient `--primary` et `hover:text--glow-color` doit utiliser la syntaxe utilitaire Tailwind correcte).
4. Corrige `Switch.tsx` en remplaçant `text-white` par `text-primary-foreground`.

VALIDATION & HANDOFF :
- Lance le typecheck ou build global pour t'assurer qu'aucun import essentiel n'est cassé. Si des packages obsolètes cassent, applique la "No Sinkhole Rule".
- Crée le fichier `HANDOFF.md` à la racine avec le bilan de la Phase 1 et les instructions pour la Phase 2 (Migration des couleurs Tailwind hors-thème).

CONTEXT DETAILLE: 
- Le fichier '/workspaces/playground/drafts/ui-design/ui-library-usage-report.md'.
- Le fichier '/workspaces/playground/drafts/ui-design/ui-library-usage-report-review.md'.

je ne sais plus on en était de cette refont. est ce que tu peux me faire un point ?
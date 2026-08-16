# Compte rendu — structurer la knowledge base (recreational programming)

## Contexte

- ~100 fichiers `.md` accumulés au fil de sessions de code récréatif dans un monorepo, publiés aussi sur un site perso (non indexé, GitHub Pages + Vercel).
- Contenu hétérogène : règles apprises, pièges (gotchas), idées non résolues, questions ouvertes, bruit de session pur.
- Objectif : que cette masse serve à la fois de mémoire pour un agent de code ET de base de référence pour toi — "on parle le même langage".
- Contrainte forte, répétée plusieurs fois dans l'échange : **ne pas te pousser dans une direction**. Ce compte rendu documente ce qui a été discuté, pas ce qui est décidé.

## Ce qu'on a établi (constats, pas des choix imposés)

**1. Le problème n'est pas la quantité, c'est le grain.**
En découpant `art-canvas-seeded-random.md` (1 fichier de session), on trouve ~14 unités de savoir indépendantes noyées ensemble (règles de commentaires, pipeline OKLCH, pièges GLSL, PRNG, etc.), contre 2 autres fichiers uploadés qui étaient déjà des unités atomiques. Extrapolé sur 100 fichiers, la vraie taille de la base est probablement 200-400 unités.

**2. Le SSOT, c'est le fichier `.md` lui-même — rien d'autre.**
Pas de base de données séparée où dupliquer l'info. Tout ce qui peut être recalculé (index, résumé, catalogue) doit être régénérable à tout moment et jamais édité à la main.

**3. Le passage "fichier de session" → "notes atomiques" est un travail mécanique, pas une réécriture.**
Démontré en pratique sur les 3 fichiers fournis : 16 notes atomiques + un index régénéré ont été produits sans reformuler le fond — juste extraction, découpage, étiquetage. C'est le genre de tâche répétitive qu'un agent peut faire par lot, avec relecture humaine ensuite (le tri en amont — garder / découper / jeter — reste, lui, un vrai travail de jugement que tu veux faire toi-même, *avant* toute extraction).

**4. Tension soulevée sur le schéma (non résolue, volontairement) :**
- Un champ `type` en liste fermée (`rule | gotcha | pattern | ...`) est confortable au début mais rigide dans la durée — un système de tags libres, qui s'affine avec l'usage, a été proposé comme alternative plus souple. **Pas tranché.**
- Un champ `source` pointant vers le fichier de session d'origine devient une référence morte une fois ce fichier supprimé, et duplique ce que l'historique git donne déjà gratuitement (`git log`, `git blame`). **Pas tranché.**
- Champs `when` / `do` / `dont` (présents seulement si pertinents) pour rendre une note directement actionnable par un agent — piste jugée utile, pas formellement adoptée.

**5. Séparer le contenu du design.**
Tant que le frontmatter reste des *faits sur le contenu* (tags, statut, action) et jamais des instructions de style, le contenu markdown reste indépendant de tout layout — changer le rendu du site plus tard ne touche à aucun fichier de contenu, ça reste un problème "toi seul dans ton éditeur", pas besoin de repasser par un agent.

## Ordre des étapes tel qu'exprimé

1. **Trier** les 100 fichiers (garder / découper / jeter / idée en suspens) — étape de jugement humain, en amont de tout le reste.
2. Affiner le schéma des notes atomiques (encore ouvert).
3. Extraire/découper en notes atomiques (mécanique, assistable par agent).
4. Index régénérable + éventuellement un renderer séparé pour le site public.

## Exemple produit pendant l'échange

Dossier `knowledge/` avec 16 fichiers atomiques + `_index.md` généré, à partir des 3 fichiers sources fournis. À prendre comme *démonstration du procédé*, pas comme schéma final — le format du frontmatter y est encore la version "avec `type` et `source`" débattue plus haut, pas la version allégée évoquée ensuite.

## Pistes trouvées ailleurs (tu n'es pas le premier)

Trois familles d'outils/méthodes recoupent presque exactement ce que tu es en train d'inventer :

**Méthode Zettelkasten** (Niklas Luhmann, des décennies avant les ordinateurs) — le principe central est une note = une idée atomique, avec un identifiant stable, reliée à d'autres notes par des liens explicites. Le critère qualité classique ("règle du 1-1-1") : une note doit porter une seule affirmation, nommer sa source, et pointer vers une idée voisine. C'est essentiellement la logique qu'on a appliquée à la main sur tes 3 fichiers.
→ https://en.wikipedia.org/wiki/Zettelkasten

**Conventions markdown pour agents** (`AGENTS.md`, `llms.txt`, et plus récemment le format `OKF` de Google) — un mouvement récent et actif autour de "markdown + frontmatter minimal comme format que humains et agents lisent tous les deux, sans traduction". Le format OKF en particulier n'impose qu'un seul champ obligatoire (`type`) et laisse le reste libre, avec des tags optionnels — assez proche de la tension que tu as soulevée sur le "type" rigide vs les tags. Le fil GitHub sur les conventions de fichiers de contexte agent documente bien tout cet écosystème émergent.
→ https://llmstxt.org/
→ https://gist.github.com/0xdevalias/f40bc5a6f84c4c5ad862e314894b2fa6

**Digital gardens / outils Zettelkasten numériques** (Obsidian, Foam, Dendron, Quartz) — exactement le couple "fichiers markdown + frontmatter comme SSOT" + "générateur de site séparé pour le rendu public", qui répond directement à ta crainte de coupler contenu et layout. Quartz en particulier est un générateur de site statique open-source pensé pour transformer un dossier de notes markdown (à la Obsidian) en site public, découplé du contenu — et plusieurs personnes l'utilisent précisément pour publier un sous-ensemble public d'une base de notes privée plus large, via des tags de sélection à la publication. Foam et Dendron font la même chose côté VS Code plutôt que côté site public : wikilinks, backlinks, tags, tout en gardant les fichiers comme simple markdown sur disque.
→ https://quartz.jzhao.xyz/
→ https://foambubble.github.io/foam/

Aucun de ces outils ne "résout" ta situation clé en main (tu codes seul, contenu très technique/mixte code+prose+GLSL), mais ils valident les intuitions qui sont ressorties de la conversation : atomicité, tags plutôt que taxonomie rigide, fichiers comme SSOT, rendu découplé.
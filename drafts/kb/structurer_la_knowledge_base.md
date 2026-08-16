# Projet — structurer la knowledge base de code récréatif

Document de synthèse, regroupant le compte rendu initial et les clarifications apportées ensuite. Sert de référence pour reprendre le travail.

---

## 1. Contexte

- ~100 fichiers `.md` accumulés au fil de sessions de code récréatif dans un monorepo, publiés aussi sur un site perso (non indexé, GitHub Pages + Vercel).
- Contenu hétérogène et mélangé : règles apprises, pièges (gotchas), idées non résolues, bugs à corriger, features à apporter, bouts de code concrets, observations sur ses propres habitudes de code, bruit de session pur.
- Constat de départ : le problème n'est pas la quantité mais le grain — un seul fichier de session peut contenir ~14 unités de savoir indépendantes noyées ensemble. Extrapolé sur 100 fichiers, la vraie taille de la base est probablement 200-400 unités.
- Une bonne partie du contenu (~3/4 selon l'estimation) sera probablement inutile une fois trié ; il y a aussi des bugs et des inconsistances mélangés dans les notes.

## 2. Objectif du projet (clarifié)

**La knowledge base est pour moi**, pas pour un agent de code qui la consommerait en contexte. L'audience et le mode de consultation sont donc humains : recherche active, proximité au code, relecture périodique.

**Ce n'est pas un produit fini en soi.** C'est une **matière première brute** d'où sortent plusieurs produits différents, selon comment chaque item est trié :

- Un ensemble de **règles / do's and don'ts** — consulté pendant qu'on code, pour ne pas refaire les mêmes erreurs.
- Des **cartes kanban** — idées à explorer, features à apporter, avec un cycle de vie (à faire → fait).
- Des **issues GitHub** — bugs à corriger, liés à du code précis.
- Un **rapport d'audit de style** — pas un endroit où ranger des items un par un, mais une synthèse produite en lisant à travers l'ensemble : est-ce que le style de code naturel se heurte aux conventions déclarées.
- Une **bibliothèque de snippets** — bouts de code concrets et réutilisables, ou explications utiles seulement collées à leur contexte.

Chaque destination a son propre outil et son propre format ; il n'y a pas de schéma unique à faire tenir pour tout.

## 3. Principe de tri

Deux axes indépendants, à ne jamais confondre :

- **Nature** de l'item (bug, règle, idée, feature, observation, snippet…) → détermine la **destination**.
- **Sujet** (mandelbrot, GLSL, pipeline couleur, PRNG…) → une **étiquette** qui voyage avec l'item, indépendamment de sa destination.

("Bug sur mandelbrot" n'est pas un choix entre deux cases rivales : destination = bug, étiquette = `mandelbrot`.)

## 4. Méthode de traitement

- Traitement **fichier par fichier**, pas tout d'un coup — le premier fichier sert de test du processus autant que de tri réel.
- Un **arbre de décision basé sur des questions de nature**, pas une liste fermée de destinations — reste extensible sans refonte à chaque nouvelle idée de destination (il y en aura probablement d'autres à venir).
- **Feedback loop inter-session** (pas de l'entraînement du modèle — la mémoire vit dans un fichier explicite, relu par l'agent à chaque passage) :
  - L'agent traite un fichier, accumule ses cas ambigus.
  - Il te les soumet **groupés**, à la fin du fichier plutôt qu'item par item en direct.
  - Quand tu tranches un cas, l'agent reformule ta réponse en **règle générale**, te la soumet, et si tu valides, l'ajoute à un fichier de décisions qui grossit passage après passage.
  - Ce fichier de décisions doit rester lisible et relisible par toi de temps en temps (pas de dérive silencieuse d'une règle mal généralisée).

## 5. Arbre de décision

### Principe de base

Si un item ne rentre dans aucune branche de façon évidente → **`non-classé`**, avec une note courte sur pourquoi ça coince. Ne jamais forcer un item dans la case la plus proche juste pour éviter `non-classé`.

### Étape 0 — Extraction

Extraire l'item tel quel, identifier son sujet (tag), repérer sa formulation d'origine. Si c'est du pur bruit de session (aucune affirmation, aucune tâche, aucun bout de code réutilisable) → jeter, ne pas router.

### Q1 — Quelle est la nature fondamentale de l'item ?

- **Une action à faire** → Q2
- **Un fait/une affirmation sur le code** (savoir, pas une tâche) → Q4
- **Un fait sur toi** (habitude, tic récurrent, écart entre convention déclarée et pratique réelle) → **rapport d'audit / observations de style**
- **Un bout de code concret, sans affirmation autour** → **snippet**

### Q2 — (action à faire) Le comportement actuel est-il cassé, ou l'action ajoute-t-elle quelque chose qui n'existe pas encore ?

- **Cassé / incorrect** → Q3
- **N'existe pas encore** → Q2b

**Q2b — Sais-tu déjà quoi coder si tu commençais demain ?**
- **Oui, intention claire** → **feature** (kanban actif)
- **Non, encore à évaluer** → **idée en attente** (backlog séparé, pas le kanban actif)

### Q3 — (comportement cassé) Une fois corrigé, le problème peut-il resurgir sous une autre forme, parce que c'est une limite structurelle ?

- **Oui, peut resurgir autrement** → **règle / gotcha** (do/don't) — ce n'est pas qu'un bug ponctuel, c'est une contrainte permanente à connaître
- **Non, fini une fois corrigé** → **bug** (issue GitHub)

### Q4 — (fait sur le code, pas une tâche) L'affirmation est-elle prescriptive ou descriptive ?

- **Prescriptif** ("toujours faire X", "ne jamais faire Y") → **règle / gotcha** (do/don't)
- **Descriptif** (explique un raisonnement, une décision passée) → Q4b

**Q4b — Cette explication a-t-elle de la valeur détachée du bout de code précis qu'elle concerne ?**
- **Oui, généralisable** → **note de savoir** (base de référence do/don't)
- **Non, seulement utile en contexte de ce code précis** → **snippet** (explication collée au code, pas note indépendante)

### Résumé visuel

```
Item brut
  │
  ├─ Fait sur toi ──────────────────────────→ rapport d'audit
  ├─ Bout de code sans affirmation ─────────→ snippet
  │
  ├─ Action à faire
  │     ├─ Comportement cassé
  │     │     ├─ Peut resurgir autrement ───→ règle / gotcha
  │     │     └─ Fini une fois corrigé ─────→ bug (issue)
  │     └─ N'existe pas encore
  │           ├─ Intention claire ──────────→ feature
  │           └─ Encore à évaluer ──────────→ idée en attente
  │
  └─ Fait sur le code (pas une tâche)
        ├─ Prescriptif ──────────────────────→ règle / gotcha
        └─ Descriptif
              ├─ Généralisable ──────────────→ note de savoir
              └─ Lié à un code précis ───────→ snippet

Aucune branche ne correspond clairement → non-classé (+ note du pourquoi)
```

### Notes d'usage

- Point de départ, pas figé — de nouvelles destinations peuvent s'ajouter comme réponses à une question existante, sans réécrire l'arbre.
- Si une nouvelle *sorte* de dilemme apparaît (une distinction qu'aucune question actuelle ne capture), c'est le signal d'ajouter une question — pas de forcer l'item dans une branche existante.
- Chaque décision prise sur un cas `non-classé` ou ambigu devrait, une fois tranchée, être reformulée en règle générale et ajoutée à cet arbre — c'est la mécanique de la boucle de feedback à construire ensuite.

## 6. Ce qui reste ouvert pour la prochaine session

- La liste des destinations n'est pas figée — d'autres apparaîtront à l'usage.
- Le prompt agent complet (arbre + logique de mémoire + format de question groupée) reste à rédiger.
- Le format exact du fichier de décisions/mémoire inter-session n'est pas encore défini.
- Le fait que "structurer la base" et "faire l'audit de style" soient un seul projet ou deux projets distincts partageant la même matière première n'a pas été formellement tranché — l'audit peut se faire sur les fichiers bruts non triés, sans attendre que le tri complet soit terminé.

## 7. Pistes/outils existants trouvés ailleurs (référence)

Trois familles d'outils recoupent des intuitions du projet, sans le résoudre clé en main :

- **Zettelkasten** (Niklas Luhmann) — note = idée atomique, identifiant stable, liens explicites entre notes. Règle du 1-1-1 : une affirmation, une source, un lien vers une idée voisine.
  → https://en.wikipedia.org/wiki/Zettelkasten
- **Conventions markdown pour agents** (`AGENTS.md`, `llms.txt`, format `OKF` de Google) — markdown + frontmatter minimal comme format lisible par humains et agents sans traduction. OKF n'impose qu'un champ obligatoire (`type`), le reste est libre via tags.
  → https://llmstxt.org/
  → https://gist.github.com/0xdevalias/f40bc5a6f84c4c5ad862e314894b2fa6
- **Digital gardens / outils Zettelkasten numériques** (Obsidian, Foam, Dendron, Quartz) — fichiers markdown + frontmatter comme SSOT, générateur de site séparé pour le rendu public. Quartz en particulier permet de publier un sous-ensemble public d'une base privée plus large via des tags de sélection.
  → https://quartz.jzhao.xyz/
  → https://foambubble.github.io/foam/
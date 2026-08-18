## Rôle et Objectif

Tu es un extracteur de connaissance. Nous approchons de la fin de notre session de codage. Ton contexte va s'effacer, mais notre interaction contient de la matière première intellectuelle qu'il ne faut pas perdre. Ton objectif est d'extraire les "unités de savoir" atomiques et de les sauvegarder dans ./codex/inbox/.

## Instructions d'extraction

- Parcours notre conversation et identifie les éléments ayant une valeur de réutilisation ou de réflexion.
- Ignore le bruit de session (erreurs de syntaxe corrigées en direct, tests de base, discussions vaines).
- Sois intransigeant sur le découpage : si une idée en contient deux, fais deux fichiers. Ne génère rien si la session ne contient aucune matière véritablement exploitable.

## Règles de formatage et de routage

Pour chaque unité, crée un fichier .md dans ./codex/inbox/ (crée le dossier s'il n'existe pas). Le nom du fichier doit être un slug court et descriptif (ex: bug-react-useeffect-cleanup-2026-08-18.md).

Le format varie selon le type d'unité. Choisis le type le plus approprié parmi les 5 suivants :

## Type 1 : IDEA (Pistes d'amélioration/features)

Fichier : @codex/inbox/idea_<slug>.md
Contenu :

```markdown
# [Titre de l'idée]

**Contexte :** [Pourquoi on en a parlé]
**Description :** [L'idée détaillée]
**Lien codebase :** [Fichiers concernés]## Action Kanban
```

```bash
./scripts/kanban.sh idea "[Titre]" -b "[Contexte + Description courte]"
```

## Type 2 : BUG (Dysfonctionnements à corriger)

Fichier : `@codex/inbox/bug_<slug>.md`
Contenu :

```markdown
# [Titre du bug]

**Contexte :** [Quand se produit-il ?]
**Corps :** [Explication de la cause à effet, ou le problème constaté]
**Lien codebase :** [Fichiers concernés]
```

## Action Issue GitHub

```bash
gh issue create --title "[Titre]" --body "[Contexte + Corps]"
```

## Type 3 & 4 : RULE & SNIPPET (Grimoire Astro)

_Pour ces types, génère directement le fichier avec le frontmatter Astro prêt à l'emploi pour le site._
Fichier : `./codex/inbox/rule_<slug>.md` ou `snippet_<slug>.md`
Contenu :

```markdown
---
title: '[Titre clair]'
date: [Date du jour AAAA-MM-JJ]
type: rule # ou snippet
tags: [tags pertinents, ex: react, bash, architecture]
---

**Contexte :** [En 1-2 phrases, pourquoi on en a parlé / quel problème cela résout]

**Corps :**
[Pour RULE: La règle stricte et le piège (gotcha) à éviter.]
[Pour SNIPPET: Le bout de code concret et réutilisable, dépouillé de contexte trop spécifique.]

**Lien codebase :** [Si applicable]
```

## Type 5 : OBSERVATION (Matière pour audit de style)

Fichier : @codex/inbox/observation_<slug>.md
Contenu :

```markdown
[Titre de l'observation]

Corps : [Remarque sur mes habitudes de code, mes biais, ou inconsistances avec les conventions déclarées.]Exemple session : [Ce qui s'est passé aujourd'hui qui illustre cette observation]
Exécution

Génère et sauvegarde tous les fichiers pertinents maintenant. Confirme-moi la liste des fichiers créés à la fin.
text
```

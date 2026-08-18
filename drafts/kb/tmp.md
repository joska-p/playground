# DOCUMENT 1 : Le Prompt de Fin de Session (Phase de Cristallisation)

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

---

### 📜 DOCUMENT 2 : Le Prompt d'Audit Multidimensionnel (Phase de Synthèse)

_À donner à ton agent quand ton dossier `@codex/inbox/` est rempli de ~20/30 fichiers `observation_*.md` et que tu veux produire ton rapport de style._

````markdown
# Rôle et Objectif

Tu es un auditeur en chef. Voici un ensemble de fichiers d'observations brutes issus de mes sessions de codage passées.
Ne me fais pas un résumé linéaire de ces fichiers. Je veux que tu les analyses de manière multidimensionnelle pour révéler les patterns cachés dans mon style de code.

# Instructions d'analyse

Lis tous les fichiers markdown correspondants au pattern `observation_*.md` dans le dossier `./codex/inbox/`.
Ensuite, rédige un rapport d'audit en te concentrant sur ces 3 axes :

1. **Habitudes Structurelles :** Comment je nomme les choses, comment je découpe mes fichiers/composants, mes patterns récurrents.
2. **Frictions avec les Standards :** Où mon style naturel entre en contradiction avec les conventions du langage/framework que j'utilise.
3. **Faux Départs Récurrents :** Les types de bugs ou d'erreurs de conception que je fais le plus souvent, et comment les anticiper à l'avenir.

# Format de sortie

Rédige le rapport au format Markdown avec le frontmatter Astro suivant, prêt à être stocké dans `./apps/playground/src/content/docs/audits/` :

```markdown
---
title: "Rapport d'Audit de Style - [Mois/Année]"
date: [Date du jour]
type: audit
tags: [meta, style, audit]
---

Sois direct, analytique et constructif. Évitez la flatterie, pointe les vrais défauts.
text

---

### ✅ DOCUMENT 3 : Ta Checklist Humaine (Le Guide pas-à-pas)

_À garder sous la main (dans un coin de ton écran ou dans tes notes) pour ne jamais te poser la question "quoi faire de ces fichiers ?"._

**Étape 1 : Fin de Session (Cristallisation)**

- [ ] Envoyer le **Prompt 1** à l'agent avant de fermer la session.
- [ ] Vérifier que l'agent a bien créé les fichiers dans `@codex/inbox/`.

**Étape 2 : La Station de Tri (Poubelle & Scission)**

- [ ] Ouvrir le dossier `@codex/inbox/`.
- [ ] **La Poubelle :** Supprimer les fichiers qui n'ont plus de sens à froid. Ne pas avoir peur de tout jeter si la session était inutile.
- [ ] **La Scission :** Ouvrir chaque fichier. Si une note contient 2 idées indépendantes, la dupliquer et couper le contenu en deux.

**Étape 3 : Le Routage (L'Action)**

- [ ] **Pour les fichiers `idea_*.md` :** Copier-coller la commande `./scripts/kanban.sh idea ...` dans le terminal. Exécuter. Supprimer le fichier de l'inbox.
- [ ] **Pour les fichiers `bug_*.md` :** Copier-coller la commande `gh issue create ...` dans le terminal. Exécuter. Supprimer le fichier de l'inbox.
- [ ] **Pour les fichiers `rule_*.md` et `snippet_*.md` :** Déplacer le fichier directement vers `./apps/playground/src/content/docs/rules/` (ou `snippets/`). Commit & push.
- [ ] **Pour les fichiers `observation_*.md` :** Les laisser s'accumuler. Ne rien faire.

**Étape 4 : La Synthèse Mensuelle (L'Audit)**

- [ ] Quand `@codex/inbox/` contient une vingtaine de `observation_*.md`.
- [ ] Envoyer le **Prompt 2** à l'agent.
- [ ] Récupérer le rapport généré, le sauvegarder dans `./apps/playground/src/content/docs/audits/`.
- [ ] Supprimer les fichiers `observation_*.md` de l'inbox (ils ont été synthétisés).

---

### 💡 Mon avis sur le setup

J'aime _beaucoup_ ce système pour plusieurs raisons :

1. **Zéro frottement logiciel :** Tu n'as pas introduit un énième outil SaaS. Tu utilises GitHub (Issues + Projects Kanban) et ton site Astro (fichiers md versionnés). C'est le monorepo qui devient le système d'exploitation de ta mémoire.
2. **Le prompt _fait_ l'action :** Ne pas sous-estimer la puissance de demander à l'agent d'écrire _la commande exacte_ dans le fichier. Le jour du tri batch, c'est du copier-coller littéral. Tu élimines la charge mentale de reformuler les idées pour le kanban.
3. **La dualité Humain/Machine :** Ton dossier `inbox` agit comme le sas. D'un côté, tu pompes le chaos pour l'agent (chaos informatif), de l'autre tu réduis l'entropie pour toi (cristaux). L'ajout du frontmatter Astro pour les règles/snippets est l'expression parfaite de ce cristal : propre, typé, et publiable.

Tu as une base extrêmement saine pour démarrer. Le seul risque sera la discipline (exécuter le prompt _systématiquement_ en fin de session), mais même là, le dossier `inbox` tolère très bien les accumulateurs de retard.
```
````

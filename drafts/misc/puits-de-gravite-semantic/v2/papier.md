# Le Manifeste de la Gravité Sémantique (V2)

_Appliqué au "Creative Playground" — Cahier d'exercices & Harness d'expérimentation._

### Prémisse : Le Pair-Programming Récréatif

L'agent n'est pas un générateur d'usine à gaz. Il est un partenaire d'expérimentation dans un écosystème moderne (React 19, Turborepo, `uv`). Le but n'est pas de lui faire cracher du code parfait au premier essai par la force, mais de créer un environnement de "flow" où il comprend l'esprit du projet. La documentation (`AGENTS.md` et les Skills) ne doit pas être un manuel de contraintes, mais un _champ d'attraction_ qui oriente le modèle naturellement vers le style et l'attitude attendus.

---

### 1. Le Fait structurel prime sur l'Interdiction

Un LLM ne comprend pas le vide ou l'absence. Si vous écrivez "ne fais pas de bruit", le token "bruit" acquiert un poids attentionnel. La gravité sémantique consiste à remplacer l'interdiction par un fait structurel indiscutable.

- _Exemple:_ Au lieu d'interdire `useMemo` et `useCallback` par des règles négatives ("Ne jamais utiliser useMemo car le React Compiler gère ça"), on énonce le fait positif : "The React 19 Compiler handles memoization natively, meaning we write pure, clean components without the noise of useMemo or useCallback."
- _Résultat:_ L'univers du prompt est peuplé par "React 19", "pure" et "clean". L'agent se positionne naturellement dans ce couloir conceptuel. Le bruit n'est pas interdit, il est rendu impossible par la définition de la réalité environnante.

### 2. Le Ton du document comme Filtre d'Attitude

Un `AGENTS.md` verbeux et défensif génère un agent méfiant et lourd. Un manifeste concis, factuel et assumé génère un agent chirurgical. La forme de votre documentation _est_ le premier prompt.

- Le ton du `AGENTS.md` doit être déclaratif : des phrases directes ("We are exploring...", "The environment is...").
- En séparant clairement l'action de la conversation ("Generate code in English, converse in French"), on crée un commutateur mental. L'agent comprend que le code est une production sérieuse, mais que l'interaction humaine reste libre et fluide.

### 3. Les Skills comme Perturbations Locales d'Attention

Dans ce harness, les skills ne sont pas des scripts rigides, mais des masses sémantiques additionnelles que l'on injecte selon le besoin. Elles se divisent en deux dynamiques de gravité :

- **Les invocables (Custom Prompts) :** Manipulées manuellement, ce sont des déclencheurs spécifiques pour des tâches isolées. Elles agissent comme des impulsions d'attention.
- **Les contextuelles (ex: `coding-style`) :** Elles vivent en périphérie. Leur `description` sert d'ancre d'attention ("Use when editing..."). Elles n'envahissent pas le context window de l'agent, mais当他们 sont activées, leur corps pointe vers la vérité ultime (le SSOT). Elles n'imposent pas comment coder, elles rappellent où se trouve la gravité (`/workspaces/.../typescript.md`).

### 4. La Confiance comme Valeur par Défaut

Le pire garde-fou est la micro-gestion. Si vous dites à l'agent "ne lance pas les tests, je m'en occupe", vous le placez dans un rôle de subordonné craintif.
Si vous dites "The human operator handles the validation pipeline. Your role is to generate the implementation", vous définissez un périmètre de responsabilité clair et confiant. L'agent n'est pas limité, il est libéré de la charge mentale du tooling.

Ce périmètre de confiance est ce qui permet à l'agent de rester dans un mode d'expérimentation (récréatif). Puisqu'on lui fait confiance pour écrire du "one-shot code", il n'a pas à se préoccuper des frictions de validation.

### 5. Laisser la place à l'Émergence (Le Vide Constructif)

La gravité sémantique ne signifie pas tout contrôler. C'est définir des bords solides (le contexte, le ton, le périmètre de confiance) pour que le centre reste fluide.
En ne listant pas de règles adversariales strictes dans le manifeste principal, on laisse l'espace à l'agent pour qu'il propose du meilleur, comprenne quand une direction est mauvaise, et suggère des mises à jour de l'écosystème. Le manifeste fixe l'orbite, mais laisse l'agent s'y déplacer librement.

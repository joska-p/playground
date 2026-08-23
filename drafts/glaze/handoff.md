# Handoff : Plan de Refactorisation Architecture & Typage — Library `glaze`

## 1. Contexte & Architecture Validée

* **Monorepo :** *Playground* (« Cahier d'exercices »), composé de mini-apps graphiques et de la bibliothèque centrale TypeScript : **`glaze`**.
* **Principes clés :**
1. **Pureté et Honnêteté aux Frontières (*Impure at the Edges*) :** Les fonctions de `glaze` sont 100 % pures. Le temps, les entrées et l'aléatoire sont injectés par l'application shell.
2. **Invariants par Construction :** Utilisation de **Branded Types** (ex. `NormalizedVec2`, `Radian`) pour supprimer les checks runtime et de **Proof Tokens** (ex. `ActiveFrameToken`) pour garantir l'ordre du cycle de vie à la compilation.
3. **Niveau d'Abstraction Unique (SLAP) :** Aucune fonction ne mélange plomberie bas niveau/Canvas et orchestration haut niveau.



---

## 2. Statut Actuel : Inventaire Réalisé (`src/core/`)

L'audit complet par balayage ciblés (*Pattern Sweeps*) du dossier `src/core/` a été exécuté avec succès et consigné à la racine dans **`GLAZE_REFACTOR_INVENTORY.md`** :

* [x] **Passe 1 (Invariants & Branded Types) :** Identifications des types vecteurs bruts, contrôles de division par zéro et ambiguïtés numériques à convertir en Branded Types.
* [x] **Passe 2 (Honnêteté & Side-Effects) :** Repérage des appels à l'état global (`Math.random()`, `performance.now()`), des mutations directes d'arguments et des paramètres à injecter.
* [x] **Passe 3 (Lifecycle, Proof Tokens & SLAP) :** Détection des risques d'appels hors séquence et découpage des fonctions monolithiques à abstractions mélangées.
* [x] **Feuille de route générée :** La liste ordonnée des tâches *bottom-up* est finalisée à la fin de `GLAZE_REFACTOR_INVENTORY.md`.

---

## 3. Prochaine Étape Immédiate (Exécution)

Ouvrir une nouvelle session et **traiter la toute première tâche prioritaire** de la feuille de route (`GLAZE_REFACTOR_INVENTORY.md`), idéalement située sur les modules utilitaires/mathématiques les plus bas dans l'arbre de dépendances.

### We are ready to start refactoring `glaze` based on our audit report.

1. Read `GLAZE_REFACTOR_INVENTORY.md` at the root of the repo.
2. Select Task #1 from the "Recommended Order of Refactoring" section.
3. Apply the refactoring to that target file only (use Branded Types, ensure pure functions, adhere to SLAP).
4. Update or write unit tests to confirm the module works as expected.

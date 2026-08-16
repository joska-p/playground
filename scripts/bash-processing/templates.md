## Template pour un package à la fois (Séquentiel)

Ce script itère sur chaque dossier dans packages/. L'agent lit l'état actuel et le handoff avant d'exécuter la tâche. Si la session coupe, tu relances le script : il ignorera les packages déjà validés/commités.

```bash
#!/usr/bin/env bash

# Configuration
PROMPT_BASE="Mets à jour le README et la doc Astro. Vérifie si un dossier demo/ existe. Si un fichier HANDOFF.md existe dans le package, lis-le pour reprendre où la précédente session s'est arrêtée."

for pkg in packages/*; do
  # Ignorer si ce n'est pas un dossier
  [ -d "$pkg" ] || continue

  echo "=== Traitement de : $pkg ==="

  # Lancement de l'agent en lui fournissant uniquement le périmètre du package
  # Remplace 'agent-cli' par la CLI de ton agent (ex: claude, cursor-cli, etc.)
  agent-cli --path "$pkg" "$PROMPT_BASE"

  # Validation du build/test pour ce package
  if pnpm --filter "$(basename "$pkg")" build; then
    echo " Build réussi pour $pkg"
    # Nettoyage du handoff s'il existait
    rm -f "$pkg/HANDOFF.md"

    # Commit automatique du package terminé
    git add "$pkg"
    git commit -m "refactor($(basename "$pkg")): mise à jour documentation"
  else
    echo " Échec du build pour $pkg. Session interrompue."
    echo "Vérifie le fichier $pkg/HANDOFF.md pour reprendre plus tard."
    exit 1
  fi
done
```

## Template pour un fichier unique HANDOFF.md à la racine

Si ta tâche est trop globale pour être découpée strictement par dossier de package, tu conserves un seul suivi d'avancement à la racine du monorepo.

```bash
#!/usr/bin/env bash

MAX_ITERATIONS=10
ITERATION=1

while [ $ITERATION -le $MAX_ITERATIONS ]; do
  echo "--- Loop #$ITERATION ---"

  # On passe le HANDOFF.md global dans le prompt
  agent-cli "Lis le fichier HANDOFF.md à la racine. Choisis le PROCHAIN package non traité. Effectue les modifications, teste le build du package avec pnpm. Une fois terminé ou si tu approches de la limite de contexte, met à jour HANDOFF.md en cochant le package et en écrivant tes notes. Si TOUS les packages sont faits, écris 'DONE' dans HANDOFF.md."

  # Si l'agent signale que tout est terminé
  if grep -q "DONE" HANDOFF.md; then
    echo " Tous les packages ont été traités !"
    break
  fi

  # Git commit automatique de l'étape
  git add .
  git commit -m "chore(monorepo): progression iteration $ITERATION"

  ITERATION=$((ITERATION + 1))
done
```

### RÈGLE OBLIGATOIRE DE HANDOFF (Session courte / Modèle gratuit)

1. Avant de modifier le code, vérifie la présence d'un fichier `HANDOFF.md`. S'il existe, lis-le en priorité.
2. Si tu dois interrompre ton travail ou après chaque étape validée :
    - Crée ou mets à jour `HANDOFF.md`.
    - Indique : [x] Tâches terminées, [ ] Tâches restantes, et les éventuelles erreurs rencontrées lors du build `pnpm`.
3. Dès qu'un package est totalement prêt et que `pnpm build` passe, efface le fichier `HANDOFF.md` ou écris le mot-clé `DONE`.

# Session Handoff & Memory

## 📍 Statut Actuel

- **Dernière étape complétée :** [ex: Phase 1 — Purge et Fixes urgents]
- **Prochaine étape :** [ex: Phase 2 — Migration des couleurs Tailwind hors-thème]

## 📝 Décisions d'Architecture & Apprentissages (Learnings)

- _Exemple :_ Les `slate-*` et `neutral-*` dans `AtlasControls.tsx` ont été remplacés par `surface-raised` et `foreground-dim`.
- _Exemple :_ Le `Switch` utilise désormais `text-primary-foreground` pour suivre la palette OKLCH.

## ⚠️ Dette / Sujets en Suspens (Bypass pragmatique)

- _Exemple :_ Test de `RandomArt` désactivé temporairement car il s'appuyait sur un ancien composant purgé. À traiter en Phase 3.

## 🚀 Instructions pour la reprise

1. Lire `HANDOFF.md`.
2. Lancer `pnpm build` pour vérifier la stabilité basique.
3. Exécuter la Phase [X].

---
title: 'Centralized Codex as Documentation and Knowledge SSOT'
date: 2026-08-18
type: rule
tags: [documentation, architecture, monorepo, astro]
---

**Contexte :** Pour éviter la dispersion de la documentation interne, des scripts de génération et de la base de connaissances au sein de l'application playground, nous avons centralisé l'ensemble dans un dossier racine unique nommé `codex/`.

**Corps :**
- Le dossier `codex/` devient le Single Source of Truth (SSOT) pour toute la documentation (`codex/docs/`), la connaissance technique (`codex/knowledge/`) et les ateliers/scripts (`codex/ateliers/`).
- Les loaders Astro des collections de contenu doivent être configurés avec des chemins relatifs pointant vers ce répertoire racine (ex: `base: '../../codex/docs'`).
- Les AGENTS et skills doivent référencer `./codex/docs/` comme référence principale.

**Lien codebase :** `codex/`, `apps/playground/src/content.config.ts`, `AGENTS.md`

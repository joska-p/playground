---
title: 'Inventaire de tokens arbitraires avec ripgrep'
date: 2026-08-19
type: snippet
tags: [tailwind, audit, ripgrep, css]
---

## Contexte

Besoin de cartographier l'utilisation de tokens modifiés (`/50`, `[...]`, `(--var)`) dans un scope donné du codebase, pour préparer une uniformisation du design system.

## Corps

```bash
# 1. Opacity slash (utility-token/NN)
rg -o -g '*.{tsx,ts,jsx,js,astro,css}' --pcre2 \
  '(?:bg|text|border|ring|outline|divide|from|to|via|shadow|stroke|fill)-[a-z][\w-]*\/\d{1,3}' \
  apps/playground packages/ui | sed 's/^.*://' | sort | uniq -c | sort -rn

# 2. Dynamic var shorthand (utility-(--var)/NN)
rg -o -g '*.{tsx,ts,jsx,js,astro,css}' --pcre2 \
  '(?:bg|text|border|ring|outline)\(\--[a-z][\w-]*\)(?:\/\d{1,3})?' \
  apps/playground packages/ui | sed 's/^.*://' | sort | uniq -c | sort -rn

# 3. Arbitrary brackets (utility-[...])
rg -o -g '*.{tsx,ts,jsx,js,astro,css}' --pcre2 \
  '(?:bg|text|border|ring|shadow|grid-cols|grid-rows|max-h|max-w|min-h|w|h|p|gap)-\[[^\]]+\]' \
  apps/playground packages/ui | sed 's/^.*://' | sort | uniq -c | sort -rn

# 4. Aggregat par token (ignorer utility prefix et opacité)
rg -o -g '*.{tsx,ts,jsx,js,astro,css}' --pcre2 \
  '(?:bg|text|border|ring)-([a-z][\w-]*?)\/\d{1,3}' \
  apps/playground packages/ui | sed 's/^.*://' | sed 's/.*-\(.*\)\/.*/\1/' | sort | uniq -c | sort -rn

# 5. Distribution des opacités
rg -o -g '*.{tsx,ts,jsx,js,astro,css}' --pcre2 \
  '(?:bg|text|border|ring)-[a-z][\w-]*\/(\d{1,3})' \
  apps/playground packages/ui | sed 's/^.*://' | grep -oP '/\d+' | sort | uniq -c | sort -rn
```

**Notes :**
- Utiliser `--pcre2` pour les groupes de capture dans rg
- Les fichiers `*.astro` doivent être inclus (Astro est le framework de l'app playground)
- Exclure les fichiers `*-original.css` (archives, pas le theme actif)
- La sortie est plain-text, pas de CSV ni JSON nécessaire pour un audit rapide

## Lien codebase :** N/A — script réutilisable

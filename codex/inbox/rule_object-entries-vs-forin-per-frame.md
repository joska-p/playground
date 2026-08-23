---
title: 'Object.entries alloue : boucle for...in pour itérer un Record à chaud'
date: 2026-08-23
type: rule
tags: [typescript, performance, gc, zero-allocation]
---

**Contexte :** Pipeline d'uniforms de glaze : `for (const [k, v] of Object.entries(values))` s'exécutait à chaque frame et par programme, en allouant un tableau + un tuple par clé à chaque appel.

**Corps :**
Sur un `Record<string, T>` simple, itérer les clés directement ne coûte rien :

```ts
// Alloue : array de tuples, chaque frame
for (const [name, value] of Object.entries(values)) { /* ... */ }

// Zéro allocation : même ordre d'itération
for (const name in values) {
    const entry = map.get(name);
    if (entry === undefined) continue;
    consume(entry, values[name]);
}
```

**Gotchas :**
- `for...in` remonte la chaîne de prototypes : sûr uniquement sur des objets littéraux/spread (aucune prop énumérable héritée). Ne pas l'utiliser sur des instances de classes exotiques.
- Dans ce repo, `noUncheckedIndexedAccess` est à `false`, donc `values[name]` type directement `T`. Si on l'active un jour, ajouter un guard `undefined`.
- Réserver la règle aux chemins à cadence fixe (frame loop, handlers haute fréquence) ; ailleurs, `Object.entries` reste le choix lisible.

**Lien codebase :** `packages/glaze/src/gpu/shader/setUniforms.ts` (`setUniforms`)

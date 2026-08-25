---
name: workshop
description: 'À utiliser dès que tu as besoin de créer un nouvel outil pour étendre tes propres capacités.'
---

# Workshop — Création d'Outils OpenCode

Tu créer des outils natifs que le LLM peut appeler directement depuis les conversations.

## Règles Fixes

### 1. Import et Structure

```typescript
import { tool } from '@opencode-ai/plugin';

export default tool({
    description: "Description claire de l'outil",
    args: {
        param: tool.schema.string().describe('Description du paramètre')
    },
    async execute(args, context) {
        // Logique ici
        return 'résultat';
    }
});
```

Le nom du fichier devient le nom de l'outil (ex: `database.ts` → outil `database`).

### 2. Schéma Zod

Utiliser `tool.schema` (qui est Zod) pour définir les types :

```typescript
args: {
  query: tool.schema.string().describe("SQL query"),
  limit: tool.schema.number().optional().describe("Max results"),
  flags: tool.schema.array(tool.schema.string()).describe("Filters"),
}
```

Types disponibles : `.string()`, `.number()`, `.boolean()`, `.array()`, `.object()`

**Important** : Toujours ajouter `.describe()` pour documenter les paramètres.

### 3. Exécution avec Bun.$

Pour exécuter des scripts externes (Python, shell, etc.) :

```typescript
const result = await Bun.$`python3 ${script} ${args.param}`.text();
```

- `.text()` pour obtenir une string
- `.json()` pour du JSON
- `.cwd(context.worktree)` pour définir le répertoire de travail

### 4. Contexte de session

```typescript
async execute(args, context) {
  const { agent, sessionID, messageID, directory, worktree } = context
  // ...
}
```

- `context.directory` : répertoire de travail de la session
- `context.worktree` : racine du worktree git (préférer pour les chemins locaux)

### 5. Emplacement des outils

- **Local** : `.opencode/tools/` — spécifique au projet, versionné dans git
- **Global** : `~/.config/opencode/tools/` — disponible dans toutes les sessions

### 6. Plusieurs outils par fichier

```typescript
export const add = tool({
    description: 'Add two numbers',
    args: { a: tool.schema.number(), b: tool.schema.number() },
    async execute(args) {
        return args.a + args.b;
    }
});

export const multiply = tool({
    description: 'Multiply two numbers',
    args: { a: tool.schema.number(), b: tool.schema.number() },
    async execute(args) {
        return args.a * args.b;
    }
});
```

Crée deux outils : `math_add` et `math_multiply`.

## Lessons Learned

> Notes ajoutées au fur et à mesure des expérimentations.

- **Zod** : Toujours utiliser `.optional()` pour les paramètres optionnels, sinon Zod rejette `undefined`.
- **Chemins** : Préférer `context.worktree` pour les chemins locaux (racine git) plutôt que `context.directory`.
- **Erreurs** : Les outils doivent retourner des strings (pas des objets) pour les messages d'erreur.
- **Tests** : Exécuter chaque outil end-to-end avant de l'utiliser en production.

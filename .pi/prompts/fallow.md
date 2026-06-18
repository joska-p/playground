---
description: Run fallow static analysis on the codebase
argument-hint: "[path]"
---
Run fallow to analyze code health, find unused exports, detect duplication, and more.

## Full analysis

```bash
pnpm fallow
```

## Scoped analysis

```bash
fallow ${1:-.}
```

Focus on: unused exports, dead code, circular dependencies, complexity hotspots, and architecture boundary violations.

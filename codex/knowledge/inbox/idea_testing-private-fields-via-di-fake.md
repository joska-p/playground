# Testing Private Class Fields via Dependency Injection

**Contexte :** Les classes TypeScript avec des `#private` fields ne permettent pas l'accès externe même avec la notation bracket `store['#method']()`. Tenter `store['#onPointerDown'](...)` compile mais échoue au runtime (TypeError: not a function).

**Description :** Quand une classe utilise des dépendances injectées (ici `EventSource`), le pattern de test consiste à fournir un fake qui enregistre les subscriptions et expose des méthodes `emit()` / `emitWindow()` pour déclencher les événements. Les handlers privés sont appelés indirectement via le fake source, jamais directement. Cela teste le vrai chemin d'exécution (constructor → bindings → handlers) sans exposer l'implémentation interne.

**Lien codebase :** `packages/glaze/src/core/InputStore.test.ts` (createFakeEventSource), `packages/glaze/src/core/InputStore.ts`

### Action Kanban

```bash
./scripts/kanban.sh idea "Testing private fields via DI fake" -b "Pattern: fake EventSource with emit() triggers private handlers indirectly, testing real execution path"
```

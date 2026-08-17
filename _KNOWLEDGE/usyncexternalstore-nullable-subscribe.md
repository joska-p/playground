# useSyncExternalStore avec store nullable

Pattern pour s'abonner à un store externe qui peut être `null` au premier render
(ex: un `ClockStore` qui n'est créé qu'au mount d'un canvas) :

```tsx
const noop = () => {
    /* unsubscribe no-op */
};

const isPlaying = useSyncExternalStore(
    (onStoreChange) => clockStore?.subscribe(onStoreChange) ?? noop,
    () => clockStore?.getIsPlaying() ?? true
);
```

Points clés :

- le subscribe inline retourne `noop` quand le store est null — c'est le pattern
  standard, pas un hack ; `useSyncExternalStore` exige un subscribe non-nullable
- le getSnapshot retourne la valeur par défaut quand le store est null
- pas besoin de `useCallback` — le React Compiler gère la mémo du subscribe
- `noop` doit être un nommé avec un commentaire (rule `@typescript-eslint/no-empty-function`)

Alternative rejetée : `useEffectEvent` + `useState` + `useEffect` pour l'abonnement.
C'est plus verbeux et `useEffectEvent` est fait pour les event handlers dans les effects,
pas pour les subscriptions à des stores externes. `useSyncExternalStore` est l'API dédiée.

Le noop trick résout aussi le conflit classique React state vs store externe :
le composant affiche la valeur du store externe (getSnapshot) tout en restant
réactif aux changements (subscribe), sans race condition entre les deux sources.
Pattern louche mais fonctionnel — à creuser another fois.

## TODO N1

````MD
Ton instinct est bon, il y a effectivement une odeur ici — et je pense que je peux la nommer précisément.

**Le problème central : `onSurface`/`onDraw` donnent accès à la classe complète, pas à une façade de dessin.**

`GpuSurface` mélange deux responsabilités très différentes :
1. Une **API de dessin** (`rect`, `circle`, `line`, `text`, `renderProgram`, lecture de `time`/`camera`/`pointer`)
2. Le **contrôle du cycle de vie du rendu** (`setDraw`, `subscribe`, `destroy`, `createProgram`, `createStateBuffer`)

Le composant `GpuCanvas` est censé être le seul propriétaire du cycle de vie (c'est lui qui appelle `setDraw` en interne, qui détruit le programme au démontage, etc.). Mais en passant l'instance entière dans `onSurface` et `onDraw`, tu donnes au consommateur les clés de la maison entière, y compris les pièces que *lui-même* est censé ne jamais toucher :

- Un utilisateur peut appeler `surface.setDraw(autreFn)` depuis `onSurface`, ce qui entre en conflit silencieux avec le `setDraw` interne du composant — le prochain re-render de `GpuCanvas` écrasera son changement sans prévenir, ou inversement.
- Un utilisateur peut appeler `surface.destroy()` en plein milieu de la vie du composant, et `GpuCanvas` n'en saura rien — il continuera de croire que `surfaceRef.current` est valide.
- `subscribe` (pensé pour composer plusieurs dessinateurs indépendants) et `setDraw` (le mécanisme interne du composant) cohabitent sans arbitrage : rien n'empêche un consommateur d'ajouter un `subscribe` qui fait doublon avec le `onDraw` du composant.

**Deuxième problème, plus insidieux : `onSurface` n'est pas garanti de ne s'exécuter qu'une fois.**

Regarde les dépendances du `useEffect` :

```tsx
}, [onDraw, uniforms, fragmentShader, onSurface, onClockStore, surfaceRef, clockStoreRef]);
```

Si `onDraw` ou `uniforms` est une arrow function inline côté appelant (cas extrêmement courant en React si l'utilisateur ne les mémoïse pas avec `useCallback`), cet effet se relance à **chaque render**, et donc `onSurface?.(surface)` se rappelle à chaque fois — avec la *même* instance de surface. Mentalement, un nom comme `onSurface` évoque "la surface est prête, fais ton setup ici" (donc un consommateur naturel écrira `surface.createProgram(...)` dedans). Combiné avec l'accès complet à `createProgram`, ça devient un générateur de fuite de programmes GPU silencieuse — chaque re-render en crée un nouveau sans jamais détruire le précédent.

C'est la vraie source de ton malaise je pense : ce n'est pas juste "exposer trop", c'est que l'API invite à un usage (setup one-shot) qu'elle ne garantit pas structurellement.

**Ce que je changerais**

1. **Séparer lecture/dessin de contrôle de cycle de vie.** Exposer aux callbacks un type restreint, genre :
```ts
interface DrawFrame {
    readonly time: number;
    readonly deltaTime: number;
    readonly width: number;
    readonly height: number;
    readonly camera: Camera;
    readonly pointer: Point2D;
    rect: GpuSurface['rect'];
    circle: GpuSurface['circle'];
    line: GpuSurface['line'];
    text: GpuSurface['text'];
    renderProgram: GpuSurface['renderProgram'];
    clear: GpuSurface['clear'];
}
```
   `setDraw`, `subscribe`, `destroy` restent internes à `useGpuSurface`/`GpuCanvas`, jamais exposés à l'extérieur.

2. **Séparer setup (one-shot) de draw (par frame).** Un `onMount?: (surface: GpuSurface) => void` dédié à la création de programmes/buffers, appelé une seule fois via un ref-guard (`didMountRef`), distinct de `onDraw`. Là seulement, exposer l'instance complète a du sens, parce que c'est le bon endroit pour `createProgram`/`createStateBuffer` — et le contrat "une seule fois" est explicite.

3. Si tu veux garder `onSurface` pour d'autres usages (accès à `camera`/`input` pour du code impératif hors-frame), au moins **stabiliser l'identité en interne** — ne pas remettre l'effet en dépendance de callbacks non mémoïsés, ou documenter clairement que l'appelant doit les mémoïser.

Le principe général : la classe `GpuSurface` a raison d'exister telle quelle en interne (elle a besoin de tout ce pouvoir pour orchestrer la boucle). Le problème est la **frontière** — le pont React ne devrait laisser passer que ce que le modèle mental "je dessine dans une fonction de rendu" autorise, pas la totalité de l'objet interne.
````

# Module variable vs store pour objets non-réactifs

Quand un objet est défini une fois au mount et ne change plus (ex: `GpuSurface`,
`Clock`), il n'a pas sa place dans un store Zustand ni dans un `useState`.

**Pourquoi pas Zustand/state ?**

- Zustand track les changements et déclenche des re-renders.
- Un objet mutable (surface WebGL, clock) muté 60×/sec par le frame loop
  causerait 60 re-renders/sec pour rien.
- L'objet n'est jamais "remplacé", il est muté en place — ce n'est pas du state.

**Pattern : module variable**

```ts
// store.ts
let surface: GpuSurface | null = null;
export const setSurface = (s: GpuSurface) => {
    surface = s;
};
export const getSurface = () => surface;
```

Accessible de n'importe quel fichier dans le module via import. Pas de re-render,
pas de Context, pas de boilerplate.

**Quand utiliser quoi :**

| Besoin                                                     | Solution                                                |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| Objet défini une fois, muté en place, pas de re-render     | Module variable (`let` + getter/setter)                 |
| Valeur qui change et doit déclencher un re-render          | `useState` / Zustand                                    |
| Objet partagé entre composants siblings sans prop drilling | React Context (ou module variable si pas de réactivité) |

**Dans glaze**, ce pattern est utilisé partout : `GpuSurface`, `Camera`,
`InputStore`, `FrameLoop` sont tous hors de React (refs ou module scope).
Le React facade ne utilise ni `useCallback`, ni `useMemo`, ni `React.memo` —
tout vit dans des `useRef` ou des closures d'effets.

**Leçon :** un store n'est pas un "endroit où stocker des trucs".
C'est un mécanisme de réactivité. Si tu n'as pas besoin de réactivité,
une simple variable suffit.

## Piège : lire l'état d'un objet mutable dans le JSX

Une variable module donne la **référence** à l'objet, pas son état réactif.
Si tu dois lire une propriété de cet objet dans le JSX (ex: `clock.isPlaying`
pour le label d'un bouton), il te faut un `useState` local pour la partie
display — la variable module gère la référence, React gère l'affichage.

**Cas typique : bouton Play/Stop**

```tsx
// ❌ Mauvais : getSurface() appelé au render → undefined au premier render
const surface = getSurface();
<Button onClick={() => surface?.clock.togglePlay()}>
    {surface?.clock.isPlaying ? 'Stop' : 'Play'}
</Button>;

// ✅ Bon : getSurface() appelé au clic, useState pour le label
const [isPlaying, setIsPlaying] = useState(true);
<Button
    onClick={() => {
        getSurface()?.clock.togglePlay();
        setIsPlaying((prev) => !prev);
    }}
>
    {isPlaying ? 'Stop' : 'Play'}
</Button>;
```

**Pourquoi c'est un hack propre ici :** on n'a qu'un petit bout de texte
à synchroniser. Un hook dédié (`useClock`) serait plus propre mais
over-engineered pour un seul booléen d'affichage. Le `useState` local
ne re-render que le composant contrôle, pas le canvas frère.

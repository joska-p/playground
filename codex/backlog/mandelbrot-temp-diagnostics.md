# Mandelbrot — TEMP DIAGNOSTICS à vérifier dans mandelbrot-viewer.tsx

Dans `src/components/mandelbrot-viewer.tsx`, il reste un bloc :

```ts
// TEMP DIAGNOSTICS — remove after fixing the blank canvas.
let diagLogged = 0;
const diag = (...args: unknown[]) => {
    if (diagLogged < 30) {
        diagLogged++;
        console.info('[mb-diag]', ...args);
    }
};
```

Des appels `diag(...)` parsèment tout le composant (requestReference, uniforms, uploads…).
C'est marqué "remove after fixing the blank canvas" — mais le canvas est-il réparé ? À vérifier
avant de supprimer. Si le rendu fonctionne, il faut virer le bloc + tous les `diag()` et les
`console.log` de fallback (`'[v0] reference compute failed'`).

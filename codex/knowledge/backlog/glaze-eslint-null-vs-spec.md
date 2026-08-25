# Pattern — `lib.dom` non-null vs spec WebGL : eslint-disable avec pourquoi

Récurrent dans glaze : `lib.dom` déclare `gl.createShader` / `gl.createProgram` /
`gl.createTexture` comme retournant du **non-null**, mais la **spec WebGL autorise `null`** en cas
d'échec (allocation).

Donc chaque garde de nullité déclenche `@typescript-eslint/no-unnecessary-condition`. Pattern :

```ts
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- lib.dom types createTexture() as non-null, but the WebGL spec allows null on failure
if (!texture) throw new Error('Glaze: text texture allocation failed');
```

Le commentaire doit dire _pourquoi_ la règle est désactivée (le conflit types/spéc), pas juste
"disable". Vu dans : TextRasterizer.get(), compileProgram, StateBuffer.

Variante `noUncheckedIndexedAccess` : avec `noUncheckedIndexedAccess` activé, un accès par index
(`array[i]`) renvoie `T | undefined`. Même pattern, message type :
`// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- noUncheckedIndexedAccess: array access yields `| undefined``

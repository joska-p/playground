---
title: 'Binding DOM table-driven : une déclaration au lieu de miroirs add/remove'
date: 2026-08-23
type: snippet
tags: [typescript, dom, events, architecture]
---

**Contexte :** `InputStore.attach()` et son `#unbind()` listent chacun 8 appels `addEventListener`/`removeEventListener` en miroir — ajouter un event impose d'éditer les deux listes en lockstep ; en oublier un = leak de listeners ou events morts.

**Corps :**

```ts
const BINDINGS = [
    ['pointermove', '#onPointerMove'],
    ['pointerdown', '#onPointerDown'],
    ['wheel', '#onWheel', { passive: false }],
    // ...
] as const;

#bound: Array<() => void> = [];

attach(target: HTMLElement): void {
    this.#unbind();
    this.#bound = BINDINGS.map(([type, handler, opts]) =>
        source.on(target, type, this[handler], opts)
    );
}

#unbind(): void {
    for (const dispose of this.#bound) dispose();
    this.#bound = [];
}
```

Un seul site de déclaration par event ; le tableau de disposers se couple naturellement avec une `EventSource` injectée (tests headless sans jsdom). Le `as const` préserve le typage des triplets.

**Lien codebase :** `packages/glaze/src/core/InputStore.ts` (`attach` :71-82, `#unbind` :173-187 — à refactorer)

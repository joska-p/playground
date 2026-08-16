# Pattern — composants stateless + hooks stateful (ui)

Règle d'architecture du package `ui` : les composants ne possèdent jamais leur état
(« stateless, fully controlled »), l'état vit dans des hooks dédiés.

- `<ThemeProvider>` ne fait que relayer `theme/setTheme/toggleTheme` fournis par le caller
  (typiquement `useThemeState`). Dark est la valeur par défaut du CSS `:root` → le provider est
  optionnel : ne rien rendre donne déjà le thème sombre.
- `useThemeState(defaultTheme, persist)` est le seul endroit avec `useState` + effets DOM/localStorage
  (met `data-theme="light"` sur `<html>`, ou retire l'attribut pour dark — pas d'attribut = dark).
- `useToastQueue()` porte la liste, le compteur d'id et les timers de dismiss ; `ToastProvider`
  et `ToastViewport` sont stateless.
- `useTabsState(defaultValue)` pareil pour `<Tabs>`.

Avantage : l'arbre de composants reste pur (testable, SSR-friendly), et l'état est réutilisable
sans le composant. Leçon : chaque fois qu'un composant de lib a besoin d'état, le sortir dans un
hook jumeau et rendre le composant contrôlé.

# useCallback redondant (compilateur React)

AGENTS.md : React 19 + compilateur → pas besoin de useMemo/useCallback.

`useSliderState` garde pourtant un `useCallback` (deps [mosaicRef, cssVar, debounceMs]). Inoffensif mais redondant : le compilateur mémorise déjà. À supprimer au prochain passage.

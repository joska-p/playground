import { useCallback } from 'react';
import { downloadJson } from '../../core/download-json.ts';
import { useAutomaStore } from './context.ts';
import type { CellValue } from '../../core/types.ts';
import type { BrushMode } from './types.ts';

const useToggleRunning = () => {
  const store = useAutomaStore();
  return useCallback(() => store.getState().toggleRunning(), [store]);
};

const useStep = () => {
  const store = useAutomaStore();
  return useCallback(() => store.getState().step(), [store]);
};

const useClear = () => {
  const store = useAutomaStore();
  return useCallback(() => store.getState().clear(), [store]);
};

const useRandomize = () => {
  const store = useAutomaStore();
  return useCallback(() => store.getState().randomize(), [store]);
};

const useSetSpeed = () => {
  const store = useAutomaStore();
  return useCallback((ms: number) => store.getState().setSpeed(ms), [store]);
};

const useSetBrushMode = () => {
  const store = useAutomaStore();
  return useCallback(
    (mode: BrushMode) => store.getState().setToolMode(mode),
    [store]
  );
};

const useSetShowDebug = () => {
  const store = useAutomaStore();
  return useCallback((v: boolean) => store.setState({ showDebug: v }), [store]);
};

const useExportPattern = () => {
  const store = useAutomaStore();
  return useCallback(() => {
    const pattern = store.getState().exportPattern('pattern');
    downloadJson(pattern, `${pattern.name}.json`);
  }, [store]);
};

const useImportPattern = () => {
  const store = useAutomaStore();
  return useCallback(
    (raw: unknown) => store.getState().importPattern(raw),
    [store]
  );
};

const usePaintCell = () => {
  const store = useAutomaStore();
  return useCallback(
    (index: number, value: CellValue) =>
      store.getState().paintCell(index, value),
    [store]
  );
};

export {
  useClear,
  useExportPattern,
  useImportPattern,
  usePaintCell,
  useRandomize,
  useSetBrushMode,
  useSetShowDebug,
  useSetSpeed,
  useStep,
  useToggleRunning,
};

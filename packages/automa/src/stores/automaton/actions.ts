import { useCallback } from 'react';
import { useCAStore } from './context.ts';
import type { CellValue } from '../../core/types.ts';
import type { ToolMode } from './types.ts';

const useToggleRunning = () => {
  const store = useCAStore();
  return useCallback(() => store.getState().toggleRunning(), [store]);
};

const useStep = () => {
  const store = useCAStore();
  return useCallback(() => store.getState().step(), [store]);
};

const useClear = () => {
  const store = useCAStore();
  return useCallback(() => store.getState().clear(), [store]);
};

const useRandomize = () => {
  const store = useCAStore();
  return useCallback(() => store.getState().randomize(), [store]);
};

const useSetSpeed = () => {
  const store = useCAStore();
  return useCallback((ms: number) => store.getState().setSpeed(ms), [store]);
};

const useSetToolMode = () => {
  const store = useCAStore();
  return useCallback((mode: ToolMode) => store.getState().setToolMode(mode), [store]);
};

const useSetShowDebug = () => {
  const store = useCAStore();
  return useCallback((v: boolean) => store.setState({ showDebug: v }), [store]);
};

const useExportPattern = () => {
  const store = useCAStore();
  return useCallback(() => {
    const pattern = store.getState().exportPattern('pattern');
    const json = JSON.stringify(pattern, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pattern.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [store]);
};

const useImportPattern = () => {
  const store = useCAStore();
  return useCallback(
    (raw: unknown) => store.getState().importPattern(raw),
    [store],
  );
};

const usePaintCell = () => {
  const store = useCAStore();
  return useCallback(
    (index: number, value: CellValue) => store.getState().paintCell(index, value),
    [store],
  );
};

export {
  useClear,
  useExportPattern,
  useImportPattern,
  usePaintCell,
  useRandomize,
  useSetShowDebug,
  useSetSpeed,
  useSetToolMode,
  useStep,
  useToggleRunning,
};

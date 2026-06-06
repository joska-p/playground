import { useStore } from 'zustand';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cameraControlRef, useCAStore } from '../stores/automaton/context.ts';
import {
  useRunning,
  useShowDebug,
  useSpeedMs,
  useToolMode,
} from '../stores/automaton/selectors.ts';
import type { ToolMode } from '../stores/automaton/types.ts';

type ControlsProps = {
  className?: string;
};

const Controls = ({ className }: ControlsProps) => {
  const store = useCAStore();
  const running = useRunning();
  const speedMs = useSpeedMs();
  const toolMode = useToolMode();
  const showDebug = useShowDebug();

  const generation = useStore(store, (s) => s.generation);
  const cols = useStore(store, (s) => s.cols);
  const rows = useStore(store, (s) => s.rows);

  const [stepTime, setStepTime] = useState(0);
  const [roundTripTime, setRoundTripTime] = useState(0);
  const lastStepTime = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleRunning = useCallback(
    () => store.getState().toggleRunning(),
    [store]
  );
  const step = useCallback(() => {
    lastStepTime.current = performance.now();
    store.getState().step();
  }, [store]);
  const clear = useCallback(() => store.getState().clear(), [store]);
  const randomize = useCallback(() => store.getState().randomize(), [store]);
  const setSpeed = useCallback(
    (ms: number) => store.getState().setSpeed(ms),
    [store]
  );
  const setToolMode = useCallback(
    (mode: ToolMode) => store.getState().setToolMode(mode),
    [store]
  );
  const setShowDebug = useCallback(
    (v: boolean) => store.setState({ showDebug: v }),
    [store]
  );

  const handleExport = useCallback(() => {
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

  const handleImport = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const raw = JSON.parse(reader.result as string);
          store.getState().importPattern(raw);
          setErrorMessage(null);
        } catch {
          setErrorMessage('Failed to parse JSON file');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [store]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const cam = cameraControlRef.current;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          toggleRunning();
          break;
        case 'KeyN':
          step();
          break;
        case 'KeyR':
          randomize();
          break;
        case 'KeyC':
          clear();
          break;
        case 'KeyD':
          setShowDebug(!showDebug);
          break;
        case 'Equal':
        case 'NumpadAdd':
          cam?.zoomIn();
          break;
        case 'Minus':
        case 'NumpadSubtract':
          cam?.zoomOut();
          break;
        case 'ArrowUp':
          cam?.pan(0, 1);
          break;
        case 'ArrowDown':
          cam?.pan(0, -1);
          break;
        case 'ArrowLeft':
          cam?.pan(-1, 0);
          break;
        case 'ArrowRight':
          cam?.pan(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleRunning, step, randomize, clear, showDebug, setShowDebug]);

  useEffect(() => {
    const unsub = store.subscribe((state, prev) => {
      if (state.generation !== prev.generation) {
        setStepTime(performance.now() - lastStepTime.current);
        setRoundTripTime(performance.now() - lastStepTime.current);
      }
    });
    return unsub;
  }, [store]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const toolModes: { value: ToolMode; label: string; key: string }[] = [
    { value: 'draw', label: 'Draw', key: 'D' },
    { value: 'erase', label: 'Erase', key: 'E' },
    { value: 'pan', label: 'Pan', key: 'P' },
  ];

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2 rounded bg-black/60 p-3 text-white backdrop-blur-sm">
        {/* Play/Pause */}
        <button
          onClick={toggleRunning}
          className="rounded bg-blue-600 px-3 py-1 text-sm font-medium hover:bg-blue-700"
          title="Play/Pause (Space)"
        >
          {running ? '⏸ Pause' : '▶ Play'}
        </button>

        {/* Step */}
        <button
          onClick={step}
          disabled={running}
          className="rounded bg-gray-600 px-3 py-1 text-sm font-medium hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
          title="Step (N)"
        >
          ⏭ Step
        </button>

        {/* Clear */}
        <button
          onClick={clear}
          className="rounded bg-red-700 px-3 py-1 text-sm font-medium hover:bg-red-800"
          title="Clear (C)"
        >
          ✕ Clear
        </button>

        {/* Randomize */}
        <button
          onClick={randomize}
          className="rounded bg-green-700 px-3 py-1 text-sm font-medium hover:bg-green-800"
          title="Randomize (R)"
        >
          ↻ Random
        </button>

        {/* Speed slider */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-300">Speed</label>
          <input
            type="range"
            min={50}
            max={1000}
            step={10}
            value={speedMs}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="h-1.5 w-20 cursor-pointer appearance-none rounded bg-gray-600 accent-blue-500"
          />
          <span className="min-w-[3rem] text-xs tabular-nums text-gray-300">
            {speedMs}ms
          </span>
        </div>

        {/* Tool mode */}
        <div className="flex items-center gap-1">
          {toolModes.map(({ value, label, key }) => (
            <button
              key={value}
              onClick={() => setToolMode(value)}
              className={`rounded px-2 py-1 text-xs font-medium ${
                toolMode === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title={`${label} (${key})`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Export */}
        <button
          onClick={handleExport}
          className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-600"
          title="Export as JSON"
        >
          ⭳ Export
        </button>

        {/* Import */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-600"
          title="Import JSON pattern"
        >
          ⤒ Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />

        {/* Debug toggle */}
        {import.meta.env.DEV && (
          <button
            onClick={() => setShowDebug(!showDebug)}
            className={`rounded px-2 py-1 text-xs ${
              showDebug
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            title="Toggle debug overlay (D)"
          >
            Debug
          </button>
        )}
      </div>

      {/* Error toast */}
      {errorMessage && (
        <div className="mt-2 rounded bg-red-800/80 px-3 py-2 text-sm text-white">
          {errorMessage}
        </div>
      )}

      {/* Debug overlay */}
      {showDebug && (
        <div className="mt-2 w-fit rounded bg-black/70 px-3 py-2 text-xs text-green-400 font-mono">
          <div>Generation: {generation}</div>
          <div>
            Grid: {cols}×{rows}
          </div>
          <div>Step: {stepTime.toFixed(1)}ms</div>
          <div>Round-trip: {roundTripTime.toFixed(1)}ms</div>
          <div>Render: —</div>
        </div>
      )}
    </div>
  );
};

export { Controls };
export type { ControlsProps };

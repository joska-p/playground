import { useCallback, useRef, useState } from 'react';
import { readJsonFile } from '../../core/read-json-file.ts';
import { downloadJson } from '../../core/download-json.ts';
import { useImportPattern } from '../../stores/automaton/actions.ts';
import { useCAStore } from '../../stores/automaton/context.ts';
import { useAutoDismiss } from '../../hooks/useAutoDismiss.ts';

function FileControls() {
  const store = useCAStore();
  const importPattern = useImportPattern();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  useAutoDismiss(errorMessage, () => setErrorMessage(undefined), 3000);

  const handleExport = useCallback(() => {
    const pattern = store.getState().exportPattern('pattern');
    downloadJson(pattern, `${pattern.name}.json`);
  }, [store]);

  const handleImport = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const raw = await readJsonFile(file);
        importPattern(raw);
        setErrorMessage(undefined);
      } catch {
        setErrorMessage('Failed to parse JSON file');
      }
      e.target.value = '';
    },
    [importPattern],
  );

  return (
    <>
      <button
        onClick={handleExport}
        className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-600"
        title="Export as JSON"
      >
        ⭳ Export
      </button>
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
      {errorMessage && (
        <div className="mt-2 rounded bg-red-800/80 px-3 py-2 text-sm text-white">
          {errorMessage}
        </div>
      )}
    </>
  );
}

export { FileControls };

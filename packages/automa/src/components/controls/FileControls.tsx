import { Button } from '@repo/ui/Button';
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
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

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
    [importPattern]
  );

  return (
    <>
      <Button
        variant="secondary"
        size="small"
        onClick={handleExport}
        title="Export as JSON"
      >
        <span aria-hidden="true">⭳</span> Export
      </Button>
      <Button
        variant="secondary"
        size="small"
        onClick={() => fileInputRef.current?.click()}
        title="Import JSON pattern"
      >
        <span aria-hidden="true">⤒</span> Import
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
      {errorMessage && (
        <div className="mt-2 rounded bg-destructive/80 px-3 py-2 text-sm text-destructive-foreground">
          {errorMessage}
        </div>
      )}
    </>
  );
}

export { FileControls };

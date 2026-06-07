import { Button } from '@repo/ui/Button';
import { useCallback, useRef, useState } from 'react';
import { readJsonFile } from '../../core/read-json-file.ts';
import { downloadJson } from '../../core/download-json.ts';
import {
  exportPattern,
  importPattern,
} from '../../stores/simulation/actions.ts';
import { useAutoDismiss } from '../../hooks/useAutoDismiss.ts';
import { AUTO_DISMISS_MS } from '../../config.ts';

function ExportIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 1.5V8.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M4 5.5L7 8.5L10 5.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 9V11.5C2 12.0523 2.44772 12.5 3 12.5H11C11.5523 12.5 12 12.0523 12 11.5V9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ImportIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 8.5V1.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M10 4.5L7 1.5L4 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 9V11.5C2 12.0523 2.44772 12.5 3 12.5H11C11.5523 12.5 12 12.0523 12 11.5V9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FileControls() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useAutoDismiss(
    errorMessage,
    () => setErrorMessage(undefined),
    AUTO_DISMISS_MS
  );

  const handleExport = useCallback(() => {
    const pattern = exportPattern('pattern');
    downloadJson(pattern, `${pattern.name}.json`);
  }, []);

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
    []
  );

  return (
    <>
      <Button
        variant="secondary"
        size="small"
        onClick={handleExport}
        title="Export as JSON"
      >
        <ExportIcon />
        Export
      </Button>
      <Button
        variant="secondary"
        size="small"
        onClick={() => fileInputRef.current?.click()}
        title="Import JSON pattern"
      >
        <ImportIcon />
        Import
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

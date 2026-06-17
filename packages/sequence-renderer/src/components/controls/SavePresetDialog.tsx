import type { JSX } from 'react';
import { useState } from 'react';

type SavePresetDialogProps = {
  onSave: (name: string) => void;
  onCancel: () => void;
};

function SavePresetDialog({
  onSave,
  onCancel
}: SavePresetDialogProps): JSX.Element {
  const [name, setName] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded border border-zinc-600 bg-zinc-800 px-2 py-1"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Preset name..."
        className="flex-1 bg-transparent px-1 py-0.5 text-xs text-zinc-200 outline-none placeholder:text-zinc-500"
        autoFocus
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="rounded bg-zinc-600 px-2 py-0.5 text-xs text-zinc-200 transition-colors hover:bg-zinc-500 disabled:opacity-40"
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="rounded px-1 py-0.5 text-xs text-zinc-400 transition-colors hover:text-zinc-200"
      >
        Cancel
      </button>
    </form>
  );
}

export { SavePresetDialog };

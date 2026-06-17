import { Button } from '@repo/ui/Button';
import { Input } from '@repo/ui/Input';
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
      className="flex items-center gap-2"
    >
      <Input
        variant="outline"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Preset name..."
        className="flex-1"
        autoFocus
      />
      <Button
        type="submit"
        variant="primary"
        size="sm"
        disabled={!name.trim()}
      >
        Save
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </form>
  );
}

export { SavePresetDialog };

import { Button } from '@repo/ui/Button';

type CompareToggleProps = {
  mode: 'grid' | 'compare';
  onChange: (mode: 'grid' | 'compare') => void;
};

function CompareToggle({ mode, onChange }: CompareToggleProps) {
  return (
    <div
      className="border-border flex items-center gap-1 rounded-lg border p-1"
      role="tablist"
    >
      <Button
        variant={mode === 'grid' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => { onChange('grid'); }}
        role="tab"
        aria-selected={mode === 'grid'}
      >
        Grid View
      </Button>
      <Button
        variant={mode === 'compare' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => { onChange('compare'); }}
        role="tab"
        aria-selected={mode === 'compare'}
      >
        Compare
      </Button>
    </div>
  );
}

export { CompareToggle };

import { Button } from '@repo/ui/Button';

type CompareToggleProps = {
  mode: 'grid' | 'compare';
  onChange: (mode: 'grid' | 'compare') => void;
};

function CompareToggle({ mode, onChange }: CompareToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border p-1">
      <Button
        variant={mode === 'grid' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onChange('grid')}
      >
        Grid View
      </Button>
      <Button
        variant={mode === 'compare' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onChange('compare')}
      >
        Compare
      </Button>
    </div>
  );
}

export { CompareToggle };

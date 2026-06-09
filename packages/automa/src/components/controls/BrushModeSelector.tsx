import { Button } from '@repo/ui/Button';
import { setToolMode } from '../../stores/ui/actions.ts';
import { useBrushMode } from '../../stores/ui/selectors.ts';
import type { BrushMode } from '../../stores/ui/store.ts';

function DrawIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.5 2.5L11.5 5.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M2.5 10L2 12L4 11.5L11 4.5L9.5 3L2.5 10Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EraseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8.5L8.5 2.5L12 6L6 12L1.5 12L2.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 2.5L12 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const brushModes: {
  value: BrushMode;
  label: string;
  key: string;
  Icon: React.FC;
}[] = [
  { value: 'draw', label: 'Draw', key: 'D', Icon: DrawIcon },
  { value: 'erase', label: 'Erase', key: 'E', Icon: EraseIcon },
];

function BrushModeSelector() {
  const brushMode = useBrushMode();

  return (
    <>
      {brushModes.map(({ value, label, key, Icon }) => (
        <Button
          key={value}
          variant={brushMode === value ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setToolMode(value)}
          title={`${label} (${key})`}
        >
          <Icon />
          {label}
        </Button>
      ))}
    </>
  );
}

export { BrushModeSelector };

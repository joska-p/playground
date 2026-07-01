import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { clear, randomize } from '../../stores/simulation/actions';
import { setToolMode } from '../../stores/ui/actions';
import { useBrushMode } from '../../stores/ui/selectors';

function useEditSection() {
  const brushMode = useBrushMode();

  const clearControl: Control = {
    id: 'clear',
    type: 'button',
    label: 'Clear',
    variant: 'danger',
    onClick: clear
  };

  const randomizeControl: Control = {
    id: 'randomize',
    type: 'button',
    label: 'Randomize',
    onClick: randomize
  };

  const brushModeControl: Control = {
    id: 'brushMode',
    type: 'select',
    label: 'Brush',
    value: brushMode,
    options: [
      { label: 'Draw', value: 'draw' },
      { label: 'Erase', value: 'erase' }
    ],
    onChange: (v: string) => {
      setToolMode(v as 'draw' | 'erase');
    }
  };

  const editSection: ControlSection = {
    id: 'edit',
    label: 'Edit',
    defaultOpen: true,
    controls: [clearControl, randomizeControl, brushModeControl]
  };

  return editSection;
}

export { useEditSection };

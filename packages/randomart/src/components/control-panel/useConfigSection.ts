import type { Control, ControlSection } from '@repo/ui/ControlPanel/types';
import { setMaxDepth, setSeedText } from '../../stores/randomart/actions/config';
import { useMaxDepth, useSeedText } from '../../stores/randomart/selectors';

function useConfigSection() {
  const seedText = useSeedText();
  const maxDepth = useMaxDepth();

  const seedControl: Control = {
    id: 'seedText',
    type: 'text',
    label: 'Seed Text',
    value: seedText,
    onChange: setSeedText
  };

  const shuffleControl: Control = {
    id: 'shuffle',
    type: 'button',
    label: 'Shuffle',
    onClick: () => {
      setSeedText(Math.random().toString(36).slice(2, 10));
    }
  };

  const maxDepthControl: Control = {
    id: 'maxDepth',
    type: 'number',
    label: 'Max Depth',
    value: maxDepth,
    min: 1,
    max: 10,
    onChange: setMaxDepth
  };

  const section: ControlSection = {
    id: 'config',
    label: 'Config',
    defaultOpen: true,
    controls: [seedControl, shuffleControl, maxDepthControl]
  };

  return section;
}

export { useConfigSection };

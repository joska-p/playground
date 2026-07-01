import { getAllCreatures } from '@repo/automa-engine/creature/registry';
import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { setPaletteBrush } from '../../stores/ui/actions';
import { usePaletteBrush } from '../../stores/ui/selectors';

function useCreatureSection() {
  const paletteBrush = usePaletteBrush();
  const creatures = getAllCreatures();

  const creatureControl: Control = {
    id: 'creature',
    type: 'select',
    label: 'Pattern',
    value: paletteBrush ?? '',
    options: [
      { label: 'None', value: '' },
      ...creatures.map((c) => ({ label: c.name, value: c.id }))
    ],
    onChange: (v: string) => {
      setPaletteBrush(v || null);
    }
  };

  const creatureSection: ControlSection = {
    id: 'creature',
    label: 'Creature',
    defaultOpen: true,
    controls: [creatureControl]
  };

  return creatureSection;
}

export { useCreatureSection };

import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { setShowDebug } from '../../stores/ui/actions';
import { useShowDebug } from '../../stores/ui/selectors';

function useDebugSection() {
  const showDebug = useShowDebug();

  const debugControl: Control = {
    id: 'showDebug',
    type: 'toggle',
    label: 'Debug overlay',
    value: showDebug,
    onChange: setShowDebug
  };

  const debugSection: ControlSection = {
    id: 'debug',
    label: 'Debug',
    defaultOpen: false,
    controls: [debugControl]
  };

  return debugSection;
}

export { useDebugSection };

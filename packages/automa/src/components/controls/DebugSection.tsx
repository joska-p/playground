import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Switch } from '@repo/ui/data-entry';
import { setShowDebug } from '../../stores/ui/actions';
import { useShowDebug } from '../../stores/ui/selectors';

function DebugSection() {
  const showDebug = useShowDebug();

  return (
    <ControlSection
      title="Debug"
      defaultOpen={false}
    >
      <ControlRow label="">
        <Switch
          checked={showDebug}
          onChange={(e) => {
            setShowDebug(e.target.checked);
          }}
          label="Debug overlay"
        />
      </ControlRow>
    </ControlSection>
  );
}

export { DebugSection };

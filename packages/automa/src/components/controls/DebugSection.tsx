import { ControlRow, ControlSection, Switch } from '@repo/ui';
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

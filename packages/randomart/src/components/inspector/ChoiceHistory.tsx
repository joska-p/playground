import { useActiveChannel } from '../../stores/randomart/selectors/useActiveChannel';
import {
  useRngB,
  useRngG,
  useRngR
} from '../../stores/randomart/selectors/useRngInstances';

export function ChoiceHistory() {
  const activeChannel = useActiveChannel();
  const rngR = useRngR();
  const rngG = useRngG();
  const rngB = useRngB();
  const selectedRng =
    activeChannel === 'red' ? rngR : activeChannel === 'green' ? rngG : rngB;

  return (
    <div>
      <h4 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
        Deterministic Choice Stream (.next())
      </h4>
      <div className="flex max-h-48 flex-wrap gap-1.5 overflow-y-auto text-sm">
        {selectedRng.choiceHistory.map((val, idx) => (
          <span
            key={idx}
            className="bg-background text-utility-2 rounded-sm px-1.5 py-0.5"
          >
            <span className="text-muted-foreground/70 mr-0.5">{idx}:</span>
            {val.toFixed(4)}
          </span>
        ))}
      </div>
    </div>
  );
}

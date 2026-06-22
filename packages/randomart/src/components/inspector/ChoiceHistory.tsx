import { useStore } from 'zustand';
import { randomartStore } from '../../stores/randomart/store';

export function ChoiceHistory() {
  const choiceHistory = useStore(randomartStore, (s) => {
    const channel = s.activeChannel;
    const rng =
      channel === 'red' ? s.rngR : channel === 'green' ? s.rngG : s.rngB;
    return rng.choiceHistory || [];
  });

  return (
    <div>
      <h4 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
        Deterministic Choice Stream (.next())
      </h4>
      {choiceHistory.length === 0 ? (
        <div className="text-muted-foreground/60 py-2 text-xs italic">
          No numbers generated in this channel context.
        </div>
      ) : (
        <div className="flex max-h-48 flex-wrap gap-1.5 overflow-y-auto text-sm">
          {choiceHistory.map((val, idx) => (
            <span
              key={idx}
              className="bg-background text-utility-2 rounded-sm px-1.5 py-0.5"
            >
              <span className="text-muted-foreground/70 mr-0.5">{idx}:</span>
              {val.toFixed(4)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

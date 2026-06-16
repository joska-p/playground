import { setSeedText } from '../../stores/randomart/actions';
import { useSeedText } from '../../stores/randomart/selectors/useSeedText';

export function SeedInput() {
  const seedText = useSeedText();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        Compile Input String
      </label>
      <input
        type="text"
        value={seedText}
        onChange={(e) => setSeedText(e.target.value)}
        className="border-border bg-background text-utility-4 focus:border-primary w-full rounded-xl border px-4 py-3 font-mono shadow-inner transition-colors focus:outline-none"
      />
    </div>
  );
}

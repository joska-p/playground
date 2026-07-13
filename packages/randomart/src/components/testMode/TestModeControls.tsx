import { ControlSection } from '@repo/ui/control-panel';
import { Input, Select, Slider, Switch } from '@repo/ui/data-entry';
import type { ArgPreset } from './store';
import {
  rerollGlobalSeed,
  setArgPreset,
  setCategory,
  setGlobalT,
  setQuery,
  setResolution,
  setSeed,
  toggleAnimate,
  useAnimate,
  useArgPreset,
  useCategory,
  useGlobalT,
  useQuery,
  useResolution,
  useSeed
} from './store';

const PRESET_OPTIONS: { value: ArgPreset; label: string }[] = [
  { value: 'gradient', label: 'Gradient (x, y, t)' },
  { value: 'symmetric', label: 'Symmetric (x, x*y, t)' },
  { value: 'interactive', label: 'Interactive (x, t, 0)' }
];

const CATEGORIES = ['all', 'terminal', 'structural'] as const;

function TestModeControls() {
  const globalT = useGlobalT();
  const argPreset = useArgPreset();
  const query = useQuery();
  const category = useCategory();
  const seed = useSeed();
  const resolution = useResolution();
  const animate = useAnimate();

  return (
    <>
      {/* ── Search ─────────────────────────────────────────── */}
      <ControlSection
        title="search"
        defaultOpen={true}
      >
        <Input
          placeholder="Search rules…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); }}
        />
        <div className="flex gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); }}
              className={`rounded px-2 py-1 font-mono text-xs transition-colors ${
                category === cat
                  ? 'bg-neutral-600 text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ControlSection>

      {/* ── Seed ────────────────────────────────────────────── */}
      <ControlSection
        title="Global Seed"
        defaultOpen={true}
      >
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={seed}
            onChange={(e) => { setSeed(Number(e.target.value)); }}
            className="w-24"
          />
          <button
            onClick={rerollGlobalSeed}
            className="rounded border border-neutral-600 px-2 py-1 text-xs text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
          >
            ↻ reroll all
          </button>
        </div>
      </ControlSection>

      {/* ── Render ──────────────────────────────────────────── */}
      <ControlSection
        title="render"
        defaultOpen={true}
      >
        <div className="flex items-center justify-between">
          <span className="text-foreground-muted text-xs">Resolution</span>
          <Select
            value={resolution}
            onChange={(e) => { setResolution(Number(e.target.value)); }}
          >
            <option value={48}>48</option>
            <option value={64}>64</option>
            <option value={96}>96</option>
            <option value={128}>128</option>
            <option value={192}>192</option>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-foreground-muted text-xs">Animate</span>
          <Switch
            checked={animate}
            onChange={toggleAnimate}
            label={animate ? 'On' : 'Off'}
          />
        </div>
      </ControlSection>

      {/* ── Config (existing) ───────────────────────────────── */}
      <ControlSection
        title="config"
        defaultOpen={true}
      >
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-foreground-muted text-xs">Global Constant (t)</span>
            <span className="text-foreground font-mono text-xs">{globalT.toFixed(2)}</span>
          </div>
          <Slider
            min={-1}
            max={1}
            step={0.01}
            value={globalT}
            onChange={setGlobalT}
          />
        </div>

        <Select
          value={argPreset}
          onChange={(e) => {
            setArgPreset(e.target.value as ArgPreset);
          }}
        >
          {PRESET_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </Select>
      </ControlSection>
    </>
  );
}

export { TestModeControls };

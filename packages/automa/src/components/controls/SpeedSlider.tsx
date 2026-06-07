import { useSetSpeed } from '../../stores/automaton/actions.ts';
import { useSpeedMs } from '../../stores/automaton/selectors.ts';

function SpeedSlider() {
  const speedMs = useSpeedMs();
  const setSpeed = useSetSpeed();

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-300">Speed</label>
      <input
        type="range"
        min={50}
        max={1000}
        step={10}
        value={speedMs}
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="h-1.5 w-20 cursor-pointer appearance-none rounded bg-gray-600 accent-blue-500"
      />
      <span className="min-w-[3rem] text-xs tabular-nums text-gray-300">
        {speedMs}ms
      </span>
    </div>
  );
}

export { SpeedSlider };

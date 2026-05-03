import { Select, Button } from "@repo/ui";
import {
  useDashboardStore,
  setMode,
  setTheme,
  togglePause,
} from "../../store/useDashboardStore.js";

const themes = [
  { id: "standard", name: "Standard" },
  { id: "cyberpunk", name: "Cyberpunk" },
];

function Controls() {
  const mode = useDashboardStore((s) => s.mode);
  const theme = useDashboardStore((s) => s.theme);
  const paused = useDashboardStore((s) => s.paused);

  return (
    <form className="flex flex-col gap-4 p-2">
      <fieldset className="grid gap-2">
        <label className="font-mono text-sm" htmlFor="mode-select">
          Mode
        </label>
        <Select
          id="mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value as "standard" | "creative")}
        >
          <option value="standard">Standard</option>
          <option value="creative">Creative</option>
        </Select>
      </fieldset>

      <fieldset className="grid gap-2">
        <label className="font-mono text-sm" htmlFor="theme-select">
          Theme
        </label>
        <Select id="theme-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
          {themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </Select>
      </fieldset>

      <Button
        type="button"
        onClick={togglePause}
        variant={paused ? "primary" : "secondary"}
        size="small"
      >
        {paused ? "Resume" : "Pause"}
      </Button>
    </form>
  );
}

export { Controls };

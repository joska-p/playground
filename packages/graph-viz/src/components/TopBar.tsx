import { FT_LABEL, REL_COLORS } from "../constants";
import { useGraphStore } from "../store/useGraphStore";
import type { ColorMode } from "../types";
import { Button, Input, Select, Switch } from "@repo/ui";

const FT_OPTIONS = Object.keys(FT_LABEL);
const REL_OPTIONS = Object.keys(REL_COLORS);

type TopBarProps = {
  onResetZoom: () => void;
};

export function TopBar({ onResetZoom }: TopBarProps) {
  const {
    colorMode,
    filterFT,
    filterRel,
    search,
    showHyper,
    stats,
    setColorMode,
    setFilterFT,
    setFilterRel,
    setSearch,
    toggleHyper,
    resetFilters,
  } = useGraphStore((s) => ({
    colorMode: s.colorMode,
    filterFT: s.filterFT,
    filterRel: s.filterRel,
    search: s.search,
    showHyper: s.showHyper,
    stats: s.stats,
    setColorMode: s.setColorMode,
    setFilterFT: s.setFilterFT,
    setFilterRel: s.setFilterRel,
    setSearch: s.setSearch,
    toggleHyper: s.toggleHyper,
    resetFilters: s.resetFilters,
  }));

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-[#0b1628] border-b border-slate-800 flex-wrap z-10">
      <span className="text-sm font-bold text-sky-400 mr-2">◈ GRAPHIFY</span>

      <Input
        value={search}
        onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
        placeholder="Search nodes…"
        className="w-40"
        size="sm"
      />

      <Select
        value={filterFT ?? ""}
        onChange={(e) => setFilterFT((e.target as HTMLSelectElement).value || null)}
        className="w-auto"
        size="sm"
      >
        <option value="">All file types</option>
        {FT_OPTIONS.map((ft) => (
          <option key={ft} value={ft}>
            {FT_LABEL[ft]}
          </option>
        ))}
      </Select>

      <Select
        value={filterRel ?? ""}
        onChange={(e) => setFilterRel((e.target as HTMLSelectElement).value || null)}
        className="w-auto"
        size="sm"
      >
        <option value="">All relations</option>
        {REL_OPTIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </Select>

      <div className="flex gap-2">
        {( ["community", "filetype"] as ColorMode[]).map((m) => (
          <Button
            key={m}
            variant={colorMode === m ? "primary" : "ghost"}
            size="sm"
            onClick={() => setColorMode(m)}
          >
            {m === "community" ? "Community" : "File Type"}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Switch checked={showHyper} onCheckedChange={() => toggleHyper()} size="sm" />
        <span className="text-sm text-slate-400">Hyper</span>
      </div>

      <Button variant="ghost" size="sm" onClick={resetFilters}>
        ✕ Clear
      </Button>
      <Button variant="ghost" size="sm" onClick={onResetZoom}>
        ⊡ Reset
      </Button>

      <span className="ml-auto text-xs text-slate-500">
        {stats.nodes.toLocaleString()} nodes · {stats.links.toLocaleString()} edges
      </span>
    </div>
  );
}
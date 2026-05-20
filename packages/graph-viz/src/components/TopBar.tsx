import { FT_LABEL, REL_COLORS } from "../constants";
import { useGraphStore } from "../store/useGraphStore";
import type { ColorMode } from "../types";

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

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search nodes…"
        className="bg-[#0f172a] border border-slate-700 text-slate-200 text-sm px-2 py-1 rounded w-40"
      />

      <select
        value={filterFT ?? ""}
        onChange={(e) => setFilterFT(e.target.value || null)}
        className="bg-[#0f172a] border border-slate-700 text-slate-200 text-sm px-2 py-1 rounded"
      >
        <option value="">All file types</option>
        {FT_OPTIONS.map((ft) => (
          <option key={ft} value={ft}>
            {FT_LABEL[ft]}
          </option>
        ))}
      </select>

      <select
        value={filterRel ?? ""}
        onChange={(e) => setFilterRel(e.target.value || null)}
        className="bg-[#0f172a] border border-slate-700 text-slate-200 text-sm px-2 py-1 rounded"
      >
        <option value="">All relations</option>
        {REL_OPTIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        {( ["community", "filetype"] as ColorMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setColorMode(m)}
            className={`text-xs uppercase px-2 py-1 rounded border ${colorMode === m ? 'border-sky-400 text-sky-400 bg-slate-800' : 'border-slate-700 text-slate-400'}`}
          >
            {m === "community" ? "Community" : "File Type"}
          </button>
        ))}
      </div>

      <button
        onClick={toggleHyper}
        className={`text-xs uppercase px-2 py-1 rounded border ${showHyper ? 'border-emerald-400 text-emerald-400 bg-slate-800' : 'border-slate-700 text-slate-400'}`}
      >
        {showHyper ? "Hyper ✓" : "Hyper ○"}
      </button>

      <button onClick={resetFilters} className="text-xs px-2 py-1 rounded border border-slate-700 text-slate-400 bg-transparent">
        ✕ Clear
      </button>
      <button onClick={onResetZoom} className="text-xs px-2 py-1 rounded border border-slate-700 text-slate-400 bg-transparent">
        ⊡ Reset
      </button>

      <span className="ml-auto text-xs text-slate-500">
        {stats.nodes.toLocaleString()} nodes · {stats.links.toLocaleString()} edges
      </span>
    </div>
  );
}
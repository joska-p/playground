import { FT_LABEL, REL_COLORS } from "../constants";
import { useGraphStore } from "../store/useGraphStore";
import type { ColorMode } from "../types";
import { Button, Input, Select, Switch } from "@repo/ui";
import { useShallow } from "zustand/shallow";

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
  } = useGraphStore(
    useShallow((state) => ({
      colorMode: state.colorMode,
      filterFT: state.filterFT,
      filterRel: state.filterRel,
      search: state.search,
      showHyper: state.showHyper,
      stats: state.stats,
      setColorMode: state.setColorMode,
      setFilterFT: state.setFilterFT,
      setFilterRel: state.setFilterRel,
      setSearch: state.setSearch,
      toggleHyper: state.toggleHyper,
      resetFilters: state.resetFilters,
    }))
  );

  return (
    <div className="bg-background border-border z-10 flex flex-wrap items-center gap-3 border-b px-4 py-2">
      <span className="text-primary mr-2 text-sm font-bold">◈ GRAPHIFY</span>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search nodes…"
        className="w-40"
      />

      <Select
        value={filterFT ?? ""}
        onChange={(e) => setFilterFT(e.target.value || null)}
        className="w-auto"
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
        onChange={(e) => setFilterRel(e.target.value || null)}
        className="w-auto"
      >
        <option value="">All relations</option>
        {REL_OPTIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </Select>

      <div className="flex gap-2">
        {(["community", "filetype"] as ColorMode[]).map((m) => (
          <Button
            key={m}
            variant={colorMode === m ? "primary" : "ghost"}
            size="small"
            onClick={() => setColorMode(m)}
          >
            {m === "community" ? "Community" : "File Type"}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Switch checked={showHyper} onCheckedChange={() => toggleHyper()} size="small" />
        <span className="text-muted text-sm">Hyper</span>
      </div>

      <Button variant="ghost" size="small" onClick={resetFilters}>
        ✕ Clear
      </Button>
      <Button variant="ghost" size="small" onClick={onResetZoom}>
        ⊡ Reset
      </Button>

      <span className="text-muted ml-auto text-xs">
        {stats.nodes.toLocaleString()} nodes · {stats.links.toLocaleString()} edges
      </span>
    </div>
  );
}

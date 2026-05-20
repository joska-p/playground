import { FT_COLOR, FT_LABEL, REL_COLORS } from "../constants";
import { useGraphStore } from "../store/useGraphStore";
import { Badge } from "@repo/ui";

const FT_OPTIONS = Object.keys(FT_LABEL);
const REL_PREVIEW = Object.entries(REL_COLORS).slice(0, 6);

export function Legend() {
  const colorMode = useGraphStore((s) => s.colorMode);

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-background border-t border-border flex-wrap">
      <div className="flex gap-4 flex-wrap items-center">
        {colorMode === "filetype" ? (
          FT_OPTIONS.map((ft) => (
            <div key={ft} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: FT_COLOR[ft] }} />
              <Badge variant="outline">{FT_LABEL[ft]}</Badge>
            </div>
          ))
        ) : (
          <span className="text-slate-500 text-xs">Nodes coloured by community</span>
        )}
      </div>

      <div className="flex gap-3 flex-wrap items-center ml-auto">
        {REL_PREVIEW.map(([rel, color]) => (
          <div key={rel} className="flex items-center gap-2">
            <div className="w-4 h-0.5 rounded" style={{ background: color }} />
          <Badge variant="outline">{rel}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

import { FT_COLOR, FT_LABEL, REL_COLORS } from "../constants";
import { useGraphStore } from "../store/useGraphStore";
import { Badge } from "@repo/ui";

const FT_OPTIONS = Object.keys(FT_LABEL);
const REL_PREVIEW = Object.entries(REL_COLORS).slice(0, 6);

export function Legend() {
  const colorMode = useGraphStore((s) => s.colorMode);

  return (
    <div className="bg-background border-border flex flex-wrap items-center gap-4 border-t px-4 py-2">
      <div className="flex flex-wrap items-center gap-4">
        {colorMode === "filetype" ? (
          FT_OPTIONS.map((ft) => (
            <div key={ft} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ background: FT_COLOR[ft] }} />
              <Badge variant="outline">{FT_LABEL[ft]}</Badge>
            </div>
          ))
        ) : (
          <span className="text-xs text-slate-500">Nodes coloured by community</span>
        )}
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-3">
        {REL_PREVIEW.map(([rel, color]) => (
          <div key={rel} className="flex items-center gap-2">
            <div className="h-0.5 w-4 rounded" style={{ background: color }} />
            <Badge variant="outline">{rel}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

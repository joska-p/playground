import { FT_COLOR, FT_LABEL, REL_COLORS } from '../constants';
import { useGraphColorMode } from '../store/graphStore';

const FT_OPTIONS = Object.keys(FT_LABEL);
const REL_PREVIEW = Object.entries(REL_COLORS).slice(0, 6);

export function Legend() {
  const colorMode = useGraphColorMode();

  return (
    <div className="flex flex-wrap items-center gap-4 border-t border-border bg-background px-4 py-1.5 text-sm">
      {/* Left: node colour legend */}
      <div className="flex flex-wrap items-center gap-3.5">
        {colorMode === 'filetype' ? (
          FT_OPTIONS.map((ft) => (
            <div
              key={ft}
              className="flex items-center gap-1.5"
            >
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: FT_COLOR[ft] }}
              />
              <span className="text-muted-foreground">{FT_LABEL[ft]}</span>
            </div>
          ))
        ) : (
          <span className="text-muted-foreground">
            Nodes coloured by community
          </span>
        )}
      </div>

      {/* Right: edge relation legend */}
      <div className="ml-auto flex flex-wrap items-center gap-3">
        {REL_PREVIEW.map(([rel, color]) => (
          <div
            key={rel}
            className="flex items-center gap-1.5"
          >
            <div
              className="h-0.5 w-3.5 shrink-0 rounded-sm"
              style={{ background: color }}
            />
            <span className="text-muted-foreground">{rel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

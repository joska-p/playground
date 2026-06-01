import { cn } from "@repo/ui/cn";
import { useState } from "react";
import type { EndpointGroup, EndpointId } from "./manipData";
import { isActiveEndpoint } from "./manipData";

type SwaggerSidebarProps = {
  groups: EndpointGroup[];
  activeEndpoint: EndpointId;
  onSelect: (id: EndpointId) => void;
};

const BADGE_CLASSES: Record<string, string> = {
  overview: "bg-category-data-viz",
  pixel: "bg-secondary text-secondary-foreground",
  neighborhood: "bg-category-image",
  whole: "bg-category-color",
  pipeline: "bg-primary text-primary-foreground",
};

const BADGE_LABELS: Record<string, string> = {
  overview: "OVERVIEW",
  pixel: "PIXEL",
  neighborhood: "NEIGHBOR",
  whole: "WHOLE",
  pipeline: "PIPELINE",
};

function SwaggerSidebar({ groups, activeEndpoint, onSelect }: SwaggerSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g) => [g.label, true]))
  );

  function toggleGroup(label: string) {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  function handleSelect(item: (typeof groups)[number]["items"][number]) {
    if (item.type === "overview") {
      onSelect({ kind: "overview" });
    } else if (item.type === "pipeline") {
      onSelect({ kind: "pipeline", id: item.id as "snapshots" | "resize" | "chaining" | "custom" });
    } else {
      onSelect({ kind: "manip", id: item.id });
    }
  }

  return (
    <nav aria-label="API Endpoints" className="flex h-full flex-col overflow-y-auto p-3">
      <div className="text-foreground mb-4 px-2 text-xs font-bold uppercase tracking-wider opacity-60">
        Endpoints
      </div>
      {groups.map((group) => {
        const isExpanded = expandedGroups[group.label] ?? true;
        return (
          <div key={group.label} className="mb-1">
            <button
              type="button"
              onClick={() => toggleGroup(group.label)}
              aria-expanded={isExpanded}
              className="text-foreground/70 hover:text-foreground flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span className="shrink-0 text-xs transition-transform duration-150">
                {isExpanded ? "▼" : "▶"}
              </span>
              {group.label}
            </button>
            {isExpanded && (
              <ul className="ml-1 space-y-0.5">
                {group.items.map((item) => {
                  const isActive = isActiveEndpoint(
                    activeEndpoint,
                    item.type === "overview"
                      ? { kind: "overview" }
                      : item.type === "pipeline"
                        ? {
                            kind: "pipeline",
                            id: item.id as "snapshots" | "resize" | "chaining" | "custom",
                          }
                        : { kind: "manip", id: item.id }
                  );
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(item)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                          isActive
                            ? "bg-accent/20 text-foreground font-medium"
                            : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-xs uppercase font-semibold leading-tight",
                            BADGE_CLASSES[item.type] ?? "bg-muted text-muted-foreground"
                          )}
                        >
                          {BADGE_LABELS[item.type] ?? item.type}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export { SwaggerSidebar };

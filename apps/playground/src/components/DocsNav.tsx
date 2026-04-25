import React from "react";
import { Sidebar } from "@repo/ui";
import { ArrowLeft } from "lucide-react";
import type { NavSection } from "../utils/docs";

interface DocsNavProps {
  sections: NavSection[];
  currentPath: string;
  docsBaseUrl: string;
}

export function DocsNav({ sections, currentPath, docsBaseUrl }: DocsNavProps) {
  return (
    <Sidebar variant="normal" defaultOpen={true} desktopPosition="left" mobilePosition="left">
      <Sidebar.Panel className="w-64 overflow-y-auto p-4">
        <a 
          href={docsBaseUrl} 
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Documentation Hub
        </a>
        
        <nav className="space-y-8">
          {sections.map((section) => (
            <div key={section.type}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                {section.label}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = currentPath === item.href || currentPath === `${item.href}/`;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className={`
                          block rounded-md px-3 py-2 text-sm transition-all
                          ${isActive 
                            ? "bg-primary/10 font-medium text-primary shadow-sm" 
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }
                        `}
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </Sidebar.Panel>
      <Sidebar.Toggle />
    </Sidebar>
  );
}

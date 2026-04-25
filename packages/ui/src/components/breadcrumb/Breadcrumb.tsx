import type { ComponentProps } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn.js";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps extends ComponentProps<"nav"> {
  items: BreadcrumbItem[];
}

function Breadcrumb({ className, items, ...props }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)} {...props}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="h-3 w-3" />}
          {item.href ? (
            <a href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export { Breadcrumb };
export type { BreadcrumbProps, BreadcrumbItem };
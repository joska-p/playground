import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn.js";
import { docCardVariants } from "./docCardVariants.js";

interface DocCardProps extends ComponentProps<"a">, VariantProps<typeof docCardVariants> {
  icon?: LucideIcon;
  title: string;
  description?: string;
}

function DocCard({
  className,
  variant,
  icon: Icon,
  title,
  description,
  children,
  ...props
}: DocCardProps) {
  return (
    <a
      className={cn(docCardVariants({ variant, className }), "group inline-block")}
      {...props}
    >
      <span className="flex items-start gap-4">
        {Icon && (
          <span className="mt-1 rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <span className="flex-1">
          <span className="flex items-center gap-2 font-mono text-lg font-semibold">
            {title}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          {children}
        </span>
      </span>
    </a>
  );
}

export { DocCard };
export type { DocCardProps };
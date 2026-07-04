import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, CheckCircle2, TriangleAlert, XCircle, Circle } from "lucide-react";
import { cn } from "../lib/cn";

const alertVariants = cva("rounded-lg px-4 py-3 flex items-start gap-3", {
  variants: {
    variant: {
      default: "bg-foreground-dim/8",
      primary: "bg-primary/8",
      secondary: "bg-secondary/8",
      accent: "bg-accent/8",
      warning: "bg-warning/8",
      destructive: "bg-destructive/8",
    },
  },
  defaultVariants: { variant: "default" },
});

const iconColor: Record<string, string> = {
  default: "text-foreground-dim",
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  warning: "text-warning",
  destructive: "text-destructive",
};

const defaultIcon: Record<string, ReactNode> = {
  default: <Circle className="h-3.5 w-3.5" />,
  primary: <Info className="h-3.5 w-3.5" />,
  secondary: <CheckCircle2 className="h-3.5 w-3.5" />,
  accent: <Info className="h-3.5 w-3.5" />,
  warning: <TriangleAlert className="h-3.5 w-3.5" />,
  destructive: <XCircle className="h-3.5 w-3.5" />,
};

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}

export function Alert({ className, variant = "default", title, description, icon, ...props }: AlertProps) {
  const key = variant ?? "default";
  return (
    <div className={cn(alertVariants({ variant }), className)} {...props}>
      <span className={cn("mt-0.5 flex-shrink-0", iconColor[key])}>
        {icon ?? defaultIcon[key]}
      </span>
      <div>
        <p className="text-foreground text-[13px] font-medium">{title}</p>
        {description && <p className="text-foreground-muted text-xs mt-0.5">{description}</p>}
      </div>
    </div>
  );
}

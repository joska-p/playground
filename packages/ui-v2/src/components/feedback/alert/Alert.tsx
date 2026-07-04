import type { HTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { Info, CheckCircle2, TriangleAlert, XCircle, Circle } from "lucide-react";
import { cn } from "../../lib/cn";
import { alertVariants } from "./Alert.variants";

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

export type AlertProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "title"> & VariantProps<typeof alertVariants>

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

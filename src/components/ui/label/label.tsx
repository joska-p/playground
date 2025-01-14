import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = ComponentProps<"label">;

function Label({ children, className, ...props }: Props) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-2 text-sm", className)} {...props}>
      {children}
    </label>
  );
}

export { Label };
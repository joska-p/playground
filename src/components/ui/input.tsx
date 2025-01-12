import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = ComponentProps<"input">;

function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "w-fit rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };

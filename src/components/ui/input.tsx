import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "bg-background focus-visible:ring-primary",
        destructive: "bg-destructive focus-visible:ring-destructive",
        outline: "bg-transparent focus-visible:ring-ring",
        subtle: "bg-subtle focus-visible:ring-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  ref?: string;
}

const Input = ({ ref, className, variant, type = "text", ...props }: Props) => {
  return (
    <input className={cn(inputVariants({ variant, className }))} type={type} ref={ref} {...props} />
  );
};
Input.displayName = "Input";

export { Input, inputVariants };

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  ref?: React.ForwardedRef<HTMLLabelElement>;
}

const Label = ({ ref, variant, className, ...props }: Props) => {
  return <label className={cn(labelVariants({ variant, className }))} ref={ref} {...props} />;
};

export { Label };

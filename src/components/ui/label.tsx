import { cn } from "@/lib/utils";

type Props = {
  ref?: React.Ref<HTMLLabelElement>;
} & React.ComponentProps<"label">;

const Label = ({ ref, className, ...props }: Props) => {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      ref={ref}
      {...props}
    />
  );
};

export { Label };

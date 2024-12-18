import { cn } from "@/lib/utils";

type Props = {
  ref?: React.Ref<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ ref, className, type = "button", ...props }: Props) => {
  return (
    <button
      className={cn(
        "rounded-md bg-primary px-4 py-2 text-primary-foreground shadow hover:bg-primary/90",
        className
      )}
      type={type}
      ref={ref}
      {...props}
    />
  );
};

export { Button };

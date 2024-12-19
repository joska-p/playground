import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "rounded-md bg-primary px-4 py-2 text-primary-foreground shadow hover:bg-primary/90",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "bg-transparent border border-input hover:bg-accent hover:text-accent-foreground",
        subtle: "bg-subtle text-subtle-foreground",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        link: "bg-transparent underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  ref?: string;
}

const Button = ({
  ref,
  className,
  children,
  href,
  variant,
  size,
  type = "button",
  ...props
}: Props) => {
  if (href) {
    return (
      <a href={href} className={cn(buttonVariants({ variant, size, className }))} ref={ref}>
        {children}
      </a>
    );
  }
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };

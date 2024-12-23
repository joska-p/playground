import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
	"flex h-9 w-full rounded-md border px-3 py-1 shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			variant: {
				default: "bg-background focus-visible:ring-primary",
				destructive: "bg-destructive focus-visible:ring-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type Props = React.InputHTMLAttributes<HTMLInputElement> &
	VariantProps<typeof inputVariants> & {
		ref?: string;
	};

const Input = ({ ref, className, variant, type = "text", ...props }: Props) => {
	return (
		<input
			className={cn(inputVariants({ variant, className }))}
			type={type}
			ref={ref}
			{...props}
		/>
	);
};
Input.displayName = "Input";

export { Input };

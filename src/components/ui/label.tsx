import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium", {
	variants: {
		variant: {
			default: "text-foreground",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

type Props = React.LabelHTMLAttributes<HTMLLabelElement> &
	VariantProps<typeof labelVariants> & {
		ref?: React.ForwardedRef<HTMLLabelElement>;
	};

const Label = ({
	ref,
	variant,
	className,
	children,
	htmlFor,
	...props
}: Props) => {
	return (
		<label
			className={cn(labelVariants({ variant, className }))}
			ref={ref}
			htmlFor={htmlFor}
			{...props}
		>
			{children}
		</label>
	);
};

export { Label };

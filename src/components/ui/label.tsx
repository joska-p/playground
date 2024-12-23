import { cva, type VariantProps } from "class-variance-authority";

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

const Label = ({ ref, variant, className, ...props }: Props) => {
	return (
		<label
			className={cn(labelVariants({ variant, className }))}
			ref={ref}
			{...props}
		/>
	);
};

export { Label };

import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLLabelElement> & {
	palette: string[];
	disabled?: boolean;
	checked: boolean;
	handleSetNewColors: (palette?: string[]) => void;
};
const Palette = ({
	palette,
	className,
	disabled,
	checked,
	handleSetNewColors,
	...props
}: Props) => {
	return (
		<label
			className={cn(
				"flex flex-row has-[:checked]:ring-4 has-[:checked]:ring-primary md:flex-col",
				className,
			)}
			{...props}
		>
			<input
				type="radio"
				name="palette"
				value={palette.join(",")}
				className="sr-only"
				disabled={disabled}
				checked={checked}
				onChange={() => handleSetNewColors(palette)}
			/>
			{palette.map((color, index) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					style={{ backgroundColor: color }}
					className="h-6 w-6 md:h-8 md:w-8"
				/>
			))}
		</label>
	);
};

export { Palette };

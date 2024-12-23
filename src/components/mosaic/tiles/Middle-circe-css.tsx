import { cn } from "@/lib/utils";

type Props = {
	colors: string[];
	rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const MiddleCircles = ({ colors, rotation, className }: Props) => {
	const styleObject = {
		backgroundColor: `var(${colors[0]})`,
		transform: `rotate(var(${rotation}))`,
	};

	return (
		<div
			className={cn("flex items-center justify-center", className)}
			style={styleObject}
		>
			<div
				className="h-1/2 w-1/4 rounded-l-full"
				style={{ backgroundColor: `var(${colors[1]})` }}
			/>
			<div
				className="h-1/2 w-1/4 rounded-r-full"
				style={{ backgroundColor: `var(${colors[2]})` }}
			/>
		</div>
	);
};

export { MiddleCircles };

type Props = {
	colors: string[];
	rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const OppositeCircles = ({ colors, rotation, className }: Props) => {
	const styleObject = {
		backgroundColor: `var(${colors[0]})`,
		transform: `rotate(var(${rotation}))`,
	};

	return (
		<div className={className} style={styleObject}>
			<div
				style={{ backgroundColor: `var(${colors[1]})` }}
				className="absolute right-1/2 h-full w-1/2 rounded-r-full"
			/>
			<div
				style={{ backgroundColor: `var(${colors[2]})` }}
				className="absolute left-1/2 h-full w-1/2 rounded-l-full"
			/>
		</div>
	);
};

export { OppositeCircles };

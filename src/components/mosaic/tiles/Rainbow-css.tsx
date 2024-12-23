type Props = {
	colors: string[];
	rotation: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Rainbow = ({ colors, rotation, className }: Props) => {
	const styleObject = {
		backgroundColor: `var(${colors[0]})`,
		transform: `rotate(var(${rotation}))`,
	};

	return (
		<div className={className} style={styleObject}>
			<div
				style={{ backgroundColor: `var(${colors[1]})` }}
				className="absolute left-0 top-0 h-full w-full rounded-br-full"
			/>
			<div
				style={{ backgroundColor: `var(${colors[2]})` }}
				className="absolute left-0 top-0 h-1/2 w-1/2 rounded-br-full"
			/>
		</div>
	);
};

export default Rainbow;

import { CornerCircles } from "./Corner-circles-css";
import { Diamond } from "./Diamond-css";
import { MiddleCircles } from "./Middle-circe-css";
import { OppositeCircles } from "./Opposite-circles-css";
import { Rainbow } from "./Rainbow-css";
import { Square } from "./Square-css";
import { Triangles } from "./Triangles-css";

const DefaultTileComponents = {
	[CornerCircles.name]: CornerCircles,
	[Diamond.name]: Diamond,
	[MiddleCircles.name]: MiddleCircles,
	[OppositeCircles.name]: OppositeCircles,
	[Rainbow.name]: Rainbow,
	[Square.name]: Square,
	[Triangles.name]: Triangles,
};

const defaultTileSet = [
	CornerCircles.name,
	Diamond.name,
	MiddleCircles.name,
	OppositeCircles.name,
	Rainbow.name,
	Square.name,
	Triangles.name,
];

export { DefaultTileComponents, defaultTileSet };

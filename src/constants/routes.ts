const baseUrl = import.meta.env.BASE_URL;

const routes = [
	{
		text: "Home",
		url: baseUrl,
	},
	{
		text: "Mosaic",
		url: `${baseUrl}/mosaic`,
	},
	{
		text: "Racaman",
		url: `${baseUrl}/racaman`,
	},
	{
		text: "Piechart",
		url: `${baseUrl}/piechart`,
	},
	{
		text: "Color wheel",
		url: `${baseUrl}/color-wheel`,
	},
	{
		text: "Sidebar ex",
		url: `${baseUrl}/sidebar`,
	},
];

export { routes };

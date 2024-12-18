const baseUrl = import.meta.env.BASE_URL;

const routes = [
  {
    title: "Home",
    url: baseUrl,
  },
  {
    title: "Mosaic",
    url: `${baseUrl}/mosaic`,
  },
  {
    title: "Racaman",
    url: `${baseUrl}/racaman`,
  },
  {
    title: "Piechart",
    url: `${baseUrl}/piechart`,
  },
  {
    title: "Color wheel",
    url: `${baseUrl}/color-wheel`,
  },
];

export { routes };

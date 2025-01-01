const baseUrl = import.meta.env.BASE_URL;

const routes = [
  {
    text: "Home",
    url: baseUrl,
  },
  {
    text: "Mosaic",
    url: `${baseUrl}mosaic/`,
  },
  {
    text: "Sequence",
    url: `${baseUrl}sequence/`,
  },
  {
    text: "Misc",
    url: `${baseUrl}misc/`,
  },
];

export { routes };

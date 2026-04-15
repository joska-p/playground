const baseUrl = import.meta.env.BASE_URL;

const routes = [
  {
    text: "Home",
    url: baseUrl,
  },
  {
    text: "Particles",
    url: `${baseUrl}particles/`,
  },
  {
    text: "Sequence",
    url: `${baseUrl}sequences/`,
  },
  {
    text: "Mosaic",
    url: `${baseUrl}mosaic/`,
  },
  {
    text: "Misc",
    url: `${baseUrl}misc/`,
  },
];

export { routes };

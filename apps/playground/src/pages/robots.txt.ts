import type { APIRoute } from "astro";

function getRobotsTxt(sitemapURL: URL) {
  return `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;
}

function GET({ site }: Parameters<APIRoute>[0]): ReturnType<APIRoute> {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
}

export { GET };

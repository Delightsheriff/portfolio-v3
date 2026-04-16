import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/", "/blog/"],
      },
    ],
    sitemap: "https://www.delightsheriff.com/sitemap.xml",
    host: "https://www.delightsheriff.com",
  };
}

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.delightsheriff.tech",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Add other pages here, e.g., about, contact, or project pages
    // {
    //   url: 'https://www.delightsheriff.tech/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
  ];
}

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://www.v1gamingcafe.com/sitemap.xml",
    host: "https://www.v1gamingcafe.com",
  };
}

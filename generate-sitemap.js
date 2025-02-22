import fs from "fs";

const websiteUrl = "https://senyashs.com"; // Your live website URL

// Define your static pages
const pages = [
  "/",
  "/sensec/homepage",
  "/sensec/about",
  "/sensec/contact",
  "/sensec/blogs",
  "/sensec/courses",
  "/sensec/contact",
  "/sensec/students/enrollment/placement_check",
  "/sensec/students/enrollment/documentation",
  "/sensec/new_employment",
  // Add more pages here
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${websiteUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

fs.writeFileSync("public/sitemap.xml", sitemapContent);

console.log("✅ Sitemap generated successfully!");

import fs from "fs";

const www = "https://www.senyashs.com";
const raw = "https://senyashs.com";
const websiteUrl = www || raw;
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
  "/sensec/login_options",
  "/sensec/sign_up/staffs",
  "/sensec/sign_up/students",
  "/sensec/forgot_password",
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

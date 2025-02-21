import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteSitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteSitemap({
      // Root URL of your website (use your domain here)
      siteUrl: "https://senyashs.com",
      // Optional: specify which paths to include in the sitemap (by default, it includes all pages)
      changefreq: "daily", // How often the page is likely to change
      priority: 0.7, // Priority of the page (values between 0.0 and 1.0)
      // If you want to add other settings, refer to plugin's documentation
    }),
  ],
  base: "/", // Make sure to set base URL if using a subdirectory
  optimizeDeps: {
    include: ["@mui/x-date-pickers", "date-fns", "@date-io/date-fns"],
  },
  build: {
    outDir: "dist", // Default output directory
    rollupOptions: {
      // Ensuring all routes fallback to index.html
      input: "/index.html",
      // external: ["@mui/x-date-pickers"],
    },
  },
  server: {
    // If you need to enable history fallback for SPA routing during development
    historyApiFallback: true,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteSitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react(),
      ViteSitemap({
        siteUrl: isProduction
          ? "https://senyashs.com"
          : "http://192.168.178.22:2025/",
        changefreq: "daily",
        priority: 0.7,
      }),
    ],
    base: "/",
    optimizeDeps: {
      include: ["@mui/x-date-pickers", "date-fns", "@date-io/date-fns"],
    },
    build: {
      outDir: "dist",
      rollupOptions: {
        input: "/index.html",
      },
    },
    server: {
      historyApiFallback: true,
    },
  };
});

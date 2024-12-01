import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/sensec", // Make sure to set base URL if using a subdirectory
  build: {
    outDir: "dist", // Default output directory
    rollupOptions: {
      // Ensuring all routes fallback to index.html
      input: "/index.html",
      external: ["@mui/x-date-pickers"],
    },
  },
  server: {
    // If you need to enable history fallback for SPA routing during development
    historyApiFallback: true,
  },
});

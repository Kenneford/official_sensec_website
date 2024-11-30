import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/official_sensec_website/" : "/",
  optimizeDeps: {
    include: [
      "@mui/x-date-pickers",
      "@mui/x-date-pickers/AdapterDateFns",
      "date-fns",
    ],
  },
  resolve: {
    alias: {
      "date-fns/_lib/format/longFormatters":
        "date-fns/esm/_lib/format/longFormatters/index.js",
    },
  },
}));

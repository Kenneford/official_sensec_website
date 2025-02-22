import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
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

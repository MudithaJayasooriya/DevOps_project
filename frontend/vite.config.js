import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ Vite dev server settings
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: "all",
  },

  // ✅ Alias to avoid WSL + Docker import issues
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

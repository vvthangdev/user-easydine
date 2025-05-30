import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/user/",
  server: {
    port: 3100,
    host: true, // Allow external connections
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
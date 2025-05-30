import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/user/",
  server: {
    host: "0.0.0.0",
    port: 3100,
    allowedHosts: ["vuvanthang.website", "localhost"], // THÊM host rõ ràng
    strictPort: true,
    cors: true,
  },
});
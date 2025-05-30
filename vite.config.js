import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/user/", // dùng để xử lý routing chính xác khi truy cập ở /user/
  server: {
    host: "0.0.0.0",
    port: 3100,
    allowedHosts: [
      "vuvanthang.website",
      "128.199.246.55",  // THÊM IP PUBLIC
      "localhost",
      "127.0.0.1"
    ],
    strictPort: true,
    cors: true
  },
});
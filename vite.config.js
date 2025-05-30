import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/user/", // Đặt base URL là /user/
  server: {
    host: "0.0.0.0", // Bind tới tất cả giao diện mạng
    port: 3100, // Đảm bảo cổng đúng
  },
});

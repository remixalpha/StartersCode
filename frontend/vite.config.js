import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // Use ES6 import for path

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

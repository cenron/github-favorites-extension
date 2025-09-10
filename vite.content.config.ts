import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: "empty-public", // Prevents copying files from public/
  build: {
    rollupOptions: {
      input: "src/content/index.tsx",
      output: {
        format: "iife",
        entryFileNames: "content.js",
      },
    },
    outDir: "dist/content", // Optional: separate output folder
  },
});


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import mdx from "@mdx-js/rollup";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mdx(),
    react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Serve content files from the root content directory
  publicDir: "public",
  assetsInclude: ['**/*.mdx'],
  define: {
    // This allows Vite to resolve content files properly
    'import.meta.glob': 'import.meta.glob'
  }
}));

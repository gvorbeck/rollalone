import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import createSitemap from "vite-plugin-sitemap";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/", // For custom domain, use root path
  plugins: [
    react(), 
    tailwindcss(),
    createSitemap({
      hostname: "https://rollal.one",
      outDir: "dist"
    })
  ],
  build: {
    // Optimize for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['clsx', 'tailwind-merge']
        }
      }
    },
    // Ensure assets are properly hashed for caching
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  },
  server: {
    // Better development experience
    headers: {
      'Cache-Control': 'no-cache',
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/data": path.resolve(__dirname, "./src/data"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
